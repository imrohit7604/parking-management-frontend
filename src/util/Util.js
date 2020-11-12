function sortByAsec(state) {
  state.sort(function (a, b) {
    return a.value - b.value;
  });

  state.sort(function (a, b) {
    var nameA = a.parkingSpaceTitle.title.toUpperCase();
    var nameB = b.parkingSpaceTitle.title.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });

  return state;
}

module.exports.sortByAsec = sortByAsec;
