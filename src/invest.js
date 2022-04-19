/**
1. Buildings -> Buildings contribute ...
Benefits of investing:
Drawbacks: 
    REMOVE
2. Air quality -> Currently, your city is suffering from heavy air pollution. Many are dying from chronic diseases...
3. Cars -> Cars are the #1 emmiter of CO_2 emissions and pollute the air. Help lower CO_2 emissions by increasing public transportation and increasing alternative fuel sources for cars 
  https://www.epa.gov/ghgemissions/sources-greenhouse-gas-emissions
4. Trash -> Currently, x% of waste is recycled. Landfills are quickly filling up.
5. Trees -> Many trees in your city are being cut down for lumber or more housing space. Preserve the greenery in your city by lowering deforestation
Schools -> School buses are underfunded and many are being forced to commute to school by car. 
6. Schools -> Poor education has limited your city from reaching its potential in a global economy. 
7. Roads -> Many roads in your city are broken and traffic is high. Poor infrastructure reduces the economic potential of your city. 
8. Water -> Low water quality poses many health concerns. 
9. Homes -> electricity sources right now mostly come from natural gas and coal. Help replace this with sustainable alternatives such as solar, wind, and hydropower. 
10. Industry -> 
    https://www.epa.gov/ghgemissions/sources-greenhouse-gas-emissions


*/

/* Investment in roads */
function roadsInvest(amt, yrs) {
  // CREATE EVENTS
  // Invest 50,000,000 (5 years) -> 20,000 jobs (% decrease: 10%), 
  // Productivity -> gdp increase per year: $3,000,000 (% increase: 5%), 15 years
  // Sustainability -> +1% each year
  // Variability: 
  
  // Invest 100,000,000 (5 years)
  // Sustainability -> +2% each year
  
  // if (amount === 1) {
    //   unempl
  // }
  let jobYears = 20, jobAmount, jobDecrease;
  let moneyYears = 20, moneyAmount, moneyIncrease;
  let sustYears = 5, sustAmount, sustDecrease;

  if (amt === 50000) {
    
  }
  else if (amt === 100000) {
    
  }

  // return {
  //   cost: { type: 'cost', years: yrs, amount: amt, percChange: 0 },
  //   jobs: { type: 'jobs',  years: 10, amount: 0.3, percChange: -10, },
  //   moneyGain: { type: 'moneyGain', years: 15, amount: 5000, percChange: 5, },
  //   sustainability: { type: 'sustainability', years: 15, amount: 2, percChange: 5, },
  // }
  
  // TODO : turn this into a list and add each event one at a time so can be deleted
  return {
    type: 'roads',
    cost: { years: yrs, amount: amt, percChange: 0 },
    jobs: {  years: jobYears, amount: jobAmount, percChange: jobDecrease, },
    moneyGain: { years: moneyYears, amount: moneyAmount, percChange: moneyIncrease, },
    sustainability: { years: sustYears, amount: sustAmount, percChange: sustDecrease, },
  }
}

function carsInvest(amt, yrs) {
/**
1. 30,000,000 per year (5 years)
    Jobs: -15,000/-0.2% (decrease 10%), +10,000/0.15% (increase 10%)
2. 90,000,000 per year (5 years)
    Jobs: -30,000/-0.4% (decrease 15%), +20,000/0.3% (increase 10%)
3. 120,000,000 per year (5 years)
    Jobs: -50,000/-0.5% (decrease 20%), +30,000/0.45% (increase 15%)
*/
let jobYears = 20, jobAmount, jobDecrease;
let moneyYears = 20, moneyAmount, moneyIncrease;
let sustYears = 5, sustAmount, sustDecrease;

if (amt === 30000) {
  jobAmount = -0.1; jobDecrease = -10;
  moneyAmount = 10000; moneyIncrease = 0.3;
  sustAmount = 1; sustDecrease = -10;
}
else if (amt === 90000) {
  jobAmount = -0.15; jobDecrease = -15;
  moneyAmount = 10000; moneyIncrease = 0.3;
  sustAmount = 2; sustDecrease = -10;
}

return {
  type: 'cars',
  cost: { years: yrs, amount: amt, percChange: 0 },
  jobs: {  years: jobYears, amount: jobAmount, percChange: jobDecrease, },
  moneyGain: { years: moneyYears, amount: moneyAmount, percChange: moneyIncrease, },
  sustainability: { years: sustYears, amount: sustAmount, percChange: sustDecrease, },
}
}

function trashInvest(amt, yrs) {
/**
1. 20,000,000 per year (5 years)
  Jobs: -15,000/-0.2% (decrease 10%), +10,000/0.15% (increase 10%)
2. 50,000,000 per year (5 years)

3. 80,000,000 per year (5 years)
*/
let jobYears = 20, jobAmount, jobDecrease;
let moneyYears = 20, moneyAmount, moneyIncrease;
let sustYears = 5, sustAmount, sustDecrease;

if (amt === 20000) {
  jobAmount = -0.1; jobDecrease = -10;
  moneyAmount = 10000; moneyIncrease = 0.3;
  sustAmount = 1; sustDecrease = -10;
}
else if (amt === 50000) {
  jobAmount = -0.15; jobDecrease = -15;
  moneyAmount = 10000; moneyIncrease = 0.3;
  sustAmount = 2; sustDecrease = -10;
}

return {
  type: 'trash',
  cost: { years: yrs, amount: amt, percChange: 0 },
  jobs: {  years: jobYears, amount: jobAmount, percChange: jobDecrease, },
  moneyGain: { years: moneyYears, amount: moneyAmount, percChange: moneyIncrease, },
  sustainability: { years: sustYears, amount: sustAmount, percChange: sustDecrease, },
}
}

function schoolsInvest(amt, yrs) {
/**
1. 30,000,000 per year (5 years)

2. 70,000,000 per year (5 years)

3. 100,000,000 per year (5 years)
*/
let jobYears = 20, jobAmount, jobDecrease;
let moneyYears = 20, moneyAmount, moneyIncrease;
let sustYears = 5, sustAmount, sustDecrease;

if (amt === 30000) {
  jobAmount = -0.1; jobDecrease = -10;
  moneyAmount = 10000; moneyIncrease = 0.3;
  sustAmount = 1; sustDecrease = -10;
}
else if (amt === 70000) {
  jobAmount = -0.15; jobDecrease = -15;
  moneyAmount = 10000; moneyIncrease = 0.3;
  sustAmount = 2; sustDecrease = -10;
}

return {
  type: 'schools',
  cost: { years: yrs, amount: amt, percChange: 0 },
  jobs: {  years: jobYears, amount: jobAmount, percChange: jobDecrease, },
  moneyGain: { years: moneyYears, amount: moneyAmount, percChange: moneyIncrease, },
  sustainability: { years: sustYears, amount: sustAmount, percChange: sustDecrease, },
}
}

function homesInvest(amt, yrs) {
/**
1. 30,000,000 per year (5 years)

2. 70,000,000 per year (5 years)

3. 100,000,000 per year (5 years)
*/
let jobYears = 20, jobAmount, jobDecrease;
let moneyYears = 20, moneyAmount, moneyIncrease;
let sustYears = 5, sustAmount, sustDecrease;

if (amt === 30000) {
  jobAmount = -0.1; jobDecrease = -10;
  moneyAmount = 10000; moneyIncrease = 0.3;
  sustAmount = 1; sustDecrease = -10;
}
else if (amt === 70000) {
  jobAmount = -0.15; jobDecrease = -15;
  moneyAmount = 10000; moneyIncrease = 0.3;
  sustAmount = 2; sustDecrease = -10;
}

return {
  type: 'homes',
  cost: { years: yrs, amount: amt, percChange: 0 },
  jobs: {  years: jobYears, amount: jobAmount, percChange: jobDecrease, },
  moneyGain: { years: moneyYears, amount: moneyAmount, percChange: moneyIncrease, },
  sustainability: { years: sustYears, amount: sustAmount, percChange: sustDecrease, },
}
}

function electricityInvest(amt, yrs) {
/**
1. 30,000,000 per year (5 years)
``  Jobs:
2. 90,000,000 per year (5 years)

3. 120,000,000 per year (5 years)
*/
let jobYears = 20, jobAmount, jobDecrease;
let moneyYears = 20, moneyAmount, moneyIncrease;
let sustYears = 5, sustAmount, sustDecrease;

if (amt === 30000000) {
  jobAmount = -0.1; jobDecrease = -10;
  moneyAmount = 10000; moneyIncrease = 0.3;
  sustAmount = 1; sustDecrease = -10;
}
else if (amt === 70000000) {
  jobAmount = -0.15; jobDecrease = -15;
  moneyAmount = 10000; moneyIncrease = 0.3;
  sustAmount = 2; sustDecrease = -10;
}

return {
  type: 'electricity',
  cost: { years: yrs, amount: amt, percChange: 0 },
  jobs: {  years: jobYears, amount: jobAmount, percChange: jobDecrease, },
  moneyGain: { years: moneyYears, amount: moneyAmount, percChange: moneyIncrease, },
  sustainability: { years: sustYears, amount: sustAmount, percChange: sustDecrease, },
}
}

function waterInvest(amt, yrs) {
/**
1. 20,000,000 per year (5 years)

2. 40,000,000 per year (5 years)

3. 70,000,000 per year (5 years)
*/
let jobYears = 20, jobAmount, jobDecrease;
let moneyYears = 20, moneyAmount, moneyIncrease;
let sustYears = 5, sustAmount, sustDecrease;

if (amt === 40000000) {
  jobAmount = -0.1; jobDecrease = -10;
  moneyAmount = 10000; moneyIncrease = 0.3;
  sustAmount = 1; sustDecrease = -10;
}
else if (amt === 70000000) {
  jobAmount = -0.15; jobDecrease = -15;
  moneyAmount = 10000; moneyIncrease = 0.3;
  sustAmount = 2; sustDecrease = -10;
}

return {
  type: 'water',
  cost: { years: yrs, amount: amt, percChange: 0 },
  jobs: {  years: jobYears, amount: jobAmount, percChange: jobDecrease, },
  moneyGain: { years: moneyYears, amount: moneyAmount, percChange: moneyIncrease, },
  sustainability: { years: sustYears, amount: sustAmount, percChange: sustDecrease, },
}
}

function treesInvest(amt, yrs) {
/**
1. 10,000,000 per year (5 years)

2. 40,000,000 per year (5 years)

3. 60,000,000 per year (5 years)
*/
}

function industryInvest(amt, yrs) {
/**
1. 30,000,000 per year (5 years)

2. 90,000,000 per year (5 years)

3. 120,000,000 per year (5 years)
*/
}

export { roadsInvest, carsInvest, trashInvest, schoolsInvest, homesInvest, electricityInvest, waterInvest, treesInvest, industryInvest };