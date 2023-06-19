// pages/TablePage.js
import { useState } from 'react';
import Pagination from '@/components/utils/pagination/Pagination';
import Table from '@/components/utils/table/Table';

const PalyerList = ({  playerList }) => {
  console.log('player list data: ' , playerList)
  const itemsPerPage = 10; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of items to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = playerList.slice(startIndex, endIndex);

  const totalPages = Math.ceil(playerList.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
  const playerList = playerListResponse?.data


  return {
    props: {
      playerList
    },
  };
}

export default PalyerList;
