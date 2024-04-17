import AdminDash from "../components/dashboard/AdminDash";
import UserDash from "../components/dashboard/UserDash";
import useUser from "../hooks/useUser";

function Dashboard() {
  const { user } = useUser();
  return (
    <>
      {user.role === "admin" && <AdminDash />}
      {user.role === "user" && <UserDash />}
    </>
  );
}

export default Dashboard;
