const express = require('express');

const initSampleData = require('./initSampleData');

const allDrugs = [];
const allDrugInteractions = {};

initSampleData(allDrugs, allDrugInteractions);

const PORT = 3001;
const app = express();

app.get('/api/drugs', (_req, res) => {
  // mimic network call time
  setTimeout(() => {
    res.json({ allDrugs });
  }, 1000);
});

app.get('/api/drugs/interactions', (req, res) => {
  const drugs = req.query.drugs;
  const drugInteractions = [];

  for (let i = 0; i < drugs.length - 1; i++) {
    for (let j = i + 1; j < drugs.length; j++) {
      const drugA = drugs[i];
      const drugB = drugs[j];
      const drugsInteraction =
        allDrugInteractions[`${drugA}-${drugB}`] || allDrugInteractions[`${drugB}-${drugA}`];

      if (drugsInteraction) {
        drugInteractions.push(
          `${drugsInteraction.level} interaction found between ${drugsInteraction.drugA} and ${drugsInteraction.drugB}.`,
        );
      }
    }
  }

  // mimic network call time
  setTimeout(() => {
    res.json({ drugInteractions });
  }, 1000);
});

app.listen(PORT, () => {
  console.log(`Server up and running and listening on ${PORT}`);
});
