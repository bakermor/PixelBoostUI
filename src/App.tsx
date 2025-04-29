import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";
import { StatUpdateProvider } from "./context/StatUpdateProvider";
import Action from "./pages/Action";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import NewUser from "./pages/NewUser";
import SetLevels from "./pages/SetLevels";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <AuthProvider>
      <StatUpdateProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="" element={<Home />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<Login />} />
              <Route path="new-user" element={<NewUser />} />

              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="set-levels" element={<SetLevels />} />
                <Route path="action" element={<Action />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </StatUpdateProvider>
    </AuthProvider>
  );
}

export default App;
