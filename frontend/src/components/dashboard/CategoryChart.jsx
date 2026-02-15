import { useEffect, useState } from "react";
import api from "../../api/axios";
import { PieChart, Pie, Tooltip } from "recharts";

const CategoryChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/transactions/summary").then(res => {
      const formatted = (res.data.byCategory || []).map(c => ({ name: c._id, value: c.total }));
      setData(formatted);
    });
  }, []);

  return (
    <div className="card">
      <h3 className="mb-2 font-semibold">By Category</h3>
      <PieChart width={300} height={300}>
        <Pie data={data} dataKey="value" nameKey="name" fill="#8884d8" />
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default CategoryChart;
