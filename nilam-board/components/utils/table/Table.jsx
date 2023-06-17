import Image from 'next/image';
import React from 'react';

const Table = ({ playerList }) => {
  console.log('table  playerList: ', playerList);
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
          {playerList.map((item, index) => (
            <tr
              key={item._id}
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                class="px-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
              <Image src={`http://localhost:5000/uploads/${item?.image}`} alt="Example Image" width={150} height={150} />
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item?.name}
              </th>
              <td class="px-6 py-4">{item?.type}</td>
              <td class="px-6 py-4">{item?.position}</td>
              <td class="px-6 py-4">{item?.rating}</td>
              <td class="px-6 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
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

    // <div className="overflow-x-auto">
    //   <table className="min-w-full divide-y divide-gray-200">
    //     {/* Table headers */}
    //     <thead className="bg-gray-50">
    //       <tr>
    //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Header 1</th>
    //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Header 2</th>
    //         {/* Add more table headers as needed */}
    //       </tr>
    //     </thead>

    //     {/* Table rows */}
    //     <tbody className="bg-white divide-y divide-gray-200">
    //       {data.map((item) => (
    //         <tr key={item.id}>
    //           {item.name}
    //           {item.club}
    //           {/* Use item properties to populate the cell content */}
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default Table;
