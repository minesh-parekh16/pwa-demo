import React from 'react';
import './App.css';
import { useQuery } from '@tanstack/react-query';

// Importing image from Google
import googleImage from './sunset-1373171_1280.jpg';
import googleImage1 from './tree-736885_1280.jpg';

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json()),
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className='main-container'>
      <h1 className="heading">My PWA App</h1>
      <div className='images-static'>
        <img src={googleImage} alt="Google" className="google-image" />
        <img src={googleImage1} alt="Google" className="google-image-1" />
        <img src='https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg' alt="Google" className="google-image-2" />
      </div>

      <ul>
        {data?.map?.(item => (
          <li key={item.id} className="list-item">{item.title}</li>
        ))}
      </ul>

      {/* Using IcoMoon icons */}
      <div className="icon-container">
        <span class="icon-home"></span>
        <span class="icon-pencil"></span>
      </div>
    </div>
  );
}

export default App;
