import { baseUrl } from '@/utils/config';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export const getServerSideProps = async (context) => {
  const queryParams = context?.query;
  const URL = `${baseUrl}/manager/${queryParams?.managerId}`;
  const playerListURL = `${baseUrl}/player/get-all-player`;

  const managerDetailsResponse = await fetch(URL).then((res) => {
    return res.json();
  });

  const playerListResponse = await fetch(playerListURL).then((res) => {
    return res.json();
  });

  const managerDetails = managerDetailsResponse?.data;
  const playerList = playerListResponse?.data;
  return {
    props: {
      managerDetails,
      playerList,
    },
  };
};

const ManagerDetails = ({ managerDetails, playerList }) => {
  const [clubPlayerList, setClubPlayerList] = useState();
  const [refresh , setRefresh] = useState()
  let router = useRouter();

  useEffect(() => {
    setRefresh(Math.random())
  },[router])

  useEffect(() => {
    let club = managerDetails?.club;
    let clubPlayers = playerList?.filter((player) => player.club === club);
    console.log('clubPlayers: ', clubPlayers);
    setClubPlayerList(clubPlayers);
  }, [managerDetails, playerList]);


  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-xl max-h-full mx-5 p-7 shadow-xl bg-slate-50 border-black">
          <div className=" text-3xl font-semibold text-gray-900  my-3">
            <div>{managerDetails?.name}</div>
          </div>
          <div>
            <Image
              src={`http://localhost:5000/uploads/${managerDetails?.image}`}
              alt="Example Image"
              width={500}
              height={500}
            />
          </div>
          <div className="text-lg mt-4 font-semibold ">
            Total remaining : {`${managerDetails?.totalMoney}M`}
          </div>
          <div className="text-lg font-semibold my-2">
            Total spent : {`${managerDetails?.totalSpent}M`}
          </div>

          <div className="text-lg font-semibold ">
            Club : {managerDetails?.club}
          </div>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg"></div>
      </div>
      <div>
        <div className="flex justify-center my-6 text-2xl">Team list</div>
        {clubPlayerList?.length ? (
          <table class="w-full text-sm text-left text-gray-500  mt-5">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Image
                </th>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Position
                </th>
                <th scope="col" class="px-6 py-3">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {clubPlayerList?.map((item, index) => (
                <tr
                  key={item._id}
                  class="bg-white border-b  "
                >
                  <th
                    scope="row"
                    class="px-1 py-4 font-medium text-gray-900 whitespace-nowrap "
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
                  <td class="px-6 py-4">{`${item?.price}M`}</td>
                  <td class="px-6 py-4">{item?.position}</td>
                  <td class="px-6 py-4">{item?.rating}</td>
                </tr>

                // <li key={item._id}>
                //   {item.name} - Population: {item.rating}
                // </li>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No member found</div>
        )}
      </div>
    </>
  );
};

export default ManagerDetails;
