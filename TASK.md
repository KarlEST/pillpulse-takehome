# Drug Interactions Checker

## Background

Anytime you take more than one medication, or even mix it with certain foods, beverages, or over-the-counter medicines, you are at risk of a drug interaction. Most drug interactions are not serious, but because a few are, it is important to understand the possible outcome before you take your medications. Read more from wikipedia

There are 3 types of interactions:

- Drug-drug interactions A reaction between two (or more) drugs.
- Drug-food/beverage interactions A reaction between a drug and a food or beverage.
- Drug-disease interactions A reaction that occurs when taking a drug while having a certain medical condition. For example, taking a nasal decongestant if you have high blood pressure may cause an unwanted reaction

## Test assignment

### Story

Aa a user I want to check the interaction between multiple drugs before I write a prescription to a customer.

### Backend

Write a backend application which has an API endpoint where users can check drug interactions. A sample dataset(sample_dataset.csv) is attached with this assignment.

Example:
Input: drug1, drug2, drug3
Result: Medium interaction found between drug1 and drug3.

Requirements:

- Node.js or Java
- Open source/free libraries and frameworks can be used
- Interactions and drugs must be in database
- Database can be H2 or Postgres

### Frontend

Write a Single Page Application where users can add multiple drugs to check interactions between them.

Requirements:

- Build app using ReactJs
- Checker should autosuggest drugs while typing that users can check against
- Result is printed out

Upload code to the git based version control system. Bonus points if applications can be run with docker.
