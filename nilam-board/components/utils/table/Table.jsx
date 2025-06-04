import { openModal } from "@/redux/feature/modal/modalSlice";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

const Table = ({ itemList }) => {
  console.log("table  itemList: ", itemList);

  let dispatch = useDispatch();

  const handleOpenModal = (item) => {
    console.log("handleOpenModal", item);

    dispatch(
      openModal({
        modalType: "EditPlayerModal",
        modalProps: { item },
      })
    );
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Rating
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item, index) => (
            <tr key={item._id} className="bg-white border-b  ">
              <th
                scope="row"
                className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                <Image
                  src={item?.image}
                  alt="Example Image"
                  width={100}
                  height={100}
                />
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {item?.name}
              </th>
              <td className="px-6 py-4">{item?.type}</td>
              <td className="px-6 py-4">{item?.position}</td>
              <td className="px-6 py-4">{item?.rating}</td>
              <td
                onClick={() => {
                  handleOpenModal(item);
                }}
                className="px-6 py-4 font-medium text-blue-600  hover:underline"
              >
                Edit
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
