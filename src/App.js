import React from 'react';
import './App.css';
import { useQuery } from '@tanstack/react-query'

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'], queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
      res.json()),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className='main-container'>
      <h1 className="heading">My PWA App</h1>
      <ul>
        {data?.map?.(item => (
          <li key={item.id} className="list-item">{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;