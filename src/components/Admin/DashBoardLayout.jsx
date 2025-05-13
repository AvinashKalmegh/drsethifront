import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import TopNavbar from "./TopNavbar";

const DashBoardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen bg-[#f4f4fc]">
        <TopNavbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};


export default DashBoardLayout;
