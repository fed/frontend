/**
 * Nicolas Ronmans - Tetris-like - 2015
 */
'use strict';

(function (root, factory) {
  // if AMD or else
  if (typeof define === 'function' && define.amd) {
    define(['exports'], function (exports) {
      factory(exports);
    });
  } else {
    root.Game = factory({});
  }
} (this, function (Game) {
  var DEFAULTS = {
        wellRows: 20,
        wellCols: 10,
        cubeWidth: 20,
        cubeMargin: 2,
        perspective: 400,
        rotationFactor: .075,
        dropInterval: 1000, // 1s
        softDropInterval: 1000 / 20 // 50ms
      };

      // Complex objects
  var scoreboardContainer,
      gameContainer,
      dropTimer,

      // Simple objects
      tetriminos = {},
      currentTetrimino = {},
      client = {},

      // Arrays
      tetrion = [],
      well = [],
      renderMatrix = [],
      tetriminosList = [],
      tetriminosBag = [],
      scoring = [],
      cubes = [],

      // Numbers
      score,
      dropTimerCounter;

  var Create = Game.Create = {
    dom: {
      styles: function () {
        var el = document.createElement('style'),
            styles = 'html, body { background: #f4f4f4; height:100%; margin: 0; padding: 0; width: 100%; }\n' +
                     'body { font-family: "Sarpanch", sans-serif; overflow: hidden; perspective: ' + DEFAULTS.perspective + 'px; }\n' +
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

        el.type = 'text/css';
        el.appendChild(document.createTextNode(styles));

        return el;
      },
      scoreboard: function () {
        var el = document.createElement('div');

        el.id = 'scoreboard';
        el.innerHTML = 0;

        return el;
      },
      game: function () {
        var el = document.createElement('div');

        el.id = 'game-container';

        return el;
      }
    },
    matrix: {
      tetrion: function () {
        var matrix = [];

        for (var i = 0; i < DEFAULTS.wellRows + 2; i++) {
          matrix.push([]);

          for (var j = 0; j < DEFAULTS.wellCols + 2; j++) {
            var bit = i === 0 || j === 0 || i === DEFAULTS.wellRows + 1 || j === DEFAULTS.wellCols + 1
                    ? 9
                    : 0;

            matrix[i].push(bit);
          }
        }

        return matrix;
      },
      well: function () {
        var matrix = [];

        for (var i = 0; i < DEFAULTS.wellRows + 2; i++) {
          matrix.push([]);

          for (var j = 0; j < DEFAULTS.wellCols; j++) {
            matrix[i].push(0);
          }
        }

        return matrix;
      },
      tetriminos: function () {
        return {
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
              [0, 0, 0]
            ]
          }
        };
      },
      tetriminosList: function () {
        return ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
      },
      scoring: function () {
        return [100, 300, 500, 800];
      },
      client: function () {
        return {
          window: {
            width: 0,
            height: 0
          },
          mouse: {
            x: 0,
            y: 0
          },
          keyboard: {
            moveLeft: false,
            moveRight: false,
            moveDown: false,
            rotate: false
          }
        };
      }
    }
  };

  var Initialization = Game.Initialization = {
    dom: function () {
      var head = document.querySelector('head'),
          body = document.querySelector('body');

      // global styles
      head.appendChild(Create.dom.styles());

      // scoreboard container
      scoreboardContainer = body.appendChild(Create.dom.scoreboard());

      // game container
      gameContainer = body.appendChild(Create.dom.game());
    },
    matrices: function () {
      // create tetrion (12x22)
      tetrion = Create.matrix.tetrion();

      // create well (10x22)
      well = Create.matrix.well();

      // create tetriminos library
      tetriminos = Create.matrix.tetriminos();

      // create list of tetriminos' identifier
      tetriminosList = Create.matrix.tetriminosList();

      // create scoring values [1 line, 2-lines, 3-lines, tetris]
      scoring = Create.matrix.scoring();

      // create client input/output matrix
      client = Create.matrix.client();
    },
    numbers: function () {
      // initial score
      score = 0;

      // initial drop timer count
      dropTimerCounter = 0;
    },
    listeners: function () {
      window.addEventListener('resize', Events.onResize, false);
      document.addEventListener('mousemove', Events.onMouseMove, false);
      document.addEventListener('keydown', Events.onKeyDown, false);
      document.addEventListener('keyup', Events.onKeyUp, false);
    },
    timers: function () {
      dropTimer = setInterval(Events.onDropTick, DEFAULTS.softDropInterval);
    }
  };

  var Get = Game.Get = {
    client: {
      window: function () {
        return {
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      mouse: function (event) {
        return {
          x: event.clientX,
          y: event.clientY
        };
      }
    }
  };

  var Events = Game.Events = {
    onResize: function () {
      client.window = Get.client.window();

      Display.positionElements();
    },
    onMouseMove: function (event) {
      client.mouse = Get.client.mouse(event);
    },
    onKeyDown: function (event) {
      if (event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 40) {
        client.keyboard.moveDown = false;
        client.keyboard.moveLeft = false;
        client.keyboard.moveRight = false;
        client.keyboard.rotate = false;

        // left arrow key down
        if (event.keyCode === 37) {
          client.keyboard.moveLeft = true;
        }

        // right arrow key down
        if (event.keyCode === 39) {
          client.keyboard.moveRight = true;
        }

        // down arrow key down
        if (event.keyCode === 40) {
          client.keyboard.moveDown = true;
        }
      }
    },
    onKeyUp: function (event) {
      // up arrow down
      if (event.keyCode === 38) {
        client.keyboard.rotate = true;
        client.keyboard.moveRight = false;
        client.keyboard.moveLeft = false;
        client.keyboard.moveDown = false;
      }
    },
    onEnterFrame: function () {
      Display.processMatrixToRender();
      Display.render();

      window.requestAnimationFrame(Events.onEnterFrame);
    },
    onDropTick: function () {
      // if blocked
      if ((client.keyboard.moveDown || !dropTimerCounter) && !currentTetrimino.canMoveDown) {
        // update well matrix
        for (var i = 0; i < currentTetrimino.side; i++) {
          for (var j = 0; j < currentTetrimino.side; j++) {
            if (currentTetrimino.matrix[i][j]) {
              well[currentTetrimino.y + i][currentTetrimino.x + j] = 1;
            }
          }
        }

        if (currentTetrimino.y === currentTetrimino.originY) {
          // game over - TODO
        } else {
          // removed filled rows
          Gameplay.checkFilledRows();

          // insert new tetrimino into the current matrix
          Gameplay.insertNewTetrimino();
        }
      } else {
        var changed = false;

        // apply generic drop motion
        if ((client.keyboard.moveDown || !dropTimerCounter) && currentTetrimino.canMoveDown) {
          client.keyboard.moveDown = false;
          changed = true;
          currentTetrimino.y++;
        } else if (client.keyboard.rotate && currentTetrimino.canRotate) {
          client.keyboard.rotate = false;
          changed = true;
          currentTetrimino.matrix = Utils.rotateMatrixCW(currentTetrimino.matrix);
        } else if (client.keyboard.moveLeft && currentTetrimino.canMoveLeft) {
          client.keyboard.moveLeft = false;
          changed = true;
          currentTetrimino.x--;
        } else if (client.keyboard.moveRight && currentTetrimino.canMoveRight) {
          client.keyboard.moveRight = false;
          changed = true;
          currentTetrimino.x++;
        }

        if (changed) {
          Gameplay.checkTetriminoAvailableBehaviors();
        }
      }

      dropTimerCounter = dropTimerCounter >= (DEFAULTS.dropInterval / DEFAULTS.softDropInterval) - 1 ? 0 : dropTimerCounter + 1;
    }
  };

  var Display = Game.Display = {
    addCubes: function () {
      for (var i = 0; i < DEFAULTS.wellRows + 2; i++) {
        cubes.push([]);

        for (var j = 0; j < DEFAULTS.wellCols + 2; j++) {
          Display.addCube(i);
        }
      }
    },
    addCube: function (row) {
      var cube = document.createElement('div');

      cube.className = 'cube';
      cube.style.width = DEFAULTS.cubeWidth + 'px';
      cube.style.height = DEFAULTS.cubeWidth + 'px';

      cubes[row].push(cube);
      gameContainer.appendChild(cube);
    },
    positionElements: function () {
      // position GUI
      var top = (gameContainer.offsetHeight + DEFAULTS.cubeMargin - ((DEFAULTS.wellRows + 2) * (DEFAULTS.cubeWidth + DEFAULTS.cubeMargin))) * .5,
          scoreboardComputedStyles = window.getComputedStyle(scoreboardContainer, null),
          newTop = (top * .5) - (parseInt(scoreboardComputedStyles.fontSize, 10) * .5);

      scoreboardContainer.style.top = (newTop > 0 ? newTop : 0) + 'px';

      // position cubes
      for (var i = 0; i < DEFAULTS.wellRows + 2; i++) {
        for (var j = 0; j < DEFAULTS.wellCols + 2; j++) {
          Display.positionCube(i, j);
        }
      }
    },
    positionCube: function (rowIndex, colIndex) {
      var cube = cubes[rowIndex][colIndex],
          left = (gameContainer.offsetWidth + DEFAULTS.cubeMargin - ((DEFAULTS.wellCols + 2) * (DEFAULTS.cubeWidth + DEFAULTS.cubeMargin))) * .5,
          top = (gameContainer.offsetHeight + DEFAULTS.cubeMargin - ((DEFAULTS.wellRows + 2) * (DEFAULTS.cubeWidth + DEFAULTS.cubeMargin))) * .5;

      cube.style.left = (left + (colIndex * (DEFAULTS.cubeWidth + DEFAULTS.cubeMargin))) + 'px';
      cube.style.top = (top + (rowIndex * (DEFAULTS.cubeWidth + DEFAULTS.cubeMargin))) + 'px';
    },
    processMatrixToRender: function () {
      var matrixToRender = tetrion.map(function(row) {
        return row.slice(0);
      });

      // well
      for (var i = 0; i < DEFAULTS.wellRows; i++) {
        for (var j = 0; j < DEFAULTS.wellCols; j++) {
          if (well[i + 2][j]) {
            matrixToRender[i + 1][j + 1] = well[i + 2][j];
          }
        }
      }

      // tetrimino
      for (var i = 0; i < currentTetrimino.side; i++) {
        for (var j = 0; j < currentTetrimino.side; j++) {
          if (currentTetrimino.matrix[i][j] && (currentTetrimino.y + i - 1 >= 1)) {
            matrixToRender[currentTetrimino.y + i - 1][currentTetrimino.x + j + 1] = currentTetrimino.matrix[i][j];
          }
        }
      }

      renderMatrix = matrixToRender;
    },
    render: function () {
      // Show/hide cubes
      for (var i = 0; i < DEFAULTS.wellRows + 2; i++) {
        for (var j = 0; j < DEFAULTS.wellCols + 2; j++) {
          cubes[i][j].className = 'cube color-' + renderMatrix[i][j];
        }
      }

      // 3D rotation of the game container
      var width = client.window.width * .5,
          height = client.window.height * .5,
          rotationY = ((client.mouse.x - width) / width) * 360 * DEFAULTS.rotationFactor,
          rotationX = ((height - client.mouse.y) / height) * 360 * DEFAULTS.rotationFactor;

      gameContainer.style.transform = 'rotateX(' + rotationX + 'deg) rotateY(' + rotationY + 'deg)';
    }
  };

  var Gameplay = Game.Gameplay = {
    insertNewTetrimino: function () {
      if (!tetriminosBag.length) {
        tetriminosBag = tetriminosList.slice(0);
      }

      var randomIndex = Math.floor(Math.random() * tetriminosBag.length),
          newTetrimino = tetriminos[tetriminosBag.splice(randomIndex, 1)];

      currentTetrimino = {
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

      client.keyboard.moveDown = false;
      client.keyboard.moveLeft = false;
      client.keyboard.moveRight = false;
      client.keyboard.rotate = false;

      Gameplay.checkTetriminoAvailableBehaviors();
    },
    checkTetriminoAvailableBehaviors: function () {
      // determine where the tetrimino can go
      var tmpMatrix1 = [],
          tmpMatrix2 = [],
          rotatedTetrimino = Utils.rotateMatrixCW(currentTetrimino.matrix);

      // temp matrix
      for (var i = 0; i < DEFAULTS.wellRows + 2; i++) {
        tmpMatrix1.push([]);
        tmpMatrix2.push([]);

        for (var j = 0; j < DEFAULTS.wellCols; j++) {
          tmpMatrix1[i].push(0);
          tmpMatrix2[i].push(0);
        }
      }

      // add tetrimino to temp matrix
      for (var i = 0; i < currentTetrimino.side; i++) {
        for (var j = 0; j < currentTetrimino.side; j++) {
          if (currentTetrimino.matrix[i][j]) {
            tmpMatrix1[currentTetrimino.y + i][currentTetrimino.x + j] = 1;
          }
        }
      }

      currentTetrimino.canMoveDown = true;
      currentTetrimino.canMoveLeft = true;
      currentTetrimino.canMoveRight = true;

      for (var i = 0; i < DEFAULTS.wellRows + 2; i++) {
        for (var j = 0; j < DEFAULTS.wellCols; j++) {
          if (tmpMatrix1[i][j] && (i === (DEFAULTS.wellRows + 1) || well[i + 1][j])) {
            currentTetrimino.canMoveDown = false;
          }

          if (tmpMatrix1[i][j] && (j === 0 || well[i][j - 1])) {
            currentTetrimino.canMoveLeft = false;
          }

          if (tmpMatrix1[i][j] && (j === (DEFAULTS.wellCols - 1) || well[i][j + 1])) {
            currentTetrimino.canMoveRight = false;
          }
        }
      }

      currentTetrimino.canRotate = true;

      // add rotated tetrimino to temp matrix
      for (var i = 0; i < currentTetrimino.side; i++) {
        for (var j = 0; j < currentTetrimino.side; j++) {
          if (rotatedTetrimino[i][j] && tmpMatrix2[currentTetrimino.y + i] && tmpMatrix2[currentTetrimino.y + i][currentTetrimino.x + j]) {
            tmpMatrix2[currentTetrimino.y + i][currentTetrimino.x + j] = 1;
          } else if (tmpMatrix2[currentTetrimino.y + i] === undefined || tmpMatrix2[currentTetrimino.y + i][currentTetrimino.x + j] === undefined) {
            currentTetrimino.canRotate = false;
            break;
          }
        }
      }

      if (currentTetrimino.canRotate) {
        for (var i = 0; i < DEFAULTS.wellRows + 2; i++) {
          for (var j = 0; j < DEFAULTS.wellCols; j++) {
            if (tmpMatrix2[i][j] && well[i][j]) {
              currentTetrimino.canRotate = false;
              break;
            }
          }
        }
      }
    },
    checkFilledRows: function () {
      var rowsFilled = [];

      for (var i = 0; i < DEFAULTS.wellRows + 2; i++) {
        var rowFilled = true;

        for (var j = 0; j < DEFAULTS.wellCols; j++) {
          if (!well[i][j]) {
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
          well.splice(rowIndex, 1);
          well.unshift([]);

          for (var j = 0; j < DEFAULTS.wellCols; j++) {
            well[0].push(0);
          }
        });

        score += scoring[rowsFilled.length - 1];
        scoreboardContainer.innerHTML = score;
      }
    }
  };

  var Utils = Game.Utils = {
    rotateMatrixCW: function (matrix) {
      var rotatedMatrix = [],
          side = matrix.length;

      for (var i = 0; i < side; i++) {
        rotatedMatrix.push([]);

        for (var j = 0; j < side; j++) {
          rotatedMatrix[i].push(matrix[side - j - 1][i]);
        }
      }

      return rotatedMatrix;
    }
  };

  Game.init = function () {
    Initialization.dom();
    Initialization.matrices();
    Initialization.numbers();
    Initialization.listeners();
    Initialization.timers();
    Display.addCubes();
    Events.onResize();
    Events.onEnterFrame();
    Gameplay.insertNewTetrimino();
  };

  return Game;
}));
