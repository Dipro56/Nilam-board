import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { closeModal, getModalProps } from '@/redux/feature/modal/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import axios from 'axios';
import notifications from '@/utils/notification-toast/Notification';
import toast, { Toaster } from 'react-hot-toast';
import { getManagerList } from '@/redux/feature/manager/managerSlice';
import { baseUrl } from '@/utils/config';


function PlayerSoldModal() {
  const [isOpen, setIsOpen] = useState(true);
  let dispatch = useDispatch();
  let soldPlayer = useSelector(getModalProps);

  const handleSubmit = (soldPlayer) => {
    console.log('handle submit', soldPlayer);
    let updatedPlayerInfo = {
      playerId: soldPlayer?.randomPlayer?._id,
      price: soldPlayer?.playerSellingInfo?.playerPrice,
      club: soldPlayer?.playerSellingInfo?.clubToSell,
      clubOwner: soldPlayer?.playerSellingInfo?.manager,
    };

    let moneyCalculation =
      parseInt(soldPlayer?.playerSellingInfo?.totalMoney) -
      parseInt(soldPlayer?.playerSellingInfo?.playerPrice);
    console.log('moneyCalculation: ', moneyCalculation);

    let updatedManagerInfo = {
      managerId: soldPlayer?.playerSellingInfo?.managerId,
      totalMoney: `${moneyCalculation}`,
      totalSpent: `${200 - moneyCalculation}`,
    };

    let postBody = {
      updatedManagerInfo,
      updatedPlayerInfo,
    };

    let URL = `${baseUrl}/transfer/transfer-update`;

    axios
      .post(URL, postBody)
      .then((res) => {
        notifications.success(res?.data?.playerUpdateMessage, 'top-center');
        dispatch(getManagerList());
        setTimeout(() => {
          dispatch(closeModal());
        }, 4000);
      })
      .then((err) => {
        console.error(err);
      });


    console.log('postBody: ', postBody);
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      {/* Content of your dialog */}
      <div class="w-full max-w-2xl max-h-full">
        <div class="bg-white rounded-lg shadow ">
          <div class="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 class="text-xl font-semibold text-gray-900 ">
              Sell player
            </h3>
            <button
              onClick={handleClose}
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              data-modal-hide="defaultModal"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <div class="p-6 ">
            <div className=" text-xl font-bold">
              <div>{soldPlayer?.randomPlayer?.name}</div>
            </div>
            <div className="text-sm font-bold my-2">
              Position : {soldPlayer?.randomPlayer?.position}
            </div>
            <div className=" text-sm font-bold my-2">
              Rating : {soldPlayer?.randomPlayer?.rating}
            </div>

            <div className="flex justify-center text-3xl font-bold my-5">
              <Image
                src={`http://localhost:5000/uploads/${soldPlayer?.randomPlayer?.image}`}
                alt="Example Image"
                width={300}
                height={300}
              />
            </div>

            <div className=" text-xl font-bold">
              <div className="mb-2">Selling details</div>
              <hr />
              <div className="mt-3 text-sm font-bold">
                <div>Price: {soldPlayer?.playerSellingInfo?.playerPrice}M</div>
              </div>
              <div className=" text-sm font-bold">
                <div>Club: {soldPlayer?.playerSellingInfo?.clubToSell}</div>
              </div>
              <div className=" text-sm font-bold">
                <div>Manager: {soldPlayer?.playerSellingInfo?.manager}</div>
              </div>
            </div>
          </div>

          <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
            <button
              data-modal-hide="defaultModal"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              onClick={() => {
                handleSubmit(soldPlayer);
              }}
            >
              Submit
            </button>
            {/* <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none"
              onClose={handleSubmit}
            >
              Submit
            </button> */}
            <button
              data-modal-hide="defaultModal"
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
              onClick={handleClose}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </Dialog>
  );
}

export default PlayerSoldModal;
