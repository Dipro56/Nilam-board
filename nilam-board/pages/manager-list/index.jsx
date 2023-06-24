import Image from 'next/image';
import React from 'react';

const ManagerList = ({ managerList }) => {
  return (
    <div>
      {managerList?.length ? (
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
                  Club
                </th>
                <th scope="col" class="px-6 py-3">
                  Remaining
                </th>
                <th scope="col" class="px-6 py-3">
                  Spent
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {managerList.map((item, index) => (
                <tr
                  key={item._id}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Image
                      src={`http://localhost:5000/uploads/${item?.image}`}
                      alt="Example Image"
                      width={50}
                      height={50}
                    />
                  </th>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item?.name}
                  </th>
                  <td class="px-6 py-4">{item?.club}</td>
                  <td class="px-6 py-4">{`${item?.totalMoney}M`}</td>
                  <td class="px-6 py-4">{`${item?.totalSpent}M`}</td>
                  <td class="px-6 py-4">
                    <a
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>No data in list</>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  const response = await fetch(
    'http://localhost:5000/api/v1/manager/get-all-manager'
  );

  const managerListResponse = await response.json();
  const managerList = managerListResponse?.data;

  return {
    props: {
      managerList,
    },
  };
}

export default ManagerList;
