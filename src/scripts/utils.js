export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function findNeighbours(myArray, i, j) {
  const rowLimit = myArray.length-1;
  const columnLimit = myArray[0].length-1;
  const tempArray = [];

  for(let x = Math.max(0, i-1); x <= Math.min(i+1, rowLimit); x++) {
    for(let y = Math.max(0, j-1); y <= Math.min(j+1, columnLimit); y++) {
      if(x !== i || y !== j) {
        tempArray.push(myArray[x][y]);
      }
    }
  }

  return tempArray;
}

export function concat2DArray(array2D) {
  return [].concat(...array2D)
}  

export function shuffleArray(array) {
  let currentIndex = array.length,  randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}