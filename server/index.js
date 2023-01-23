const fs = require('fs');
const { parse } = require('csv-parse');
const express = require("express");

const allDrugs = []
const drugInteractions = {};

readSampleData(allDrugs, drugInteractions);

const PORT = 3001;
const app = express();

app.get("/api/drugs", (_req, res) => {
  res.json({ allDrugs });
});

app.get('/api/drugs/interactions', (req, res) => {
  const drugs = req.query.drugs;
  const interactions = [];

  for (let i = 0; i < drugs.length - 1; i++) {
    for (let j = i + 1; j < drugs.length; j++) {
      const drugA = drugs[i];
      const drugB = drugs[j];
      const drugInteraction = drugInteractions[`${drugA}-${drugB}`] || drugInteractions[`${drugB}-${drugA}`];

      if (drugInteraction) {
        interactions.push(`${drugInteraction.level} interaction found between ${drugInteraction.drugA} and ${drugInteraction.drugB}.`);
      }
    }
  }

  res.json({ interactions });
})

app.listen(PORT, () => {
  console.log(`Server up and running and listening on ${PORT}`);
});

function readSampleData(allDrugs, drugInteractions) {
  const allDrugsTemp = {};

  fs.createReadStream('./sample_dataset.csv')
    .pipe(parse({ delimiter: ',', relax_column_count: true, columns: true }))
    .on('data', function (csvRow) {
      // ignore empty lines in CSV file
      if (csvRow.DDInterID_A !== '') {
        const {
          DDInterID_A: drugAId,
          Drug_A: drugA,
          DDInterID_B: drugBId,
          Drug_B: drugB,
          Level: level
        } = csvRow;

        allDrugsTemp[drugAId] = drugA;
        allDrugsTemp[drugBId] = drugB;
        drugInteractions[`${drugAId}-${drugBId}`] = { level, drugA, drugB };
      }
    })
    .on('end', function () {
      for (const [key, value] of Object.entries(allDrugsTemp)) {
        allDrugs.push({ value: key, label: value, });
      }

      console.log('Finished reading sample_dataset to memory!');
      console.log('Different drugs: ', allDrugs.length);
      console.log('Drug interactions count: ', Object.keys(drugInteractions).length);
    });
}