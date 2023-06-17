import { useState } from "react";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";


const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
        <Sidebar />
      </div>
      

      {/* Content */}
      <div className="flex-1">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;







