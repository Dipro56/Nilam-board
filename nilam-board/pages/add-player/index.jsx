import Image from 'next/image';
import React, { Fragment, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Menu, Transition } from '@headlessui/react';
import axios from 'axios';

const AddPlayer = () => {
  const [playerImage, setPlayerImage] = useState(null);
  const [selectedImageURL, setSelectedImageURL] = useState(null);

  const [playerName, setPlayerName] = useState();
  const [playerRating, setPlayerRating] = useState();
  const [playerType, setPlayerType] = useState();
  const [playerPosition, setplayerPosition] = useState();

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log('handle drop file: ', file?.path);
    setSelectedImageURL(URL.createObjectURL(file));
    setPlayerImage(file);
  };

  const handleSelectplayerPosition = (value) => {
    setplayerPosition(value);
  };

  const handlePlayerType = (event) => {
    setPlayerType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('handle submit: ' , playerImage)

    if (
      playerName &&
      playerPosition &&
      playerRating &&
      playerType &&
      playerImage
    ) {
      let data = new FormData();
      data.append('name', playerName);
      data.append('type', playerType);
      data.append('position', playerPosition);
      data.append('rating', playerRating);
      data.append('image', playerImage);

      let config = {
        method: 'post',
        url: 'http://localhost:5000/api/v1/create-player',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };

      axios(config)
        .then((res) => {
          if (res?.status === 200) {
            alert(res?.data.message)
          }
        })
        .then((error) => console.error(error));
    } else {
      alert('Fill every field');
    }
    console.log(
      'playerName, playerPosition, playerRating, playerType, playerImage: ',
      playerName,
      playerPosition,
      playerRating,
      playerType,
      playerImage
    );
  };

  const radioOption = [
    { value: 'GK', label: ' GK ' },
    { value: 'DEF', label: ' DEF ' },
    { value: 'WB', label: ' WB ' },
    { value: 'MID', label: ' MID ' },
    { value: 'FWD', label: ' FWD ' },
  ];

  const dropdownOptions = [
    { value: 'GK', label: 'GK' },
    { value: 'CB', label: 'CB' },
    { value: 'LB', label: 'LB' },
    { value: 'RB', label: 'RB' },
    { value: 'LWB', label: 'LWB' },
    { value: 'RWB', label: 'RWB' },
    { value: 'CDM', label: 'CDM' },
    { value: 'CM', label: 'CM' },
    { value: 'LM', label: 'LM' },
    { value: 'RM', label: 'RM' },
    { value: 'CAM', label: 'CAM' },
    { value: 'LW', label: 'LW' },
    { value: 'RW', label: 'RW' },
    { value: 'CF', label: 'CF' },
    { value: 'ST', label: 'ST' },
  ];

  return (
    <main className=" p-5 ">
      <div className="p-6  flex justify-center">
        <form className="p-4 bg-start flex-1 justify-center max-w-5xl bg-slate-100">
          <h1 className="text-center text-3xl py-5">Add player</h1>
          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Player name
            </label>
            <input
              type="text"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Name"
              onChange={(event) => {
                setPlayerName(event.target.value);
              }}
              required
            />
          </div>

          <div className="mb-6 ">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Player type
            </label>
            <div>
              {radioOption.map((option) => (
                <label className="p-2" key={option.value}>
                  <input
                    type="radio"
                    value={option.value}
                    checked={playerType === option.value}
                    onChange={handlePlayerType}
                    className="px-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6 ">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Player position
            </label>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  ">
                  {playerPosition ? playerPosition : 'Select an option'}
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
                  className="block px-4 py-2 bg-white dark:hover:bg-gray-600 dark:hover:text-white"
                  style={{ zIndex: '50' }}
                >
                  {dropdownOptions.map((option) => (
                    <Menu.Item key={option.value}>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-blue-500 text-white' : 'text-gray-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          onClick={() =>
                            handleSelectplayerPosition(option.value)
                          }
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

          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Player rating
            </label>
            <input
              type="number"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Rating"
              onChange={(evet) => {
                setPlayerRating(event.target.value);
              }}
              required
            />
          </div>

          <div className="py-5">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Drop player image
            </label>
            <Dropzone className="flex justify-center" onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <section className="flex justify-center">
                  <div className="bg-gray=100" {...getRootProps()}>
                    <input {...getInputProps()} accept="image/*" />
                    <a href="#!" className="update-profile-photo">
                      {/* {selectedImage && <img src={selectedImage} alt="Selected" />} */}
                      <Image
                        height={400}
                        width={400}
                        style={{
                          borderRadius: '0%',
                        }}
                        src={selectedImageURL || '/image/user.jpeg'}
                        alt="icon"
                      />
                    </a>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddPlayer;
