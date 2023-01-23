/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { Options } from 'react-select';

import SearchBar from './SearchBar';
import { DrugOption } from './types';

import './App.css';

const App = () => {
  const [extraInformation, setExtraInformation] = useState<string>('Please add at least 2 drugs.');
  const [interactions, setInteractions] = useState<string[]>([]);
  const [allDrugOptions, setAllDrugOptions] = useState<DrugOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllDrugs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/drugs');

        if (response.ok) {
          const { allDrugs } = (await response.json()) as { allDrugs: DrugOption[] };
          setAllDrugOptions(allDrugs);
        } else {
          console.error('Error while fetching all drugs: ', response.status, response.statusText);
        }
      } catch (e) {
        console.error('Error while fetching all drugs: ', e);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchAllDrugs();
  }, []);

  const handleDrugChange = async (selectedDrugs: Options<DrugOption>): Promise<void> => {
    if (selectedDrugs?.length <= 1) {
      setExtraInformation('Please add at least 2 drugs.');
      setInteractions([]);
    } else {
      try {
        setIsLoading(true);
        const queryParams = new URLSearchParams(
          selectedDrugs.map((drug) => ['drugs', drug.value]),
        ).toString();
        const response = await fetch(`/api/drugs/interactions?${queryParams}`);

        if (response.ok) {
          const { interactions } = (await response.json()) as { interactions: string[] };

          setInteractions(interactions);

          if (interactions.length === 0) {
            setExtraInformation('There are no known interactions between these drugs.');
          } else {
            setExtraInformation('');
          }
        } else {
          console.error(
            'Checking drug interactions failed: ',
            response.status,
            response.statusText,
          );
        }
      } catch (e) {
        console.error('Checking drug interactions failed: ', e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Drug Interactions Checker</h1>
        <p>
          Some medications don't work well together and can have serious interactions if you take
          them at the same time. You can use this page to verify if you can take your medications
          together. Read more about drug interactions{' '}
          <a
            href="https://en.wikipedia.org/wiki/Drug_interaction"
            rel="noreferrer noopener"
            target="_blank"
          >
            here
          </a>
        </p>
        <h2>Can I take these drugs together?</h2>
        <SearchBar options={allDrugOptions} onChange={handleDrugChange} isLoading={isLoading} />
        {/* Image of the result */}
        {isLoading ? 'LOADING' : null}
        {extraInformation ? <p>{extraInformation}</p> : null}
        {interactions.map((interaction) => (
          <p key={interaction}>💊 {interaction}</p>
        ))}
      </header>
    </div>
  );
};

export default App;
