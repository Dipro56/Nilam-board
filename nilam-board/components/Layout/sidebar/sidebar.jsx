'use client';
import Image from 'next/image';
import React, {Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { IoMdHelpCircle } from 'react-icons/io';
import { FaList } from 'react-icons/fa6';
import { AiFillSound } from 'react-icons/ai';
import { FaPeopleGroup } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '@/redux/feature/auth/authSlice';
import { toggleSidebar } from '@/redux/feature/ui/uiSlice';
import { Menu, Transition } from '@headlessui/react';
import { getAllManager, getManagerList, getManagerListLoadingStatus } from '@/redux/feature/manager/managerSlice';
import { useRouter } from 'next/router';



const Sidebar = () => {
  let userInfo = useSelector((state) => state.auth.userInfo);
  let sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  let userRole = userInfo?.role;
  let dispatch = useDispatch();
  let router = useRouter()

  let allManagerList = useSelector(getAllManager);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const loadingState = useSelector(getManagerListLoadingStatus);
  const [playerPosition, setplayerPosition] = useState();

  const handleSelectManager = (value) => {
    router.push(`/manager-details/${value?.managerId}`);
  };

  useEffect(() => {
    if (loadingState === 'idle') {
      dispatch(getManagerList());
    }
  }, [dispatch,loadingState]);

  let managerOption = [];

  for (let i = 0; i < allManagerList?.length; i++) {
    //  { value: 'GK', label: 'GK' },
    let value = {
      managerId: allManagerList[i]?._id,
      name: allManagerList[i]?.name,
      club: allManagerList[i]?.club,
    };

    let label = allManagerList[i]?.name;
    let option = {
      id: i,
      value,
      label,
    };
    managerOption.push(option);
  }

  let itemImage = (
    <svg
      aria-hidden="true"
      class="w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
    </svg>
  );

  return (
    <main className="all-page-width">
      <div
        id="drawer-navigation"
        className={
          sidebarOpen
            ? 'fixed top-0 left-0 z-40 h-screen p-4 bg-blue-950 w-64 shadow-2xl'
            : 'fixed top-0 left-0 z-40 h-screen p-4 bg-blue-950 w-64 shadow-2xl overflow-y-auto transition-transform -translate-x-full'
        }
        tabindex="-1"
        ariaLabelledby="drawer-navigation-label"
      >
        <div className="flex mb-3">
          <div className="bg-blue-950 rounded-full">
            <div className="flex justify-center">Logo</div>
          </div>
          <button
            type="button"
            data-drawer-hide="drawer-navigation"
            aria-controls="drawer-navigation"
            className="bg-whitetext-gray-400  hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center"
            onClick={() => {
              dispatch(toggleSidebar());
            }}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <hr />
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li className="bg-white rounded-lg hover:bg-red-200">
              <Link
                href="/auction-table"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <FaUser
                  style={{
                    color: '#BF0404',
                  }}
                  size={16}
                />
                <span className="ms-2 text-customTextColor text-sm">
                  auction-table
                </span>
              </Link>
            </li>

            <li className="bg-white rounded-lg hover:bg-red-200 mb-4">
              <Link
                href="/add-player"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <FaList
                  style={{
                    color: '#BF0404',
                  }}
                  size={16}
                />
                <span className="ms-2 text-customTextColor text-sm">
                  add-player
                </span>
              </Link>
            </li>

            <li className="bg-white rounded-lg hover:bg-red-200 mb-4">
              <Link
                href="/create-manager"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <FaList
                  style={{
                    color: '#BF0404',
                  }}
                  size={16}
                />
                <span className="ms-2 text-customTextColor text-sm">
                  create-manager
                </span>
              </Link>
            </li>

            <li className="bg-white rounded-lg hover:bg-red-200 mb-4">
              <Link
                href="/manager-list"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <FaList
                  style={{
                    color: '#BF0404',
                  }}
                  size={16}
                />
                <span className="ms-2 text-customTextColor text-sm">
                  manager-list
                </span>
              </Link>
            </li>

            <li className="bg-white rounded-lg hover:bg-red-200 mb-4">
              <Link
                href="/player-list"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <FaList
                  style={{
                    color: '#BF0404',
                  }}
                  size={16}
                />
                <span className="ms-2 text-customTextColor text-sm">
                  player-list
                </span>
              </Link>
            </li>

            <div className="w-full">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className=" bg-white text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center   ">
                {playerPosition ? playerPosition : 'See Manger Details'}
                <svg
                  class="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                className="block px-4 py-2 bg-white  "
                style={{ zIndex: '50' }}
              >
                {managerOption?.map((option) => (
                  <Menu.Item key={option.id}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={() => {
                          handleSelectManager(option.value);
                        }}
                      >
                        {option.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
             
            
            

            

            {/* {userRole === "admin" && (
              <>
                {" "}
                <li className="bg-white rounded-lg hover:bg-red-200 mb-4">
                  <Link
                    href="/announce-slot"
                    className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                  >
                    <AiFillSound
                      style={{
                        color: "#BF0404",
                      }}
                      size={16}
                    />
                    <span className="ms-2 text-customTextColor text-sm">
                      Announce Slot
                    </span>
                  </Link>
                </li>
                <li className="bg-white rounded-lg hover:bg-red-200 mb-4">
                  <Link
                    href="/make-team"
                    className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                  >
                    <FaPeopleGroup
                      style={{
                        color: "#BF0404",
                      }}
                      size={16}
                    />
                    <span className="ms-2 text-customTextColor text-sm">
                      Make Team
                    </span>
                  </Link>
                </li>
                <li className="bg-white rounded-lg hover:bg-red-200 mb-4">
                  <Link
                    href="/requested-slot"
                    className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                  >
                    <FaPeopleGroup
                      style={{
                        color: "#BF0404",
                      }}
                      size={16}
                    />
                    <span className="ms-2 text-customTextColor text-sm">
                      Requested Slot
                    </span>
                  </Link>
                </li>
              </>
            )} */}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Sidebar;

// import { useState, useEffect } from 'react';
// import { SidebarItem } from './sidebar-item/SidebarItem';
// import { Menu, Transition } from '@headlessui/react';
// import {
//   getAllManager,
//   getManagerList,
//   getManagerListLoadingStatus,
// } from '@/redux/feature/manager/managerSlice';
// import React, { Fragment } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Router, useRouter } from 'next/router';

// const Sidebar = () => {
//   const router = useRouter();

//   let dispatch = useDispatch();
//   let allManagerList = useSelector(getAllManager);
//   const loadingState = useSelector(getManagerListLoadingStatus);
//   const [playerPosition, setplayerPosition] = useState();

//   const handleSelectManager = (value) => {
//     router.push(`/manager-details/${value?.managerId}`);
//   };

//   useEffect(() => {
//     if (loadingState === 'idle') {
//       dispatch(getManagerList());
//     }
//   }, []);

//   let managerOption = [];

//   for (let i = 0; i < allManagerList?.length; i++) {
//     //  { value: 'GK', label: 'GK' },
//     let value = {
//       managerId: allManagerList[i]?._id,
//       name: allManagerList[i]?.name,
//       club: allManagerList[i]?.club,
//     };

//     let label = allManagerList[i]?.name;
//     let option = {
//       id: i,
//       value,
//       label,
//     };
//     managerOption.push(option);
//   }

//   let itemImage = (
//     <svg
//       aria-hidden="true"
//       class="w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
//       fill="currentColor"
//       viewBox="0 0 20 20"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
//       <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
//     </svg>
//   );
//   return (
//     <div className="sidebar layout-background-color text-white w-60 flex-none flex flex-col ">
//       {/* Sidebar content */}
//       <ul class="space-y-2 font-medium py-10 px-3">
//         <hr />
//         <div className="flex justify-center">
//           <button className="bg-blue-800 p-2 w-auto self-center">Login</button>
//         </div>
//         <hr />
//         <SidebarItem
//           pathName={''}
//           itemImage={itemImage}
//           itemName={'Dashboard'}
//         />
//         <SidebarItem
//           pathName={'auction-table'}
//           itemImage={itemImage}
//           itemName={'Auction table'}
//         />
//         <SidebarItem
//           pathName={'add-player'}
//           itemImage={itemImage}
//           itemName={'Add player'}
//         />
//         <SidebarItem
//           pathName={'create-manager'}
//           itemImage={itemImage}
//           itemName={'Create Manager'}
//         />
//         <SidebarItem
//           pathName={'manager-list'}
//           itemImage={itemImage}
//           itemName={'Manager list'}
//         />
//         <SidebarItem
//           pathName={'player-list'}
//           itemImage={itemImage}
//           itemName={'Player list'}
//         />

//         <div className="mt-4 mb-4 mx-2">
//           <Menu as="div" className="relative inline-block text-left">
//             <div>
//               <Menu.Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center   ">
//                 {playerPosition ? playerPosition : 'See Manger Details'}
//                 <svg
//                   class="w-4 h-4 ml-2"
//                   aria-hidden="true"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="M19 9l-7 7-7-7"
//                   ></path>
//                 </svg>
//               </Menu.Button>
//             </div>
//             <Transition
//               as={Fragment}
//               enter="transition ease-out duration-100"
//               enterFrom="transform opacity-0 scale-95"
//               enterTo="transform opacity-100 scale-100"
//               leave="transition ease-in duration-75"
//               leaveFrom="transform opacity-100 scale-100"
//               leaveTo="transform opacity-0 scale-95"
//             >
//               <Menu.Items
//                 className="block px-4 py-2 bg-white  "
//                 style={{ zIndex: '50' }}
//               >
//                 {managerOption?.map((option) => (
//                   <Menu.Item key={option.id}>
//                     {({ active }) => (
//                       <button
//                         className={`${
//                           active ? 'bg-blue-500 text-white' : 'text-gray-900'
//                         } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
//                         onClick={() => {
//                           handleSelectManager(option.value);
//                         }}
//                       >
//                         {option.label}
//                       </button>
//                     )}
//                   </Menu.Item>
//                 ))}
//               </Menu.Items>
//             </Transition>
//           </Menu>
//         </div>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
