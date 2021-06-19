const random = function random(a,b) {
  return Math.round(Math.random()*(b-a)+parseInt(a));
  }
  module.exports = random;