import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { FaList } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/redux/feature/ui/uiSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  let dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-950 flex items-center px-6 py-4">
      <FaList
        onClick={() => {
          dispatch(toggleSidebar());
        }}
        fill="white"
        size={27}
      />
    </nav>
  );
};

export default Navbar;
