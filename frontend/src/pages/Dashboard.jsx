import SummaryCards from "../components/dashboard/SummaryCards.jsx";
import CategoryChart from "../components/dashboard/CategoryChart.jsx";
import RecentTransactions from "../components/dashboard/RecentTransactions.jsx";

const Dashboard = () => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <SummaryCards />
      <CategoryChart />
      <RecentTransactions />
    </div>
  );
};

export default Dashboard;
