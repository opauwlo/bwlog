const seedrandom = require('seedrandom');

rng = seedrandom('42C35B18B7B71E49C628648BDE736D9269B18C51AF6D8A6EC76829773F4C8E8C', {
  entropy: true,
  state: true
  
});

const random = function random() {
  let number = rng()
  number = number * 10000000
  number = number/1
  return randomNumber = Math.floor(number);
}

module.exports = random;