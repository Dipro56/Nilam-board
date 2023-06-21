// pages/TablePage.js
import { useEffect, useState } from 'react';
import Pagination from '@/components/utils/pagination/Pagination';
import Table from '@/components/utils/table/Table';
import {
  getAllPlayers,
  getPlayerList,
  getPlayerListLoadingStatus,
} from '@/redux/feature/player/playerSlice';
import { useDispatch, useSelector } from 'react-redux';

const PalyerList = ({ playerList }) => {
  console.log('player list data: ', playerList);
  const itemsPerPage = 10; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const allPlayerList = useSelector(getAllPlayers);

  // Calculate the range of items to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = playerList.slice(startIndex, endIndex);

  const totalPages = Math.ceil(playerList.length / itemsPerPage);

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
  }, []);


  return (
    <div>
      <Table playerList={currentData} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

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

export default PalyerList;
