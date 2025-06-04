import { useState } from "react";
import { useRouter } from "next/router";
import { FaList } from "react-icons/fa6";
import Sidebar from "./sidebar/sidebar";
import Navbar from "./navbar/navbar";

const Layout = ({ children }) => {
  let router = useRouter();

  const pathname = router.pathname;

  console.log("pathname", pathname);

  return (
    <div>
      {pathname != "/login" ? <Sidebar /> : <></>}

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
