/**
 * Nicolas Ronmans - Tetris-like - 2015
 */
'use strict';

var game = {
  options: {
    wellSize: {
      rows: 20,
      cols: 10
    },
    cubeWidth: 20,
    cubeMargin: 2,
    perspective: 400,
    rotationFactor: .075,
    dropInterval: 1000, // 1s
    softDropInterval: 1000 / 20 // 50ms
  },
  init: function () {
    // global styles
    var head = document.querySelector('head'),
        body = document.querySelector('body'),
        style = document.createElement('style'),
        styles = 'html, body { background: #f4f4f4; height:100%; margin: 0; padding: 0; width: 100%; }\n' +
                 'body { font-family: "Sarpanch", sans-serif; overflow: hidden; perspective: ' + this.options.perspective + 'px; }\n' +
                 '#scoreboard { color: #555; cursor: default; font-size: 36px; font-weight: 700; left: 50%; line-height: 36px; margin: 0 0 0 -150px; position: absolute; text-align: center; text-shadow: 0 0 8px #fff; width: 300px; z-index: 2;}\n' +
                 '#game-container { height:100%; position: relative; width: 100%; z-index: 1;}\n' +
                 '.cube { position: absolute; transform-style: preserve-3d; }\n' +
                 '.color-0 { background: white; }\n' +
                 '.color-1 { background: #ccc; }\n' +
                 '.color-2 { background: cyan; }\n' +
                 '.color-3 { background: blue; }\n' +
                 '.color-4 { background: orange; }\n' +
                 '.color-5 { background: yellow; }\n' +
                 '.color-6 { background: #80ff00; }\n' +
                 '.color-7 { background: #800080; }\n' +
                 '.color-8 { background: red; }\n' +
                 '.color-9 { background: #aaa; }';

    style.type = 'text/css';
    style.appendChild(document.createTextNode(styles));
    head.appendChild(style);

    // scoreboard
    var scoreboard = document.createElement('div');
    scoreboard.id = 'scoreboard';
    this.scoreboard = scoreboard;
    this.scoreboard.innerHTML = 0;
    body.appendChild(scoreboard);

    // game container
    var gameContainer = document.createElement('div');
    gameContainer.id = 'game-container';
    this.gameContainer = gameContainer;
    body.appendChild(gameContainer);

    var matrices = {
      tetrion: [],
      well: []
    };

    // create tetrion (12x22)
    for (var i=0; i<this.options.wellSize.rows + 2; i++) {
      matrices.tetrion.push([]);

      for (var j=0; j<this.options.wellSize.cols + 2; j++) {
        var bit = i===0 || j===0 || i===this.options.wellSize.rows + 1 || j===this.options.wellSize.cols + 1
                ? 9
                : 0;

        matrices.tetrion[i].push(bit);
      }
    }

    // create well (10x22)
    for (var i=0; i<this.options.wellSize.rows + 2; i++) {
      matrices.well.push([]);

      for (var j=0; j<this.options.wellSize.cols; j++) {
        matrices.well[i].push(0);
      }
    }

    this.matrices = matrices;

    this.tetriminos = {
      I: {
        origin: {
          x: 3,
          y: 0
        },
        matrix: [
          [0, 0, 0, 0],
          [2, 2, 2, 2],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]
      },
      J: {
        origin: {
          x: 1,
          y: 0
        },
        matrix: [
          [3, 0, 0],
          [3, 3, 3],
          [0, 0, 0]
        ]
      },
      L: {
        origin: {
          x: 1,
          y: 0
        },
        matrix: [
          [0, 0, 4],
          [4, 4, 4],
          [0, 0, 0]
        ]
      },
      O: {
        origin: {
          x: 4,
          y: 0
        },
        matrix: [
          [5, 5],
          [5, 5]
        ]
      },
      S: {
        origin: {
          x: 1,
          y: 0
        },
        matrix: [
          [0, 6, 6],
          [6, 6, 0],
          [0, 0, 0]
        ]
      },
      T: {
        origin: {
          x: 1,
          y: 0
        },
        matrix: [
          [0, 7, 0],
          [7, 7, 7],
          [0, 0, 0]
        ]
      },
      Z: {
        origin: {
          x: 1,
          y: 0
        },
        matrix: [
          [8, 8, 0],
          [0, 8, 8],
          [0, 0 ,0]
        ]
      }
    };

    this.tetriminosList = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

    this.scoring = [100, 300, 500, 800]; // [1 line, 2-lines, 3-lines, tetris]
    this.score = 0;

    this.cubes = [];

    this.window = {
      width: 0,
      height: 0
    };

    this.mouse = {
      x: 0,
      y: 0
    };

    this.keyboard = {
      moveLeft: false,
      moveRight: false,
      moveDown: false,
      rotate: false
    };

    this.tetriminosBag = [];

    this.currentTetrimino = {};

    this.drawCubes();
    this.onResize();

    // init listeners
    window.addEventListener('resize', this.onResize.bind(this), false);
    document.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    document.addEventListener('keydown', this.onKeyDown.bind(this), false);
    document.addEventListener('keyup', this.onKeyUp.bind(this), false);

    // init the render animation
    this.onEnterFrame();

    this.insertNewTetrimino();

    // At certain interval, move down current block or add it to the stack and generate a new one if possible, if else, set the game over.
    this.dropTimerCounter = 0;
    this.dropTimer = setInterval(this.onDropTick.bind(this), this.options.softDropInterval);
  },
  insertNewTetrimino: function () {
    if (!this.tetriminosBag.length) {
      this.tetriminosBag = this.tetriminosList.slice(0);
    }

    var randomIndex = Math.floor(Math.random() * this.tetriminosBag.length),
        newTetrimino = this.tetriminos[this.tetriminosBag.splice(randomIndex, 1)];

    this.currentTetrimino = {
      matrix: newTetrimino.matrix,
      x: newTetrimino.origin.x,
      y: newTetrimino.origin.y,
      side: newTetrimino.matrix.length,
      originY: newTetrimino.origin.y,
      canMoveDown: true,
      canMoveLeft: true,
      canMoveRight: true,
      canRotate: true
    };

    this.keyboard.moveDown = false;
    this.keyboard.moveLeft = false;
    this.keyboard.moveRight = false;
    this.keyboard.rotate = false;

    this.checkTetriminoAvailableBehaviors();
  },
  onDropTick: function () {
    // if blocked
    if ((this.keyboard.moveDown || !this.dropTimerCounter) && !this.currentTetrimino.canMoveDown) {
      // update well matrix
      for (var i=0; i<this.currentTetrimino.side; i++) {
        for (var j=0; j<this.currentTetrimino.side; j++) {
          if (this.currentTetrimino.matrix[i][j]) {
            this.matrices.well[this.currentTetrimino.y + i][this.currentTetrimino.x + j] = 1;
          }
        }
      }

      if (this.currentTetrimino.y===this.currentTetrimino.originY) {
        // game over
      } else {
        // removed filled rows
        this.checkFilledRows();

        // insert new tetrimino into the current matrix
        this.insertNewTetrimino();
      }
    } else {
      var changed = false;

      // apply generic drop motion
      if ((this.keyboard.moveDown || !this.dropTimerCounter) && this.currentTetrimino.canMoveDown) {
        this.keyboard.moveDown = false;
        changed = true;
        this.currentTetrimino.y++;
      } else if (this.keyboard.rotate && this.currentTetrimino.canRotate) {
        this.keyboard.rotate = false;
        changed = true;
        this.currentTetrimino.matrix = this.rotateMatrixCW(this.currentTetrimino.matrix);
      } else if (this.keyboard.moveLeft && this.currentTetrimino.canMoveLeft) {
        this.keyboard.moveLeft = false;
        changed = true;
        this.currentTetrimino.x--;
      } else if (this.keyboard.moveRight && this.currentTetrimino.canMoveRight) {
        this.keyboard.moveRight = false;
        changed = true;
        this.currentTetrimino.x++;
      }

      if (changed) {
        this.checkTetriminoAvailableBehaviors();
      }
    }

    this.dropTimerCounter = this.dropTimerCounter >= (this.options.dropInterval / this.options.softDropInterval) - 1 ? 0 : this.dropTimerCounter + 1;
  },
  checkFilledRows: function () {
    var rowsFilled = [];

    for (var i=0; i<this.options.wellSize.rows + 2; i++) {
      var rowFilled = true;

      for (var j=0; j<this.options.wellSize.cols; j++) {
        if (!this.matrices.well[i][j]) {
          rowFilled = false;
          break;
        }
      }

      if (rowFilled) {
        rowsFilled.push(i);
      }
    }

    if (rowsFilled.length) {
      rowsFilled.forEach(function (rowIndex) {
        this.matrices.well.splice(rowIndex, 1);
        this.matrices.well.unshift([]);

        for (var j=0; j<this.options.wellSize.cols; j++) {
          this.matrices.well[0].push(0);
        }
      }.bind(this));

      this.score += this.scoring[rowsFilled.length - 1];
      this.scoreboard.innerHTML = this.score;
    }
  },
  checkTetriminoAvailableBehaviors: function () {
    // determine where the tetrimino can go
    var tmpMatrix1 = [],
        tmpMatrix2 = [],
        rotatedTetrimino = this.rotateMatrixCW(this.currentTetrimino.matrix);

    // temp matrix
    for (var i=0; i<this.options.wellSize.rows + 2; i++) {
      tmpMatrix1.push([]);
      tmpMatrix2.push([]);

      for (var j=0; j<this.options.wellSize.cols; j++) {
        tmpMatrix1[i].push(0);
        tmpMatrix2[i].push(0);
      }
    }

    // add tetrimino to temp matrix
    for (var i=0; i<this.currentTetrimino.side; i++) {
      for (var j=0; j<this.currentTetrimino.side; j++) {
        if (this.currentTetrimino.matrix[i][j]) {
          tmpMatrix1[this.currentTetrimino.y + i][this.currentTetrimino.x + j] = 1;
        }
      }
    }

    this.currentTetrimino.canMoveDown = true;
    this.currentTetrimino.canMoveLeft = true;
    this.currentTetrimino.canMoveRight = true;

    for (var i=0; i<this.options.wellSize.rows + 2; i++) {
      for (var j=0; j<this.options.wellSize.cols; j++) {
        if (tmpMatrix1[i][j] && (i===(this.options.wellSize.rows + 1) || this.matrices.well[i + 1][j])) {
          this.currentTetrimino.canMoveDown = false;
        }

        if (tmpMatrix1[i][j] && (j===0 || this.matrices.well[i][j - 1])) {
          this.currentTetrimino.canMoveLeft = false;
        }

        if (tmpMatrix1[i][j] && (j===(this.options.wellSize.cols - 1) || this.matrices.well[i][j + 1])) {
          this.currentTetrimino.canMoveRight = false;
        }
      }
    }

    this.currentTetrimino.canRotate = true;

    // add rotated tetrimino to temp matrix
    for (var i=0; i<this.currentTetrimino.side; i++) {
      for (var j=0; j<this.currentTetrimino.side; j++) {
        if (rotatedTetrimino[i][j] && tmpMatrix2[this.currentTetrimino.y + i] && tmpMatrix2[this.currentTetrimino.y + i][this.currentTetrimino.x + j]) {
          tmpMatrix2[this.currentTetrimino.y + i][this.currentTetrimino.x + j] = 1;
        } else if (tmpMatrix2[this.currentTetrimino.y + i]===undefined || tmpMatrix2[this.currentTetrimino.y + i][this.currentTetrimino.x + j]===undefined) {
          this.currentTetrimino.canRotate = false;
          break;
        }
      }
    }

    if (this.currentTetrimino.canRotate) {
      for (var i=0; i<this.options.wellSize.rows + 2; i++) {
        for (var j=0; j<this.options.wellSize.cols; j++) {
          if (tmpMatrix2[i][j] && this.matrices.well[i][j]) {
            this.currentTetrimino.canRotate = false;
            break;
          }
        }
      }
    }

  },
  processMatrixToRender: function () {
    var matrixToRender = this.matrices.tetrion.map(function(row) {
      return row.slice(0);
    });

    // well
    for (var i=0; i<this.options.wellSize.rows; i++) {
      for (var j=0; j<this.options.wellSize.cols; j++) {
        if (this.matrices.well[i + 2][j]) {
          matrixToRender[i + 1][j + 1] = this.matrices.well[i + 2][j];
        }
      }
    }

    // tetrimino
    for (var i=0; i<this.currentTetrimino.side; i++) {
      for (var j=0; j<this.currentTetrimino.side; j++) {
        if (this.currentTetrimino.matrix[i][j] && (this.currentTetrimino.y + i - 1 >= 1)) {
          matrixToRender[this.currentTetrimino.y + i - 1][this.currentTetrimino.x + j + 1] = this.currentTetrimino.matrix[i][j];
        }
      }
    }

    this.matrices.render = matrixToRender;
  },
  onResize: function () {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;

    this.positionElements();
  },
  onMouseMove: function (event) {
    this.mouse.x = event.clientX || event.pageX;
    this.mouse.y = event.clientY || event.pageY;
  },
  onKeyDown: function (event) {
    if (event.keyCode===37 || event.keyCode===39 || event.keyCode===40) {
      this.keyboard.moveDown = false;
      this.keyboard.moveLeft = false;
      this.keyboard.moveRight = false;
      this.keyboard.rotate = false;

      // left arrow key down
      if (event.keyCode===37) {
        this.keyboard.moveLeft = true;
      }

      // right arrow key down
      if (event.keyCode===39) {
        this.keyboard.moveRight = true;
      }

      // down arrow key down
      if (event.keyCode===40) {
        this.keyboard.moveDown = true;
      }
    }
  },
  onKeyUp: function (event) {
    // space key down
    if (event.keyCode===38) {
      this.keyboard.rotate = true;
      this.keyboard.moveRight = false;
      this.keyboard.moveLeft = false;
      this.keyboard.moveDown = false;
    }
  },
  onEnterFrame: function () {
    this.processMatrixToRender();
    this.render();

    window.requestAnimationFrame(this.onEnterFrame.bind(this));
  },
  drawCubes: function () {
    for (var i=0; i<this.options.wellSize.rows + 2; i++) {
      this.cubes.push([]);

      for (var j=0; j<this.options.wellSize.cols + 2; j++) {
        this.drawCube(i);
      }
    }
  },
  drawCube: function (row) {
    var cube = document.createElement('div');

    cube.className = 'cube';
    cube.style.width = this.options.cubeWidth + 'px';
    cube.style.height = this.options.cubeWidth + 'px';

    this.cubes[row].push(cube);
    this.gameContainer.appendChild(cube);
  },
  positionElements: function () {
    // position GUI
    var top = (this.gameContainer.offsetHeight + this.options.cubeMargin - ((this.options.wellSize.rows + 2) * (this.options.cubeWidth + this.options.cubeMargin))) * .5,
        scoreboardComputedStyles = window.getComputedStyle(this.scoreboard, null),
        newTop = (top * .5) - (parseInt(scoreboardComputedStyles.fontSize, 10) * .5);

    this.scoreboard.style.top = (newTop > 0 ? newTop : 0) + 'px';

    // position cubes
    for (var i=0; i<this.options.wellSize.rows + 2; i++) {
      for (var j=0; j<this.options.wellSize.cols + 2; j++) {
        this.positionCube(i, j);
      }
    }
  },
  positionCube: function (rowIndex, colIndex) {
    var cube = this.cubes[rowIndex][colIndex],
        left = (this.gameContainer.offsetWidth + this.options.cubeMargin - ((this.options.wellSize.cols + 2) * (this.options.cubeWidth + this.options.cubeMargin))) * .5,
        top = (this.gameContainer.offsetHeight + this.options.cubeMargin - ((this.options.wellSize.rows + 2) * (this.options.cubeWidth + this.options.cubeMargin))) * .5;

    cube.style.left = (left + (colIndex * (this.options.cubeWidth + this.options.cubeMargin))) + 'px';
    cube.style.top = (top + (rowIndex * (this.options.cubeWidth + this.options.cubeMargin))) + 'px';
  },
  render: function () {
    // Show/hide cubes
    for (var i=0; i<this.options.wellSize.rows + 2; i++) {
      for (var j=0; j<this.options.wellSize.cols + 2; j++) {
        this.cubes[i][j].className = 'cube color-' + this.matrices.render[i][j];
      }
    }

    // 3D rotation of the game container
    var width = this.window.width * .5,
        height = this.window.height * .5,
        rotationY = ((this.mouse.x - width) / width) * 360 * this.options.rotationFactor,
        rotationX = ((height - this.mouse.y) / height) * 360 * this.options.rotationFactor;

    this.gameContainer.style.transform = 'rotateX(' + rotationX + 'deg) rotateY(' + rotationY + 'deg)';
  },
  rotateMatrixCW: function (matrix) {
    var rotatedMatrix = [],
        side = matrix.length;

    for (var i=0; i<side; i++) {
      rotatedMatrix.push([]);

      for (var j=0; j<side; j++) {
        rotatedMatrix[i].push(matrix[side - j - 1][i]);
      }
    }

    return rotatedMatrix;
  }
};

document.addEventListener('DOMContentLoaded', game.init.bind(game));
