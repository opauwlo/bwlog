function getTitleCase(str) {
  const titleCase = str
    .toLowerCase()
    .split(' ')
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');

  return titleCase;
}

module.exports = getTitleCase