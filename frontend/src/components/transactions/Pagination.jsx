const Pagination = ({ page, pages, setFilters }) => {
  if (pages <= 1) return null;
  return (
    <div className="flex gap-2 justify-center mt-4">
      <button className="btn-secondary" disabled={page<=1} onClick={()=>setFilters(f=>({...f, page: f.page-1}))}>Prev</button>
      <span>Page {page} of {pages}</span>
      <button className="btn-secondary" disabled={page>=pages} onClick={()=>setFilters(f=>({...f, page: f.page+1}))}>Next</button>
    </div>
  );
};
export default Pagination;
