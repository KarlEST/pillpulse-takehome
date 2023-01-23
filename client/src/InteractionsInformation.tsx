import './InteractionsInformation.css';

interface InteractionsInformationProps {
  extraInformation: string;
  interactions: string[];
}

const InteractionsInformation = ({
  extraInformation,
  interactions,
}: InteractionsInformationProps) => {
  {
    /* Image of the result */
  }

  if (interactions.length > 0) {
    return (
      <div className="InteractionsInformation-interactions">
        {interactions.map((interaction) => (
          <p key={interaction}>💊 {interaction}</p>
        ))}
      </div>
    );
  }

  return <p>{extraInformation}</p>;
};

export default InteractionsInformation;
