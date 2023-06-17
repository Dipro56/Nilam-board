// pages/TablePage.js
import { useState } from 'react';
import Pagination from '@/components/utils/pagination/Pagination';
import Table from '@/components/utils/table/Table';

const PalyerList = ({ data , playerList }) => {
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

  const data = [
    {
      id:1,
      name: 'Messi',
      club: 'Barcelona',
    },
    {
      id: 2,
      name: 'Ronaldo',
      club: 'Man Utd',
    },
    {
      id: 3,
      name: 'Mbappe',
      club: 'PSG',
    },
    {
      id: 4,
      name: 'Messi',
      club: 'Barcelona',
    },
    {
      id: 5,
      name: 'Ronaldo',
      club: 'Man Utd',
    },
    {
      id: 6,
      name: 'Mbappe',
      club: 'PSG',
    },
    {
      id: 7,
      name: 'Messi',
      club: 'Barcelona',
    },
    {
      id:8,
      name: 'Ronaldo',
      club: 'Man Utd',
    },
    {
      id: 9,
      name: 'Mbappe',
      club: 'PSG',
    },
    {
      name: 'Messi',
      club: 'Barcelona',
    },
    {
      name: 'Ronaldo',
      club: 'Man Utd',
    },
    {
      name: 'Mbappe',
      club: 'PSG',
    },
  ];

  return {
    props: {
      data,
      playerList
    },
  };
}

export default PalyerList;
