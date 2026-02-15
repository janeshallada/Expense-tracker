const DeleteConfirmModal = ({ onConfirm, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <div className="bg-white p-4 rounded">
      <p>Are you sure you want to delete?</p>
      <div className="flex gap-2 mt-2 justify-end">
        <button className="btn-danger" onClick={onConfirm}>Delete</button>
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
      </div>
    </div>
  </div>
);
export default DeleteConfirmModal;
