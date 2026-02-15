import { useState } from "react";
import api from "../../api/axios";
import EditTransactionModal from "./EditTransactionModal.jsx";
import DeleteConfirmModal from "./DeleteConfirmModal.jsx";

const TransactionItem = ({ t, refresh }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const deleteHandler = async () => {
    await api.delete(`/transactions/${t._id}`);
    refresh && refresh();
    setShowDelete(false);
  };

  return (
    <div className="flex justify-between p-2 border-b">
      <div>
        <div className="font-semibold">{t.title}</div>
        <div className="text-sm text-gray-500">{t.category} • {new Date(t.date).toLocaleDateString()}</div>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold">₹{t.amount}</span>
        <button className="btn-secondary" onClick={() => setShowEdit(true)}>Edit</button>
        <button className="btn-danger" onClick={() => setShowDelete(true)}>Delete</button>
      </div>

      {showEdit && <EditTransactionModal transaction={t} onClose={() => setShowEdit(false)} onSuccess={refresh} />}
      {showDelete && <DeleteConfirmModal onConfirm={deleteHandler} onClose={() => setShowDelete(false)} />}
    </div>
  );
};

export default TransactionItem;
