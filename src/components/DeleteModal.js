import Modal from "./UI/Modal";

const DeleteModal = ({ onCloseDeleteModal, text, onDelete, id, isLoading }) => {
  return (
    <Modal
      modalType="delete"
      title="確認刪除"
      closeButton="取消"
      submitButton="確認刪除"
      onClose={onCloseDeleteModal}
      onSubmit={() => onDelete(id)}
      isLoading={isLoading}
    >
      刪除 {text}
    </Modal>
  );
};

export default DeleteModal;
