import { useEffect, useState } from "react";
import api from "../../api/axios";

const RecentTransactions = () => {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    api.get("/transactions/summary").then(res => setRecent(res.data.recent || []));
  }, []);

  return (
    <div className="card">
      <h3 className="mb-2 font-semibold">Recent</h3>
      <ul>
        {recent.map(t => (
          <li key={t._id} className="flex justify-between border-b py-1">
            <span>{t.title}</span>
            <span>₹{t.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;
