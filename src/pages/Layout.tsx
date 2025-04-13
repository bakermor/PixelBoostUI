import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen min-w-screen">
      <Outlet />
    </div>
  );
};

export default Layout;
