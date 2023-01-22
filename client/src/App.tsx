/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import SearchBar from './SearchBar';

import './App.css';

const App = () => {
  const [message, setMessage] = useState<string>('Add at least 2 medications');
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await fetch('/api');

        if (newData) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const json = await newData.json();
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          setData(json.message);
        }
      } catch (e) {
        console.error(e);
      }
    };

    void fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Drug Interactions Checker</h1>
        <p>
          Some medications don't work well together and can have serious interactions if you take
          them at the same time. You can use this page to verify if you can take your medications
          together. Read more about it{' '}
          <a
            href="https://en.wikipedia.org/wiki/Drug_interaction"
            rel="noreferrer noopener"
            target="_blank"
          >
            here
          </a>
        </p>
        <h2>Can I take these drugs together?</h2>
        <SearchBar setMessage={setMessage} />
        {/* Image of the result */}
        {/* Result printed out */}
        <p>Message is: {message}</p>
        <p>Fetched data is: {data}</p>
      </header>
    </div>
  );
};

export default App;
