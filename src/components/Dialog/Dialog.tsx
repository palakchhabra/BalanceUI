import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";

interface DialogProps {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Dialog = ({ open, title, onConfirm, onCancel }: DialogProps) => {
  return (
    <Modal open={open} onClose={onCancel}>
      <h3 style={{ marginBottom: 12 }}>{title}</h3>

      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <Button variant="bare" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="solid" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
