import Modal from '@/components/utils/modal/Modal';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';


const Auction = ({ playerList }) => {

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
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
    { value: 'GK', label: ' GK ' },
    { value: 'DEF', label: ' DEF ' },
    { value: 'WB', label: ' WB ' },
    { value: 'MID', label: ' MID ' },
    { value: 'FWD', label: ' FWD ' },
    { value: 'Free Agent', label: ' Free Agent ' },
  ];

  const handleRandomCall = () => {
    let getRandomNumber = Math.floor(Math.random() * filteredPlayerList.length);
    let selectedRandomPlayer = filteredPlayerList[getRandomNumber];
    console.log('selectedRandomPlayer: ', selectedRandomPlayer);
    setRandomPlayer(selectedRandomPlayer);
    setCounter(5);
  };

  const handleSold = () => {
    
  }

  const handleUnsold = () => {
    
  }

  useEffect(() => {
    let filteredList = playerList?.filter((player) => player.type === listType);
    setFilteredPlayerList(filteredList);
  }, [listType]);

  return (
    <main className="p-6">
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
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-5 px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Filter
        </button> */}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleRandomCall}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-5 px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Call
        </button>
      </div>
      {counter ? (
        <div className="flex justify-center text-9xl font-extrabold">
          {counter}
        </div>
      ) : (
        <div>
          <div className="flex justify-center text-5xl font-bold my-5">
            <div>{randomPlayer?.name}</div>
          </div>
          <div className="flex justify-center text-3xl font-bold my-3">
            Position : {randomPlayer?.position}
          </div>
          <div className="flex justify-center text-3xl font-bold my-3">
            Rating : {randomPlayer?.rating}
          </div>

          <div className="flex justify-center text-3xl font-bold my-5">
            <Image
              src={`http://localhost:5000/uploads/${randomPlayer?.image}`}
              alt="Example Image"
              width={700}
              height={700}
            />
          </div>
          {randomPlayer ? (
            <div className="flex justify-center">
              <button
                onClick={openModal}
                type="submit"
                className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-5 px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sold
              </button>

              <button
                onClick={handleRandomCall}
                type="submit"
                className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-5 px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Unsold
              </button>
            </div>
          ) : (
            <></>
            )}
                  <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      )}
    </main>
  );
};

export default Auction;

export async function getServerSideProps() {
  // Fetch data from your data source (e.g., an API)
  const response = await fetch('http://localhost:5000/api/v1');
  console.log('response: ', response);
  const playerListResponse = await response.json();
  const playerList = playerListResponse?.data;

  return {
    props: {
      playerList,
    },
  };
}
