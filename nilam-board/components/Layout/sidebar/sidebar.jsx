import { useState } from 'react';
import { SidebarItem } from './sidebar-item/SidebarItem';

const Sidebar = () => {
  let itemImage = (
    <svg
      aria-hidden="true"
      class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
    </svg>
  );
  return (
    <div
      style={{ height: '100vh' }}
      className="bg-gray-100 text-white w-60 flex-none flex flex-col"
    >
      {/* Sidebar content */}
      <ul class="space-y-2 font-medium py-10 px-3">
        <SidebarItem
          pathName={''}
          itemImage={itemImage}
          itemName={'Dashboard'}
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
          pathName={'player-list'}
          itemImage={itemImage}
          itemName={'Player list'}
        />
      </ul>
    </div>
  );
};

export default Sidebar;
