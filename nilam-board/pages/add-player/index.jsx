import Image from 'next/image';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const AddPlayer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageObject, setSelectedImageObject] = useState(null);

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedImageObject(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <main className=" p-5 ">
      <div className="p-6  flex justify-center">
        <form className="p-4 bg-start flex-1 justify-center max-w-5xl bg-slate-100">
           <h1 className='text-center text-3xl py-5'>Add player</h1>
          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Player name
            </label>
            <input
              type="email"
              id="email"
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
              Player position
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required
            />
          </div>

          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Player rating
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
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
                        src={selectedImage || '/image/user.jpeg'}
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
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddPlayer;
