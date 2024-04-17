import { Navigate, Route, Routes } from "react-router";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeLayout from "./components/home/HomeLayout";
import Character from "./pages/Character";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Series from "./pages/Series";

function AppRouter() {
  return (
    <>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="search/:query" element={<Search />} />
          <Route path="series/:id" element={<Series />} />
          <Route path="character/:id" element={<Character />} />
        </Route>
        <Route element={<HomeLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="*" />
      </Routes>
    </>
  );
}

export default AppRouter;
