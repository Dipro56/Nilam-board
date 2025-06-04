import { useState } from "react";
import Sidebar from "./sidebar/sidebar";
import { useRouter } from "next/router";
import { FaList } from "react-icons/fa6";
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
