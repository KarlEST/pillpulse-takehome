import './InteractionsInformation.css';

import no1 from './assets/no1.png';
import no2 from './assets/no2.png';
import no3 from './assets/no3.png';
import no4 from './assets/no4.png';
import no5 from './assets/no5.png';
import no6 from './assets/no6.png';
import yes1 from './assets/yes1.png';
import yes2 from './assets/yes2.png';
import yes3 from './assets/yes3.png';
import yes4 from './assets/yes4.png';
import yes5 from './assets/yes5.png';
import yes6 from './assets/yes6.png';

interface InteractionsInformationProps {
  extraInformation: string;
  interactions: string[];
}

const InteractionsInformation = ({
  extraInformation,
  interactions,
}: InteractionsInformationProps) => {
  const randomInt = Math.floor(Math.random() * 6);
  const yesAssets = [yes1, yes2, yes3, yes4, yes5, yes6];
  const noAssets = [no1, no2, no3, no4, no5, no6];

  if (interactions.length > 0) {
    return (
      <div className="InteractionsInformation">
        <img src={noAssets[randomInt]} alt="" className="InteractionsInformation-image" />
        {interactions.map((interaction) => (
          <p key={interaction}>💊 {interaction}</p>
        ))}
      </div>
    );
  }

  return (
    <div>
      {extraInformation === 'There are no known interactions between these drugs.' ? (
        <img src={yesAssets[randomInt]} alt="" className="InteractionsInformation-image" />
      ) : null}
      <p>{extraInformation}</p>
    </div>
  );
};

export default InteractionsInformation;
