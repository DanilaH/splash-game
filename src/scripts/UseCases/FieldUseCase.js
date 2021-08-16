import { GameTile } from "../GameTile";
import { shuffleArray, concat2DArray } from "../utils";

export class FieldUseCase {
  constructor(
    figureTypes,
    field
    ) {

    this.figureTypes = figureTypes;
    this.field = field;

    this.mainGrid = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];

    this.matches = [];
  }

  getMatches = () => {
    return this.matches
  };

  setGameUseCase = (gameUseCase) => {
    this.gameUseCase = gameUseCase; 
  }

  createDefaultTile = (x,y) => {
    const figureType =  this.figureTypes.getRandomFigureType();
    const tile = new GameTile(x, y, figureType, this.gameUseCase.onTileDown);

    return tile;
  }

  createSuperBonusTile = (x,y) => {
    const figureType =  this.figureTypes.bonusType;
    const tile = new GameTile(x, y, figureType, this.gameUseCase.useSuperBonus);

    return tile;
  }

  addTile = (x, y, isBonus) => { 
    const tile = isBonus ? this.createSuperBonusTile(x, y) : this.createDefaultTile(x, y);
    tile.setZIndex(-y)

    this.mainGrid[y][x] = tile;
    this.field.addChild(tile.sprite);
    
    isBonus ? tile.toYCoord() : tile.toYCoordAnimation();

    return tile;
  }

  shuffleField = () => {
    const shuffledArr = shuffleArray(concat2DArray(this.mainGrid));
    let columns = this.mainGrid.length;

    for(let i = 0; i < this.mainGrid.length; i++){
      for(let j = 0; j < this.mainGrid[i].length; j++){
        let tile = shuffledArr[(j * columns) + i]
        this.mainGrid[i][j] = tile;

        tile.indexOfMatch = -1;
        tile.alreadyInMatch = false;
        tile.setCoords(j, i);
        tile.setZIndex(-i);
        tile.toXYCoordsAnimation();
      }
    }

    this.field.update();

    this.findMatches();
  }

  findMatches = () => {
    const grid = this.mainGrid;
    let matches = [];

    for (let i = 0; i < grid.length; i++) {
      
      for(let j = 0; j < grid[i].length; j++) {
        const isHorizontalMatch = !!(j && grid[i][j].type === grid[i][j - 1].type); 
        const isVerticalMatch = !!(i && grid[i][j].type === grid[i - 1][j].type);
        // HORIZONTAL
        if (isHorizontalMatch && isVerticalMatch) {
          
          const horizontalTile = grid[i][j - 1];
          const verticalTile = grid[i - 1][j];
          const currentTile = grid[i][j];

          if(horizontalTile.alreadyInMatch && verticalTile.alreadyInMatch) {
            
            if(horizontalTile.indexOfMatch === verticalTile.indexOfMatch) {
              matches[horizontalTile.indexOfMatch].push(currentTile);

              currentTile.alreadyInMatch = true;
              currentTile.indexOfMatch = horizontalTile.indexOfMatch;
            } else {
              const matchesOfHorizontalTile = matches.splice(horizontalTile.indexOfMatch, 1)[0];
              const matchesOfVerticalTile =  matches.splice(verticalTile.indexOfMatch, 1)[0];
              const mergedMatches = [...matchesOfVerticalTile, ...matchesOfHorizontalTile, currentTile];

              currentTile.alreadyInMatch = true;

              matches.push(mergedMatches);

              matches.forEach(
                (el, index) => el.forEach( el => el.indexOfMatch = index)
              );
            }
          } else if (horizontalTile.alreadyInMatch) {
        
            matches[horizontalTile.indexOfMatch].push(verticalTile);
            matches[horizontalTile.indexOfMatch].push(currentTile);
            
            verticalTile.alreadyInMatch = true;
            verticalTile.indexOfMatch = horizontalTile.indexOfMatch;

            currentTile.alreadyInMatch = true;
            currentTile.indexOfMatch = horizontalTile.indexOfMatch;

          } else if (verticalTile.alreadyInMatch) {
        
            matches[verticalTile.indexOfMatch].push(horizontalTile);
            matches[verticalTile.indexOfMatch].push(currentTile);
            
            horizontalTile.alreadyInMatch = true;
            horizontalTile.indexOfMatch = verticalTile.indexOfMatch;

            currentTile.alreadyInMatch = true;
            currentTile.indexOfMatch = verticalTile.indexOfMatch;

          } else {
            
            matches.push([horizontalTile, verticalTile ,currentTile]);

            horizontalTile.alreadyInMatch = true;
            horizontalTile.indexOfMatch = matches.length - 1; 

            verticalTile.alreadyInMatch = true;
            verticalTile.indexOfMatch = matches.length - 1;

            currentTile.alreadyInMatch = true;
            currentTile.indexOfMatch = matches.length - 1;

          }


        } else if (isHorizontalMatch) {
          
          const horizontalTile = grid[i][j - 1];
          const currentTile = grid[i][j];

          if(horizontalTile.alreadyInMatch) {
        
            matches[horizontalTile.indexOfMatch].push(currentTile);

            currentTile.alreadyInMatch = true;
            currentTile.indexOfMatch = horizontalTile.indexOfMatch;

          } else {

            matches.push([horizontalTile, currentTile]);

            horizontalTile.alreadyInMatch = true;
            horizontalTile.indexOfMatch = matches.length - 1; 

            currentTile.alreadyInMatch = true;
            currentTile.indexOfMatch = matches.length - 1

          }
        } else if (isVerticalMatch) {

          const verticalTile = grid[i - 1][j];
          const currentTile = grid[i][j];
            
          if (verticalTile.alreadyInMatch) {
        
            matches[verticalTile.indexOfMatch].push(currentTile);
            currentTile.alreadyInMatch = true;
            currentTile.indexOfMatch = verticalTile.indexOfMatch;

          } else {

            matches.push([verticalTile, currentTile]);

            verticalTile.alreadyInMatch = true;
            verticalTile.indexOfMatch = matches.length - 1; 

            currentTile.alreadyInMatch = true;
            currentTile.indexOfMatch = matches.length - 1
          }
        }
      }
    }
    this.matches = matches;
  }

  removeMatch = (match) => {
    for (let el of match) {
      this.mainGrid[el.yCoord][el.xCoord] = null;
      el.turnOffTile( () => this.app.stage.removeChild(el.sprite) )
    }
  }

  resetTiles = () => {
    const grid = this.mainGrid;
    const tempTilesSet = new Set();

    for (let i = grid.length - 1; i > 0; i--) {
      for (let j = 0; j < grid[i].length; j++) {
        if(grid[i][j] == null && grid[i-1][j] != null) {

          let tempTile = grid[i-1][j];
          grid[i][j] = tempTile;
          grid[i-1][j] = null;

          tempTile.setCoords(j,i) 
          tempTile.setZIndex(-i);

          tempTilesSet.add(tempTile);

          i = grid.length;
          break;
        }
      }
    }

    grid.forEach(
      e => e.forEach(e => {
        if (e != null) {
          e.alreadyInMatch = false
          e.indexOfMatch = -1;
        } 
      })
    )

    tempTilesSet.forEach( e => e.toYCoordAnimation())
  }

  fillTiles = () => {
    for(let i = 0; i < this.mainGrid.length; i++){
      for(let j = 0; j < this.mainGrid[i].length; j++){
        if (this.mainGrid[i][j] != null) continue;
        this.addTile(j, i);
      }
    }

    this.field.update();
  }
}