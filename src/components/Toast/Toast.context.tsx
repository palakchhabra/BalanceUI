import { createContext, useContext, useState } from "react";
import { Toast } from "./Toast.types";
import { ToastViewport } from "./ToastViewport";

const ToastContext = createContext<{
  notify: (toast: Omit<Toast, "id">) => void;
} | null>(null);

export const ToastProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = (toast: Omit<Toast, "id">) => {
    const id = crypto.randomUUID();
    setToasts((t) => [...t, { ...toast, id }]);

    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, toast.duration ?? 3000);
  };

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <ToastViewport toasts={toasts} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be inside ToastProvider");
  return ctx;
};
