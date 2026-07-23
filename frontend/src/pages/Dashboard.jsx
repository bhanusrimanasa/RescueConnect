import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getMyReports } from "../services/reportService";
import { getMyApplications } from "../services/adoptionApplicationService";
import UserDashboard from "../components/dashboard/UserDashboard";
import VolunteerDashboard from "../components/dashboard/VolunteerDashboard";

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
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {user?.role === "volunteer" ? (
        <VolunteerDashboard user={user} />
      ) : (
        <UserDashboard
          user={user}
          myReports={myReports}
          myApplications={myApplications}
        />
      )}
    </div>
  );
}

export default Dashboard;