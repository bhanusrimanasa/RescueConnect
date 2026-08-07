import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getMyReports } from "../services/reportService";
import { getMyApplications } from "../services/adoptionApplicationService";
import UserDashboard from "../components/dashboard/UserDashboard";
import VolunteerDashboard from "../components/dashboard/VolunteerDashboard";
import AdminDashboard from "../components/dashboard/AdminDashboard";
function Dashboard() {
  const { user } = useAuth();

  const [myReports, setMyReports] = useState([]);
  const [myApplications, setMyApplications] = useState([]);

  useEffect(() => {
    fetchReports();
    fetchApplications();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await getMyReports();
      setMyReports(data);
    } catch (err) {
      console.log(err);
    }
  };
const fetchApplications = async () => {
  try {
    const data = await getMyApplications();
    setMyApplications(data);
  } catch (err) {
    console.log(err);
  }
};
  if (user?.role === "admin") {
    return <AdminDashboard />;
}

if (user?.role === "volunteer") {
    return <VolunteerDashboard user={user} />;
}

return (
    <UserDashboard
        user={user}
        myReports={myReports}
        myApplications={myApplications}
    />
);
}

export default Dashboard;