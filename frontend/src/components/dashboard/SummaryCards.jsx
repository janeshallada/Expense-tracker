import { useEffect, useState } from "react";
import api from "../../api/axios";

const SummaryCards = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    api.get("/transactions/summary").then(res => setTotal(res.data.total || 0));
  }, []);

  return (
    <div className="card">
      <h3 className="text-gray-500">Total Expenses</h3>
      <p className="text-2xl font-bold">₹ {total}</p>
    </div>
  );
};

export default SummaryCards;
