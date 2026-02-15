import { useEffect, useState } from "react";
import api from "../api/axios";
import TransactionList from "../components/transactions/TransactionList.jsx";
import TransactionFilters from "../components/transactions/TransactionFilters.jsx";
import Pagination from "../components/transactions/Pagination.jsx";
import TransactionForm from "../components/transactions/TransactionForm.jsx";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({ q: "", category: "", page: 1, limit: 10 });
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    const { data } = await api.get("/transactions", { params: filters });
    setTransactions(data.transactions || []);
    setPages(data.pages || 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line
  }, [filters]);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Transactions</h2>
      <TransactionForm onSuccess={fetchTransactions} />
      <TransactionFilters filters={filters} setFilters={setFilters} />
      {loading ? <p>Loading...</p> : <TransactionList transactions={transactions} refresh={fetchTransactions} />}
      <Pagination page={filters.page} pages={pages} setFilters={setFilters} />
    </div>
  );
};

export default Transactions;
