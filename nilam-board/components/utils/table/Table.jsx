import Image from 'next/image';
import React from 'react';

const Table = ({ itemList }) => {
  console.log('table  itemList: ', itemList);
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" class="px-6 py-3">
              Image
            </th>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Type
            </th>
            <th scope="col" class="px-6 py-3">
              Position
            </th>
            <th scope="col" class="px-6 py-3">
              Rating
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item, index) => (
            <tr
              key={item._id}
              class="bg-white border-b  "
            >
              <th
                scope="row"
                class="px-1 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                <Image
                  src={`http://localhost:5000/uploads/${item?.image}`}
                  alt="Example Image"
                  width={100}
                  height={100}
                />
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {item?.name}
              </th>
              <td class="px-6 py-4">{item?.type}</td>
              <td class="px-6 py-4">{item?.position}</td>
              <td class="px-6 py-4">{item?.rating}</td>
              <td class="px-6 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600  hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>

            // <li key={item._id}>
            //   {item.name} - Population: {item.rating}
            // </li>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default Table;
