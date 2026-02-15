import { useState } from "react";
import api from "../../api/axios";

const EditTransactionModal = ({ transaction, onClose, onSuccess }) => {
  const [form, setForm] = useState({ ...transaction });

  const submitHandler = async (e) => {
    e.preventDefault();
    await api.put(`/transactions/${transaction._id}`, { ...form, amount: Number(form.amount) });
    onSuccess && onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <form onSubmit={submitHandler} className="bg-white p-4 rounded w-96">
        <h3 className="mb-2 font-bold">Edit Transaction</h3>
        <input className="input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
        <input className="input" type="number" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
        <input className="input" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
        <input className="input" type="date" value={form.date?.slice(0,10)} onChange={e => setForm({...form, date: e.target.value})} />
        <input className="input" value={form.notes || ""} onChange={e => setForm({...form, notes: e.target.value})} />
        <div className="flex gap-2 justify-end">
          <button className="btn-primary">Save</button>
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditTransactionModal;
