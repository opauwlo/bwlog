const seedrandom = require('seedrandom');

rng = seedrandom('adddsdddsfs437adsasadsddsdsa', {
  entropy: true,
});

const random = function random() {
  let number = rng()
  number = number * 10000000
  number = number/1
  return randomNumber = Math.floor(number);
}

module.exports = random;