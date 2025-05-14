import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import TopNavbar from "./TopNavbar";

const DashBoardLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#f4f4fc]">
      <Sidebar />
      <div className="flex-1 w-full md:ml-64">
        <TopNavbar />
        <main className="p-4 pt-[72px] md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
