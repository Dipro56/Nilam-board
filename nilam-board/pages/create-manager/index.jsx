import Image from 'next/image';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import notifications from '@/utils/notification-toast/Notification';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';


const CreateManager = () => {
  const [managerImage, setManagerImage] = useState(null);
  const [selectedImageObject, setSelectedImageObject] = useState(null);
  const [managerName, setManagerName] = useState();
  const [managerClub, setManagerClub] = useState();
  const [totalMoney, setTotalMoney] = useState('200');
  const [totalSpent, setTotalSpent] = useState('0');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      managerName &&
      managerClub &&
      totalMoney &&
      totalSpent &&
      managerImage
    ) {
      let data = new FormData();
      data.append('name', managerName);
      data.append('club', managerClub);
      data.append('totalMoney', totalMoney);
      data.append('totalSpent', totalSpent);
      data.append('image', managerImage);

      let config = {
        method: 'post',
        url: 'http://localhost:5000/api/v1/create-manager',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };

      axios(config)
        .then((res) => {
          if (res?.status === 200) {
            notifications.success(res?.data.message, 'top-center');
          }
        })
        .then((error) => console.error(error));
    } else {
      notifications.error('Complete every field', 'top-center');
    }
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedImageObject(URL.createObjectURL(file));
    setManagerImage(file);
  };

  return (
    <main className=" p-5 ">
      <div className="p-6  flex justify-center">
        <form className="p-4 bg-start flex-1 justify-center max-w-5xl bg-slate-100">
          <h1 className="text-center text-3xl py-5">Create manager</h1>
          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Manager name
            </label>
            <input
              onChange={(event) => {
                setManagerName(event.target.value);
              }}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required
            />
          </div>

          <div className="mb-6 ">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Club name
            </label>
            <input
              type="text"
              onChange={(event) => {
                setManagerClub(event.target.value);
              }}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Club"
              required
            />
          </div>

          <div className="py-5">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Drop manager image
            </label>
            <Dropzone className="flex justify-center" onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <section className="flex justify-center">
                  <div className="bg-gray=100" {...getRootProps()}>
                    <input {...getInputProps()} accept="image/*" />
                    <a href="#!" className="update-profile-photo">
                      <Image
                        height={400}
                        width={400}
                        style={{
                          borderRadius: '0%',
                        }}
                        src={selectedImageObject || '/image/user.jpeg'}
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
        <Toaster />
      </div>
    </main>
  );
};

export default CreateManager;
