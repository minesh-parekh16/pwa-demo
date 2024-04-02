import React, { useEffect, useState } from 'react';
import './App.css'; // You can keep your existing App.css if needed
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='main-container'>
      <h1 className="heading">My PWA App</h1> {/* Added className for styling */}
      <ul>
        {data?.map?.(item => (
          <li key={item.id} className="list-item">{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;