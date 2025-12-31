import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import "./Dialog.css";

interface DialogProps {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  showFeedbackModal?: boolean;
  successMessage?: string;
  cancelMessage?: string;
}

export const Dialog = ({ 
  open, 
  title, 
  onConfirm, 
  onCancel,
  showFeedbackModal = true,
  successMessage = "Action completed successfully!",
  cancelMessage = "Action cancelled."
}: DialogProps) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    if (showFeedbackModal) {
      setShowSuccessModal(true);
      // Auto close success modal after 2 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000);
    }
  };

  const handleCancel = () => {
    onCancel();
    if (showFeedbackModal) {
      setShowCancelModal(true);
      // Auto close cancel modal after 2 seconds
      setTimeout(() => {
        setShowCancelModal(false);
      }, 2000);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleCancel}>
        <div className="balanceui-dialog-content">
          <h3 className="balanceui-dialog-title">{title}</h3>
          <div className="balanceui-dialog-actions">
            <Button variant="bare" onClick={handleCancel} className="balanceui-dialog-button balanceui-dialog-button-cancel">
              Cancel
            </Button>
            <Button variant="solid" onClick={handleConfirm} className="balanceui-dialog-button balanceui-dialog-button-confirm">
              Confirm
            </Button>
          </div>
        </div>
      </Modal>

      {/* Success Modal with Animation */}
      <Modal open={showSuccessModal} onClose={() => setShowSuccessModal(false)} closeOnOverlayClick={false} closeOnEscape={false}>
        <div className="balanceui-dialog-feedback balanceui-dialog-success">
          <div className="balanceui-dialog-feedback-icon">
            <Icon name="check" size="xl" />
          </div>
          <h3 className="balanceui-dialog-feedback-title">Success</h3>
          <p className="balanceui-dialog-feedback-message">{successMessage}</p>
        </div>
      </Modal>

      {/* Cancel Modal with Animation */}
      <Modal open={showCancelModal} onClose={() => setShowCancelModal(false)} closeOnOverlayClick={false} closeOnEscape={false}>
        <div className="balanceui-dialog-feedback balanceui-dialog-cancel">
          <div className="balanceui-dialog-feedback-icon">
            <Icon name="close" size="xl" />
          </div>
          <h3 className="balanceui-dialog-feedback-title">Cancelled</h3>
          <p className="balanceui-dialog-feedback-message">{cancelMessage}</p>
        </div>
      </Modal>
    </>
  );
};
