## Stress tests for Scoring

This is a code to stress test the scoring server & UI.

To use this:
 1. Clone the repository
 2. yarn/npm install
 3. Modify the setting in `index.js` file
 
 ```
/************* - Please change only inside these box - *************/
/*******************************************************************/
/**/                                                             /**/
/**/         // Change the round number here                     /**/
/**/         const ROUND = 1                                     /**/
/**/                                                             /**/
/**/         // Change the amount of seconds between scores      /**/
/**/         const TIME_BETWEEN_SCORES = 10                      /**/
/**/                                                             /**/
/**/         // Amount of 'Scorekeepers'                         /**/
/**/         const AMOUNT_OF_SKS = 2                             /**/
/**/                                                             /**/
/*******************************************************************/
 ```
 
 After that:
 1. Run the TMS App 
 2. use `node index.js` to run the code.
 
 
 #### Notice! you will need to run this code for **each** round you want to add
