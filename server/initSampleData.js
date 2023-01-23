const fs = require('fs');

const { parse } = require('csv-parse');

module.exports = function initSampleData(allDrugs, allDrugInteractions) {
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
          Level: level,
        } = csvRow;

        allDrugsTemp[drugAId] = drugA;
        allDrugsTemp[drugBId] = drugB;
        allDrugInteractions[`${drugAId}-${drugBId}`] = { level, drugA, drugB };
      }
    })
    .on('end', function () {
      for (const [key, value] of Object.entries(allDrugsTemp)) {
        allDrugs.push({ value: key, label: value });
      }

      console.log('Finished reading sample_dataset to memory!');
      console.log('Different drugs: ', allDrugs.length);
      console.log('Drug interactions count: ', Object.keys(allDrugInteractions).length);
    });
};
