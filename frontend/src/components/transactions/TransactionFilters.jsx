const TransactionFilters = ({ filters, setFilters }) => {
  return (
    <div className="card mb-4 grid grid-cols-1 md:grid-cols-4 gap-2">
      <input className="input" placeholder="Search" value={filters.q || ""} onChange={(e)=>setFilters({...filters, q:e.target.value, page:1})} />
      <input className="input" placeholder="Category" value={filters.category || ""} onChange={(e)=>setFilters({...filters, category:e.target.value, page:1})} />
      <input className="input" type="number" placeholder="Min Amount" value={filters.minAmount || ""} onChange={(e)=>setFilters({...filters, minAmount:e.target.value, page:1})} />
      <input className="input" type="number" placeholder="Max Amount" value={filters.maxAmount || ""} onChange={(e)=>setFilters({...filters, maxAmount:e.target.value, page:1})} />
    </div>
  );
};

export default TransactionFilters;
