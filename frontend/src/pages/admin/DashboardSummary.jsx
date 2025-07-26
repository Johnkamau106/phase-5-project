const DashboardSummary = ({
  userCount,
  homeCount,
  totalDonations,
  upcomingEvents,
}) => {
  return (
    <div className="dashboard-summary">
      <h2>📊 Admin Summary</h2>
      <div className="summary-cards">
        <div className="card">
          <h3>👥 Users</h3>
          <p>{userCount}</p>
        </div>
        <div className="card">
          <h3>🏠 Homes</h3>
          <p>{homeCount}</p>
        </div>
        <div className="card">
          <h3>🎁 Donations</h3>
          {/* <p>KES {totalDonations.toLocaleString()}</p> */}
        </div>
        <div className="card">
          <h3>📅 Events</h3>
          {/* <p>{upcomingEvents} Upcoming</p> */}
        </div>
      </div>
    </div>
  );
};
export default DashboardSummary;
