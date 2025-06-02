import {
  getAllManager,
  getManagerList,
  getManagerListLoadingStatus,
} from "@/redux/feature/manager/managerSlice";
import { Menu, Transition } from "@headlessui/react";
import { closeModal, openModal } from "@/redux/feature/modal/modalSlice";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "@/utils/config";

const Auction = ({ playerList }) => {
  const [playerPosition, setplayerPosition] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  let dispatch = useDispatch();
  let allManagerList = useSelector(getAllManager);
  const loadingState = useSelector(getManagerListLoadingStatus);
  const [clubToSell, setClubToSell] = useState();
  const [managerId, setManagerId] = useState();
  const [manager, setManager] = useState();
  const [totalMoney, setTotalMoney] = useState();
  const [playerPrice, setPlayerPrice] = useState();

  const ableSoldButton =
    Boolean(manager) && Boolean(clubToSell) && Boolean(playerPrice);

  console.log("ableSoldButton: ", ableSoldButton);

  //dropdownOptions
  let managerOption = [];

  for (let i = 0; i < allManagerList?.length; i++) {
    //  { value: 'GK', label: 'GK' },
    let value = {
      id: allManagerList[i]?._id,
      name: allManagerList[i]?.name,
      club: allManagerList[i]?.club,
      totalMoney: allManagerList[i]?.totalMoney,
    };

    let label = allManagerList[i]?.name;
    let option = {
      id: i,
      value,
      label,
    };
    managerOption.push(option);
  }

  const handleSelectManager = (value) => {
    setManagerId(value?.id);
    setClubToSell(value?.club);
    setManager(value?.name);
    setTotalMoney(value?.totalMoney);
  };

  useEffect(() => {
    if (loadingState === "idle") {
      dispatch(getManagerList());
    }
  }, []);

  const handleOpenModal = () => {
    console.log("handleOpenModal");
    let playerSellingInfo = {
      managerId,
      playerPrice,
      clubToSell,
      manager,
      totalMoney,
    };

    console.log("randomPlayer: ", randomPlayer);
    console.log("filteredPlayerList: length", filteredPlayerList?.length);
    console.log("filteredPlayerList: ", filteredPlayerList);
    let removeSelectedPlayer = filteredPlayerList.filter(
      (item) => item?.name !== randomPlayer?.name
    );
    setFilteredPlayerList(removeSelectedPlayer);
    dispatch(
      openModal({
        modalType: "PlayerSoldModal",
        modalProps: { randomPlayer, playerSellingInfo },
      })
    );
    setClubToSell();
    setManager();
    setManagerId();
    setTotalMoney();
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [listType, setListType] = useState();
  const handleListType = (event) => {
    setListType(event.target.value);
  };

  const [filteredPlayerList, setFilteredPlayerList] = useState();
  const [randomPlayer, setRandomPlayer] = useState();
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => {
      clearInterval(timer);
    };
  }, [counter]);

  const radioOption = [
    { value: "GK", label: " GK " },
    { value: "DEF", label: " DEF " },
    { value: "WB", label: " WB " },
    { value: "MID", label: " MID " },
    { value: "FWD", label: " FWD " },
  ];

  const handleRandomCall = () => {
    let getRandomNumber = Math.floor(Math.random() * filteredPlayerList.length);
    console.log("getRandomNumber: ", getRandomNumber);
    let selectedRandomPlayer = filteredPlayerList[getRandomNumber];
    console.log("selectedRandomPlayer: ", selectedRandomPlayer);
    setRandomPlayer(selectedRandomPlayer);
    setClubToSell();
    setManager();
    setManagerId();
    setTotalMoney();
    setCounter(5);
  };

  const handleSold = () => {};

  const handleUnsold = () => {};

  useEffect(() => {
    let filteredList = playerList?.filter(
      (player) => player.type === listType && player.club === "Free agent"
    );
    console.log("filteredList: ", filteredList);
    setFilteredPlayerList(filteredList);
  }, [listType]);

  return (
    <main className="p-6 auction-board ">
      <div className="flex justify-center text-2xl font-bold">
        Select list type
      </div>
      <div className="flex justify-center pt-3 ">
        {radioOption.map((option) => (
          <label className="p-2 text-xl font-semibold" key={option.value}>
            <input
              type="radio"
              value={option.value}
              checked={listType === option.value}
              onChange={handleListType}
              className="px-2"
            />
            {option.label}
          </label>
        ))}
        {/* <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-5 px-6 py-2.5 text-center "
        >
          Filter
        </button> */}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleRandomCall}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-5 px-6 py-2.5 text-center"
        >
          Call
        </button>
      </div>
      {counter ? (
        <div className="flex justify-center text-9xl font-extrabold">
          {counter}
        </div>
      ) : (
        <div className="play-image-card-alignment flex mt-5">
          {randomPlayer ? (
            <div className="text-3xl font-bold my-5 flex justify-center ">
              <Image
                src={`${baseUrl}/uploads/${randomPlayer?.image}`}
                alt="Example Image"
                width={750}
                height={100}
              />
            </div>
          ) : (
            <div className="text-3xl font-bold my-5"></div>
          )}

          {randomPlayer && (
            <div className="flex justify-center">
              <div className="w-full max-w-xl max-h-full mx-5 p-5 shadow-xl bg-slate-50 border-black">
                <div className="text-2xl font-semibold text-gray-900 ">
                  <div>{randomPlayer?.name}</div>
                </div>
                <div className="text-lg font-semibold my-2">
                  Position : {randomPlayer?.position}
                </div>
                <div className="text-lg font-semibold my-2 ">
                  Rating : {randomPlayer?.rating}
                </div>

                <div className="text-lg font-bold my-2">
                  Price
                  <input
                    type="number"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                    placeholder="Price"
                    onChange={(event) => {
                      setPlayerPrice(event.target.value);
                    }}
                    required
                  />
                </div>
                <div className="mt-4 mb-2 ">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center   ">
                        {playerPosition ? playerPosition : "Select manager"}
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
                        className="block px-4 py-2 bg-white"
                        style={{ zIndex: "50" }}
                      >
                        {managerOption?.map((option) => (
                          <Menu.Item key={option.id}>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-900"
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

                <div className="text-lg font-semibold ">
                  Manager : {manager}
                </div>

                <div className="text-lg font-semibold ">
                  Club : {clubToSell}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {randomPlayer && counter === 0 ? (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleOpenModal}
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-5 px-6 py-2.5 text-center "
            disabled={!ableSoldButton}
          >
            Sold
          </button>

          <button
            onClick={handleRandomCall}
            type="submit"
            className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-5 px-6 py-2.5 text-center"
          >
            Unsold
          </button>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
};

export default Auction;

export async function getServerSideProps() {
  // Fetch data from your data source (e.g., an API)
  const response = await fetch(`${baseUrl}/player/get-all-player`);
  console.log("response: ", response);
  const playerListResponse = await response.json();
  const playerList = playerListResponse?.data;

  return {
    props: {
      playerList,
    },
  };
}
