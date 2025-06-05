// pages/TablePage.js
import { Fragment, useEffect, useState } from 'react';
import Pagination from '@/components/utils/pagination/Pagination';
import Table from '@/components/utils/table/Table';
import {
  getAllPlayers,
  getPlayerList,
  getPlayerListLoadingStatus,
} from '@/redux/feature/player/playerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';
import { baseUrl } from '@/utils/config';

const PalyerList = ({ playerList }) => {
  console.log('player list data: ', playerList);
  const itemsPerPage = 20; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [playerPosition, setplayerPosition] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [searchResultList, setSearchResultList] = useState();

  const allPlayerList = useSelector(getAllPlayers);
  console.log('allPlayerList: ', allPlayerList);

  // Calculate the range of items to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = playerList?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(playerList?.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let dispatch = useDispatch();
  const loadingState = useSelector(getPlayerListLoadingStatus);

  useEffect(() => {
    console.log('loadingState from use effect:');
    if (loadingState === 'idle') {
      dispatch(getPlayerList());
    }
  }, [dispatch, loadingState]);

  const handleSelectplayerPosition = (value) => {
    setplayerPosition(value);
  };

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

  useEffect(() => {
    if (searchValue) {
      let searchList = playerList?.filter((item) =>
        item?.name.toLowerCase().includes(searchValue?.toLowerCase())
      );
      setSearchResultList(searchList);
    } else if (playerPosition) {
      let searchList = playerList?.filter(
        (item) => item?.position === playerPosition
      );
      setSearchResultList(searchList);
    } else {
      setSearchResultList();
    }
  }, [searchValue, playerPosition, playerList]);

  return (
    <div>
      <div>
        <form>
          <div className="flex mb-5">
            <button>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100  ">
                    {playerPosition ? playerPosition : 'Type'}
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
                    className="block px-4 py-2 bg-white  "
                    style={{ zIndex: '50' }}
                  >
                    {dropdownOptions.map((option) => (
                      <Menu.Item key={option.value}>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-900'
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
            </button>

            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500   "
                placeholder="Search by name or filter by type"
                onChange={(event) => {
                  setSearchValue(event.target.value);
                }}
                required
              />
              <button
                className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                onClick={() => {
                  console.log('Submit');
                }}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
        {searchValue && (
          <h5 className="text-xl my-5">
            <span className="font-bold">{searchResultList?.length}&nbsp; </span>
            Search result found for{' '}
            <span className="font-bold">{searchValue}</span>
          </h5>
        )}
        {searchResultList?.length && (
          <>
            <h5 className="text-2xl font-bold my-5 text-center">
              Searched players
            </h5>
            <Table type={'searched-list'} itemList={searchResultList} />
          </>
        )}
      </div>
      {playerList?.length ? (
        <>
          <h5 className="text-2xl font-bold my-5 text-center">
            Listed players
          </h5>
          <Table itemList={currentData} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <>
          <h5 className="text-2xl">No data found</h5>
        </>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  // Fetch data from your data source (e.g., an API)
  const response = await fetch(`${baseUrl}/player/get-all-player`);
  console.log('response: ', response);
  const playerListResponse = await response.json();
  const playerList = playerListResponse?.data;

  playerList.sort((a, b) => parseInt(b.rating) - parseInt(a.rating));

  return {
    props: {
      playerList,
    },
  };
}

export default PalyerList;
