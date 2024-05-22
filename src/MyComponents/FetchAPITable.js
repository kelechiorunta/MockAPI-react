import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterableMockDataTable from './FilterableMockDataTable';

export default function FetchAPITable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // <-- Empty dependency array to run only once

  return (
    <>
      {loading ? (
        <p className='status'>Loading...</p>
      ) : error ? (
        <p className='status'>Error: {error}</p>
      ) : (
        <FilterableMockDataTable api_data={data} errload={error} />
      )}
    </>
  );
}