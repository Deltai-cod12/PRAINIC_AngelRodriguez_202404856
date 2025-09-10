import { useEffect, useState } from 'react';
import { fetchData } from './api';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData().then(data => setMessage(data));
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
