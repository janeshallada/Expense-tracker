import { useState } from "react";
import api from "../../api/axios";

const TransactionForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ title: "", amount: "", category: "", date: "", notes: "" });

  const submitHandler = async (e) => {
    e.preventDefault();
    await api.post("/transactions", { ...form, amount: Number(form.amount) });
    setForm({ title: "", amount: "", category: "", date: "", notes: "" });
    onSuccess && onSuccess();
  };

  return (
    <form onSubmit={submitHandler} className="card mb-4 grid grid-cols-1 md:grid-cols-5 gap-2">
      <input className="input" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} />
      <input className="input" type="number" placeholder="Amount" value={form.amount} onChange={(e)=>setForm({...form, amount:e.target.value})} />
      <input className="input" placeholder="Category" value={form.category} onChange={(e)=>setForm({...form, category:e.target.value})} />
      <input className="input" type="date" value={form.date} onChange={(e)=>setForm({...form, date:e.target.value})} />
      <button className="btn-primary">Add</button>
      <input className="input md:col-span-5" placeholder="Notes (optional)" value={form.notes} onChange={(e)=>setForm({...form, notes:e.target.value})} />
    </form>
  );
};

export default TransactionForm;
