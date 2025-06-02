import { useState, useEffect } from 'react';
import { SidebarItem } from './sidebar-item/SidebarItem';
import { Menu, Transition } from '@headlessui/react';
import {
  getAllManager,
  getManagerList,
  getManagerListLoadingStatus,
} from '@/redux/feature/manager/managerSlice';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  let dispatch = useDispatch();
  let allManagerList = useSelector(getAllManager);
  const loadingState = useSelector(getManagerListLoadingStatus);
  const [playerPosition, setplayerPosition] = useState();

  const handleSelectManager = (value) => {
    router.push(`/manager-details/${value?.managerId}`);
  };

  useEffect(() => {
    if (loadingState === 'idle') {
      dispatch(getManagerList());
    }
  }, []);

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
    <div className="sidebar layout-background-color text-white w-60 flex-none flex flex-col ">
      {/* Sidebar content */}
      <ul class="space-y-2 font-medium py-10 px-3">
        <hr />
        <div className="flex justify-center">
          <button className="bg-blue-800 p-2 w-auto self-center">Login</button>
        </div>
        <hr />
        <SidebarItem
          pathName={''}
          itemImage={itemImage}
          itemName={'Dashboard'}
        />
        <SidebarItem
          pathName={'auction-table'}
          itemImage={itemImage}
          itemName={'Auction table'}
        />
        <SidebarItem
          pathName={'add-player'}
          itemImage={itemImage}
          itemName={'Add player'}
        />
        <SidebarItem
          pathName={'create-manager'}
          itemImage={itemImage}
          itemName={'Create Manager'}
        />
        <SidebarItem
          pathName={'manager-list'}
          itemImage={itemImage}
          itemName={'Manager list'}
        />
        <SidebarItem
          pathName={'player-list'}
          itemImage={itemImage}
          itemName={'Player list'}
        />

        <div className="mt-4 mb-4 mx-2">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center   ">
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
      </ul>
    </div>
  );
};

export default Sidebar;
