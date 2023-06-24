import Link from 'next/link';
import React from 'react';

export const SidebarItem = (props) => {
  const { pathName, itemImage, itemName } = props;

  return (
    <Link
      href={{
        pathname: `/${pathName}`,
      }}
    >
      <li>
        <a
          href="#"
          class="flex items-center p-2 layout-item-color rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700"
        >
          {itemImage}
          <span class="ml-3">{itemName}</span>
        </a>
      </li>
    </Link>
  );
};
