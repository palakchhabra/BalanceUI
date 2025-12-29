import { useMemo, useCallback, useState, useEffect, useRef } from "react";
import { TreeProps, TreeNode } from "./Tree.types";
import "./Tree.css";
import "./TreeCheckbox.css";

interface FlatTreeNode {
  node: TreeNode;
  level: number;
  parentId?: string;
  index: number;
}

const TreeItem = ({
  node,
  level,
  expanded,
  onToggle,
  selected,
  onSelect,
  showCheckbox,
  className,
}: {
  node: TreeNode;
  level: number;
  expanded?: Set<string>;
  onToggle?: (id: string) => void;
  selected?: Set<string>;
  onSelect?: (id: string, checked: boolean) => void;
  showCheckbox?: boolean;
  className?: string;
}) => {
  const isOpen = expanded?.has(node.id);
  const isSelected = selected?.has(node.id);
  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onToggle?.(node.id);
    },
    [node.id, onToggle]
  );

  const handleCheckboxChange = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onSelect?.(node.id, !isSelected);
    },
    [node.id, isSelected, onSelect]
  );

  return (
    <div className={`balanceui-tree-node ${isSelected ? "selected" : ""} ${className || ""}`} style={{ paddingLeft: `${level * 16}px` }}>
      <div className="balanceui-tree-label" onClick={handleToggle}>
        {showCheckbox && (
          <span className="balanceui-tree-checkbox" onClick={handleCheckboxChange}>
            <input
              type="checkbox"
              checked={isSelected || false}
              onChange={() => {}}
              onClick={handleCheckboxChange}
              className="balanceui-checkbox-input"
            />
            <span className={`balanceui-checkbox-box ${isSelected ? "checked" : ""}`}>
              {isSelected && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.3333 4L6 11.3333L2.66667 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
          </span>
        )}
        {hasChildren && (
          <span className={`balanceui-tree-toggle ${isOpen ? "expanded" : ""}`}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="balanceui-tree-icon"
            >
              <path
                d="M4.5 3L7.5 6L4.5 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
        {!hasChildren && (
          <span className="balanceui-tree-spacer">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="6" cy="6" r="1.5" fill="currentColor" opacity="0.4" />
            </svg>
          </span>
        )}
        {/* Default folder/file icon */}
        <span className="balanceui-tree-icon-default">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {hasChildren ? (
              <path
                d="M2 3.5C2 2.67157 2.67157 2 3.5 2H5.58579C5.851 2 6.10536 2.10536 6.29289 2.29289L7.70711 3.70711C7.89464 3.89464 8.149 4 8.41421 4H10.5C11.3284 4 12 4.67157 12 5.5V10.5C12 11.3284 11.3284 12 10.5 12H3.5C2.67157 12 2 11.3284 2 10.5V3.5Z"
                fill="currentColor"
                opacity="0.6"
              />
            ) : (
              <path
                d="M3.5 2C2.67157 2 2 2.67157 2 3.5V10.5C2 11.3284 2.67157 12 3.5 12H10.5C11.3284 12 12 11.3284 12 10.5V3.5C12 2.67157 11.3284 2 10.5 2H3.5Z"
                fill="currentColor"
                opacity="0.4"
              />
            )}
          </svg>
        </span>
        <span className="balanceui-tree-content">{node.label}</span>
      </div>
    </div>
  );
};

const flattenTree = (
  nodes: TreeNode[],
  expanded: Set<string>,
  level = 0,
  parentId?: string
): FlatTreeNode[] => {
  const result: FlatTreeNode[] = [];
  let index = 0;

  const traverse = (nodeList: TreeNode[], currentLevel: number, parent?: string) => {
    for (const node of nodeList) {
      result.push({
        node,
        level: currentLevel,
        parentId: parent,
        index: index++,
      });

      if (node.children && expanded.has(node.id)) {
        traverse(node.children, currentLevel + 1, node.id);
      }
    }
  };

  traverse(nodes, level, parentId);
  return result;
};

export const Tree = ({ 
  data, 
  expanded = new Set(), 
  onToggle, 
  selected,
  onSelect,
  showCheckbox = false,
  height, 
  className, 
  style 
}: TreeProps) => {
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(expanded);
  const [internalSelected, setInternalSelected] = useState<Set<string>>(selected || new Set());
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 32;
  const overscan = 5;

  const controlledExpanded = expanded !== undefined ? expanded : internalExpanded;
  const controlledSelected = selected !== undefined ? selected : internalSelected;

  const handleToggle = useCallback(
    (id: string) => {
      if (expanded === undefined) {
        setInternalExpanded((prev) => {
          const next = new Set(prev);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return next;
        });
      }
      onToggle?.(id);
    },
    [expanded, onToggle]
  );

  const handleSelect = useCallback(
    (id: string, checked: boolean) => {
      if (selected === undefined) {
        setInternalSelected((prev) => {
          const next = new Set(prev);
          if (checked) {
            next.add(id);
          } else {
            next.delete(id);
          }
          return next;
        });
      }
      onSelect?.(id, checked);
    },
    [selected, onSelect]
  );

  const flatNodes = useMemo(
    () => flattenTree(data, controlledExpanded),
    [data, controlledExpanded]
  );

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const visibleRange = useMemo(() => {
    if (!height || flatNodes.length === 0) {
      return { start: 0, end: flatNodes.length };
    }

    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const end = Math.min(
      flatNodes.length,
      Math.ceil((scrollTop + height) / itemHeight) + overscan
    );

    return { start, end };
  }, [scrollTop, height, flatNodes.length, itemHeight, overscan]);

  const visibleNodes = useMemo(
    () => flatNodes.slice(visibleRange.start, visibleRange.end),
    [flatNodes, visibleRange.start, visibleRange.end]
  );

  const totalHeight = useMemo(
    () => flatNodes.length * itemHeight,
    [flatNodes.length, itemHeight]
  );

  const offsetY = useMemo(
    () => visibleRange.start * itemHeight,
    [visibleRange.start, itemHeight]
  );

  useEffect(() => {
    if (expanded !== undefined) {
      setInternalExpanded(expanded);
    }
  }, [expanded]);

  if (height && flatNodes.length > 100) {
    return (
      <div
        ref={containerRef}
        className={`balanceui-tree balanceui-tree-virtual-container ${className || ""}`}
        style={{ height, overflow: "auto", ...style }}
        onScroll={handleScroll}
      >
        <div style={{ height: totalHeight, position: "relative" }}>
          <div style={{ transform: `translateY(${offsetY}px)`, position: "absolute", top: 0, left: 0, right: 0 }}>
            {visibleNodes.map(({ node, level, index }) => (
              <div
                key={`${node.id}-${index}`}
                style={{ height: itemHeight, position: "relative" }}
              >
                <TreeItem
                  node={node}
                  level={level}
                  expanded={controlledExpanded}
                  onToggle={handleToggle}
                  selected={controlledSelected}
                  onSelect={handleSelect}
                  showCheckbox={showCheckbox}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`balanceui-tree ${className || ""}`} style={style}>
      {flatNodes.map(({ node, level, index }) => (
        <TreeItem
          key={`${node.id}-${index}`}
          node={node}
          level={level}
          expanded={controlledExpanded}
          onToggle={handleToggle}
          selected={controlledSelected}
          onSelect={handleSelect}
          showCheckbox={showCheckbox}
        />
      ))}
    </div>
  );
};
