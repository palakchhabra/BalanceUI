import { viewportStyle, toastStyle } from "./Toast.styles";
import { Toast } from "./Toast.types";

export const ToastViewport = ({
  toasts,
}: {
  toasts: Toast[];
}) => {
  return (
    <div style={viewportStyle}>
      {toasts.map((t) => (
        <div
          key={t.id}
          style={toastStyle(t.variant ?? "info")}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
};
