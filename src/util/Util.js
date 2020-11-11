

 function sortByAsec(state) {

      state.sort(function (a, b) {
        return a.value - b.value;
      });
      
      state.sort(function(a, b) {
        var nameA = a.parkingSpaceTitle.title.toUpperCase(); // ignore upper and lowercase
        var nameB = b.parkingSpaceTitle.title.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });
      
      return state;
}

module.exports.sortByAsec = sortByAsec;