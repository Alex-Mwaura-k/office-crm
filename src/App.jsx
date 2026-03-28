import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import OfficeLayout from "./office/OfficeLayout";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import ClientProfile from "./pages/ClientProfile";
import ClientRegister from "./pages/ClientRegister";
import ProjectsInventory from "./pages/ProjectsInventory";
import AddProject from "./pages/AddProject";
import POS from "./pages/POS";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect immediately to the login page */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* The standalone Login Route (no sidebar/navbar) */}
        <Route path="/login" element={<Login />} />

        {/* The main dashboard wrapped in the OfficeLayout */}
        <Route path="/office" element={<OfficeLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="clients" element={<Clients />} />
          <Route path="clients/register" element={<ClientRegister />} />
          <Route path="clients/:id" element={<ClientProfile />} />

          <Route path="inventory" element={<ProjectsInventory />} />
          <Route path="inventory/add" element={<AddProject />} />
          <Route path="pos" element={<POS />} />

          <Route
            path="employees"
            element={
              <div className="p-4 dark:text-white">
                Staff Management Coming Soon
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;