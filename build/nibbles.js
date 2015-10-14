/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(1);
	var controller = __webpack_require__(2);
	var keyboard = __webpack_require__(3);

	var canvas = document.getElementById('canvas');
	canvas.width *= config.scale;
	canvas.height *= config.scale;

	document.onkeydown = function(event) {
	  keyboard(event, controller);
	};

	__webpack_require__(4)(newGame);

	newGame();

	function newGame(level) {
	  level = level || 0;
	  __webpack_require__(5)(config, canvas, controller, level, 0, config.lives);
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = exports = {
	  scale: 10,
	  timeStep: 100,
	  minTimeStep: 25,
	  eatAddLength: 4,
	  foodPerLevel: 10,
	  lives: 5
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = exports = {
	  next: null,
	  pause: false,
	  restart: null,
	  up: function() {
	    this.next = 'up';
	  },
	  down: function() {
	    this.next = 'down';
	  },
	  left: function() {
	    this.next = 'left';
	  },
	  right: function() {
	    this.next = 'right';
	  },
	  pauseGame: function() {
	    if (!this.pause) {
	      this.pause = true;
	    } else {
	      this.pause = false;
	      this.restart();
	    }
	  }
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = exports = function(event, controller) {
	  event = event || window.event;
	  event.preventDefault();
	  if (event.keyCode == '38' || event.keyCode == '75') {
	    controller.up();
	  } else if (event.keyCode == '40' || event.keyCode == '74') {
	    controller.down();
	  } else if (event.keyCode == '37' || event.keyCode == '72') {
	    controller.left();
	  } else if (event.keyCode == '39' || event.keyCode == '76') {
	    controller.right();
	  } else if (event.keyCode == '32') {
	    controller.pauseGame();
	  }
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(1);

	module.exports = exports = function(loader) {
	  var hardcoreMode = document.getElementById('hardcoreMode');
	  var reset = document.getElementById('reset');
	  var rainbow = document.getElementById('rainbow');
	  var lives = document.getElementById('lives');

	  var startingLives = config.lives;
	  var startingTimeStep = config.timeStep;
	  var startingEatAdd = config.eatAddLength;
	  var startingFoodPerLevel = config.foodPerLevel;

	  hardcoreMode.addEventListener('click', function(event) {
	    var music = document.getElementById('musicPlayer');
	    console.log(music.src);
	    if (hardcoreMode.firstChild.data === 'Hardcore Mode') {
	      hardcoreMode.firstChild.data = 'Normal Mode';
	      music.setAttribute('src', 'sound/hardcore.mp3');
	      music.load();
	      config.lives = 1;
	      config.timeStep = 50;
	      config.eatAddLength = 10;
	      config.foodPerLevel = 20;
	    } else {
	      hardcoreMode.firstChild.data = 'Hardcore Mode';
	      music.src = 'sound/music.mp3';
	      music.load();
	      config.lives = startingLives;
	      config.timeStep = startingTimeStep;
	      config.eatAddLength = startingEatAdd;
	      config.foodPerLevel = startingFoodPerLevel;
	    }
	  });

	  rainbow.addEventListener('click', function(event) {
	    if (rainbow.firstChild.data === 'Rainbow Snake') {
	      rainbow.firstChild.data = 'Normal Color Snake';
	      config.rainbow = true;
	    } else {
	      config.rainbow = false;
	      rainbow.firstChild.data = 'Rainbow Snake';
	    }
	  });

	  lives.addEventListener('click', function(event) {
	    if (lives.firstChild.data === 'Lots of Lives') {
	      lives.firstChild.data = 'Normal Lives';
	      config.lives = 999;
	    } else {
	      config.lives = startingLives;
	      lives.firstChild.data = 'Lots of Lives';
	    }
	  });

	  for (var i = 0; i < 10; i++) {
	    var level = i;
	    document.getElementById('level' + i).addEventListener('click', skipLevel);
	  }

	  function skipLevel(event) {
	    loader(event.target.id.substring(5));
	  }
	  reset.addEventListener('click', function(event) {
	    loader();
	  });
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Snake = __webpack_require__(6);
	var buildWall = __webpack_require__(7);
	var makeFood = __webpack_require__(9);
	var eventLoop = __webpack_require__(12);
	var levels = [
	              __webpack_require__(16)(),
	              __webpack_require__(18)(),
	              __webpack_require__(19)(),
	              __webpack_require__(20)(),
	              __webpack_require__(21)(),
	              __webpack_require__(22)(),
	              __webpack_require__(23)(),
	              __webpack_require__(24)(),
	              __webpack_require__(25)(),
	              __webpack_require__(26)()
	             ];

	module.exports = exports = function(config, canvas, controller,
	    levelnum, score, lives) {
	  if (levelnum === levels.length) {
	    return eventLoop(config, canvas, controller, score, null, null, null, null);
	  }
	  var level = levels[levelnum];
	  var snake = new Snake(level.startXPos, level.startYPos,
	      level.startXVel, level.startYVel, level.startLength);
	  var statics = level.obstacles.slice();
	  buildWall(statics);
	  var food = makeFood(snake, statics);
	  eventLoop(config, canvas, controller, score, statics, snake,
	      level, food, lives);
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = exports = Snake;

	function Snake(xPos, yPos, xVel, yVel, count) {
	  this.head = new SnakeSegment(xPos, yPos, xVel, yVel);
	  this.length = 1;
	  this.turns = [];
	  for (var i = 0; i < count - 1; i++) {
	    this.add();
	  }
	}

	function SnakeSegment(xPos, yPos, xVel, yVel) {
	  this.next = null;
	  this.xPos = xPos;
	  this.yPos = yPos;
	  this.xVel = xVel;
	  this.yVel = yVel;
	}

	Snake.prototype.add = function() {
	  var temp = this.head;
	  while (temp.next) {
	    temp = temp.next;
	  }
	  temp.next = new SnakeSegment(temp.xPos - temp.xVel, temp.yPos - temp.yVel,
	      temp.xVel, temp.yVel);
	  this.length++;
	};

	Snake.prototype.move = function(controller) {
	  if (controller.next) {
	    this.turns.unshift(controller.next);
	    controller.next = null;
	  } else {
	    this.turns.unshift(null);
	  }

	  if (this.turns.length > this.length) {
	    this.turns.pop();
	  }

	  var temp = this.head;
	  var segment = 0;
	  while (temp.next) {
	    temp.setVel(this.turns[segment]);
	    temp.xPos += temp.xVel;
	    temp.yPos += temp.yVel;
	    temp = temp.next;
	    segment++;
	  }
	  temp.setVel(this.turns[segment]);
	  temp.xPos += temp.xVel;
	  temp.yPos += temp.yVel;
	};

	SnakeSegment.prototype.setVel = function(direction) {
	  if (direction === 'left' && this.xVel !== 1) {
	    this.yVel = 0;
	    this.xVel = -1;
	  } else if (direction === 'right' && this.xVel !== -1) {
	    this.yVel = 0;
	    this.xVel = 1;
	  } else if (direction === 'up' && this.yVel !== 1) {
	    this.yVel = -1;
	    this.xVel = 0;
	  } else if (direction === 'down' && this.yVel !== -1) {
	    this.yVel = 1;
	    this.xVel = 0;
	  }
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Obstacle = __webpack_require__(8);

	module.exports = function(statics) {
	  var height = 50;
	  var width = 80;
	  for (var i = 0; i < width; i++) {
	    statics.push(new Obstacle(i, 0));
	  }
	  for (i = 1; i < height - 1; i++) {
	    statics.push(new Obstacle(0, i));
	    statics.push(new Obstacle(width - 1, i));
	  }
	  for (i = 0; i < width; i++) {
	    statics.push(new Obstacle(i, height - 1));
	  }
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(x, y) {
	  this.xPos = x;
	  this.yPos = y;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Food = __webpack_require__(10);
	var collider = __webpack_require__(11);

	function makeFood() {
	  var x = Math.round(Math.random() * (78 - 1) + 1);
	  var y = Math.round(Math.random() * (48 - 1) + 1);
	  return {xPos: x, yPos: y};
	}

	module.exports = exports = function(snake, statics) {
	  var food = makeFood();
	  while (collider(snake, statics, food, food) !== 0) {
	    food = makeFood();
	  }
	  return food;
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = exports = function(x, y) {
	  this.xPos = x;
	  this.yPos = y;
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function(snake, statics, food, head) {
	  for (var i = 0; i < statics.length; i++) {
	    if (head.xPos === statics[i].xPos && head.yPos === statics[i].yPos) {
	      return -1;
	    }
	  }
	  var temp = snake.head.next;
	  while (temp) {
	    if (head.xPos === temp.xPos && head.yPos === temp.yPos) {
	      return -1;
	    }
	    temp = temp.next;
	  }
	  if (snake.head.xPos === food.xPos && snake.head.yPos === food.yPos) {
	    return 1;
	  }
	  return 0;
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var animate = __webpack_require__(13);
	var collider = __webpack_require__(11);
	var makeFood = __webpack_require__(9);
	var text = __webpack_require__(14);
	var loader = __webpack_require__(5);
	var sound = __webpack_require__(15);

	module.exports = exports = function(config, canvas, controller, score,
	    statics, snake, level, food, lives) {
	  if (!level) {
	    controller.pause = true;
	    controller.restart = newGame;
	    return text(canvas, score, lives, 'Victory!\nOm Nom Nom!\nScore: ' + score +
	        '\nPress Space to Play Again', config);
	  }
	  var lastUpdate = Date.now();
	  var queuedSegments = 0;
	  var count = config.foodPerLevel;
	  var timeStep = Math.max(config.minTimeStep,
	      config.timeStep - (level.num * 5));
	  sound.playNewLevel();

	  text(canvas, score, lives, level.id + '\nPress Space', config, true);
	  controller.restart = unPause;
	  controller.pause = true;

	  function eventLoop() {
	    //Check pause control
	    if (controller.pause) {
	      sound.stopMusic();
	      text(canvas, score, lives, 'Paused\nPress Space to Resume', config);
	      controller.restart = unPause;
	      return;
	    }
	    sound.playMusic();
	    var now = Date.now();
	    if (now - lastUpdate >= config.timeStep) {
	      //Set new interval
	      lastUpdate = now;
	      //Move snake
	      snake.move(controller);
	      //Add queued segments
	      if (queuedSegments) {
	        snake.add();
	        queuedSegments--;
	      }
	      //Draw objects
	      animate(canvas, snake, statics, food, config);
	      //Draw score
	      text(canvas, score, lives, null, config);
	      //Check collisions
	      var collision = collider(snake, statics, food, snake.head);
	      //Collided with wall or obstacle
	      if (collision === -1) {
	        sound.playCollide();
	        if (lives === 1) {
	          text(canvas, score, lives, 'GAME OVER\nPress Space to Try Again',
	              config);
	          sound.playGameOver();
	          controller.pause = true;
	          controller.restart = newGame;
	          return false;
	        } else {
	          return __webpack_require__(5)(config, canvas, controller,
	              level.num, score, lives - 1);
	        }
	      //Collided with food object
	      } else if (collision === 1) {
	        sound.playEat();
	        //Increase score
	        score += (config.foodPerLevel - count + 1) * (level.num + 1);
	        //Increment level
	        if (count === 1) {
	          return __webpack_require__(5)(config, canvas, controller,
	              level.num + 1, score, lives);
	        }
	        count--;
	        //Increase game speed
	        if (timeStep > config.minTimeStep) {
	          timeStep -= 5;
	        }
	        //Make more food, queue segments
	        food = makeFood(snake, statics);
	        queuedSegments += config.eatAddLength;
	      }
	    }
	    window.requestAnimationFrame(eventLoop);
	  }

	  function unPause() {
	    window.requestAnimationFrame(eventLoop);
	  }

	  function newGame() {
	    __webpack_require__(5)(config, canvas, controller, 0, 0, config.lives);
	  }

	};



/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function(canvas, snake, statics, food, config) {
	  var ctx = canvas.getContext('2d');
	  ctx.clearRect(0, 0, 80 * config.scale, 52 * config.scale);

	  ctx.fillStyle = 'rgb(255,255,0)';
	  if (config.rainbow) {
	    var r = Math.floor(Math.random() * 255);
	    var g = Math.floor(Math.random() * 255);
	    var b = Math.floor(Math.random() * 255);
	    ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
	  }
	  var head = snake.head;
	  while (head.next) {
	    if (config.rainbow) {
	    }
	    drawRect(ctx, head.xPos, head.yPos, config.scale);
	    head = head.next;
	  }
	  drawRect(ctx, head.xPos, head.yPos, config.scale);

	  ctx.fillStyle = 'rgb(255,0,0)';

	  for (var i = 0; i < statics.length; i++) {
	    drawRect(ctx, statics[i].xPos, statics[i].yPos, config.scale);
	  }

	  ctx.fillStyle = 'rgb(0,255,0)';
	  drawRect(ctx, food.xPos, food.yPos, config.scale);
	};

	function drawRect(context, x, y, scale) {
	  context.fillRect(scale * x, scale * y, scale, scale);
	}



/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = exports = function(canvas, score, lives, message,
	    config, clear) {
	  var ctx = canvas.getContext('2d');
	  if (clear) {
	    ctx.clearRect(0, 0, config.scale * 80, config.scale * 52);
	  }
	  if (message) {
	    multiLine(ctx, canvas, message, config.scale * 5);
	    return;
	  }
	  ctx.font = 'bold ' + (config.scale * 2) + 'px Courier New';
	  ctx.fillStyle = 'rgb(255,255,255)';
	  ctx.textAlign = 'right';
	  ctx.fillText('Score: ' + score, 70 * config.scale, 52 * config.scale);
	  ctx.textAlign = 'left' ;
	  ctx.fillText('Lives: ' + lives, 10 * config.scale, 52 * config.scale);

	  function multiLine(ctx, canvas, text, px) {
	    text = text.split('\n');
	    ctx.font = 'bold ' + px + 'px Courier New';
	    var top = canvas.height / 2 - (px * text.length + 5 * text.length - 5) / 2;
	    ctx.textAlign = 'center';
	    ctx.fillStyle = 'rgb(255,255,255)';
	    for (var i = 0; i < text.length; i++) {
	      ctx.fillText(text[i], canvas.width / 2, top + (px + 5) * i);
	    }
	  }
	};



/***/ },
/* 15 */
/***/ function(module, exports) {

	var eatSoundPlayer = document.getElementById('eatSoundPlayer');
	var collideSoundPlayer = document.getElementById('collideSoundPlayer');
	var musicPlayer = document.getElementById('musicPlayer');
	var levelSoundPlayer = document.getElementById('levelSoundPlayer');
	var gameOverSoundPlayer = document.getElementById('gameOverSoundPlayer');

	module.exports = exports = {
	  playing: false,
	  playEat: function() {
	    eatSoundPlayer.play();
	  },
	  playCollide: function() {
	    collideSoundPlayer.play();
	  },
	  playNewLevel: function() {
	    levelSoundPlayer.play();
	  },
	  playMusic: function() {
	    musicPlayer.volume = 0.5;
	    this.playing = true;
	    musicPlayer.play();
	  },
	  stopMusic: function() {
	    this.playing = false;
	    musicPlayer.pause();
	    musicPlayer.currentTime = 0;
	  },
	  playGameOver: function() {
	    this.stopMusic();
	    gameOverSoundPlayer.play();
	  }
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Level = __webpack_require__(17);

	module.exports = exports = function() {
	  return new Level({
	    id: 'Wide Open Space',
	    num: 0,
	    obstacles: [],
	    startXPos: 40,
	    startXVel: 1,
	    startYPos: 25,
	    startYVel: 0,
	    startLength: 10
	  });
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = exports = function(config) {
	  this.id = config.id;
	  this.num = config.num;
	  this.obstacles = config.obstacles;
	  this.startXPos = config.startXPos;
	  this.startYPos = config.startYPos;
	  this.startXVel = config.startXVel;
	  this.startYVel = config.startYVel;
	  this.startLength = config.startLength;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Level = __webpack_require__(17);
	var Obstacle = __webpack_require__(8);

	module.exports = exports = function() {
	  var obstacles = [];
	  for (var i = 20; i <= 60; i++) {
	    obstacles.push(new Obstacle(i, 25));
	  }

	  return new Level({
	      id: 'The Grass is Bluer',
	      num: 1,
	      obstacles: obstacles,
	      startXPos: 20,
	      startXVel: 1,
	      startYPos: 7,
	      startYVel: 0,
	      startLength: 10
	    });
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var Level = __webpack_require__(17);
	var Obstacle = __webpack_require__(8);

	module.exports = exports = function() {
	  var obstacles = [];
	  for (var i = 10; i <= 40; i++) {
	    obstacles.push(new Obstacle(20, i));
	    obstacles.push(new Obstacle(60, i));
	  }

	  return new Level({
	        id: 'Double Slit Experiment',
	        num: 2,
	        obstacles: obstacles,
	        startXPos: 20,
	        startXVel: 1,
	        startYPos: 7,
	        startYVel: 0,
	        startLength: 10
	      });
	};



/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Level = __webpack_require__(17);
	var Obstacle = __webpack_require__(8);

	module.exports = exports = function() {
	  var obstacles = [];
	  for (var i = 0; i < 30; i++) {
	    obstacles.push(new Obstacle(20, i));
	    obstacles.push(new Obstacle(60, 19 + i));
	  }
	  for (i = 0; i < 30; i++) {
	    obstacles.push(new Obstacle(i, 38));
	    obstacles.push(new Obstacle(50 + i, 12));
	  }

	  return new Level({
	        id: 'Corners',
	        num: 3,
	        obstacles: obstacles,
	        startXPos: 43,
	        startXVel: 1,
	        startYPos: 7,
	        startYVel: 0,
	        startLength: 10
	      });
	};



/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Level = __webpack_require__(17);
	var Obstacle = __webpack_require__(8);

	module.exports = exports = function() {
	  var obstacles = [];
	  for (var i = 13; i <= 39; i++) {
	    obstacles.push(new Obstacle(21, i));
	    obstacles.push(new Obstacle(59, i));
	  }
	  for (i = 23; i <= 57; i++) {
	    obstacles.push(new Obstacle(i, 11));
	    obstacles.push(new Obstacle(i, 41));
	  }

	  return new Level({
	        id: 'Skinner Box',
	        num: 4,
	        obstacles: obstacles,
	        startXPos: 50,
	        startXVel: 1,
	        startYPos: 30,
	        startYVel: 0,
	        startLength: 10
	      });
	};



/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var Level = __webpack_require__(17);
	var Obstacle = __webpack_require__(8);

	module.exports = exports = function() {
	  var obstacles = [];
	  for (var i = 1; i <= 49; i++) {
	    if (i > 30 || i < 20) {
	      obstacles.push(new Obstacle(10, i));
	      obstacles.push(new Obstacle(20, i));
	      obstacles.push(new Obstacle(30, i));
	      obstacles.push(new Obstacle(40, i));
	      obstacles.push(new Obstacle(50, i));
	      obstacles.push(new Obstacle(60, i));
	      obstacles.push(new Obstacle(70, i));
	    }
	  }

	  return new Level({
	        id: 'Backgammon',
	        num: 5,
	        obstacles: obstacles,
	        startXPos: 43,
	        startXVel: 0,
	        startYPos: 39,
	        startYVel: -1,
	        startLength: 10
	      });
	};



/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var Level = __webpack_require__(17);
	var Obstacle = __webpack_require__(8);

	module.exports = exports = function() {
	  var obstacles = [];
	  for (var i = 1; i <= 49; i += 2) {
	    obstacles.push(new Obstacle(40, i));
	  }

	  return new Level({
	        id: 'Dash to the End',
	        num: 6,
	        obstacles: obstacles,
	        startXPos: 20,
	        startXVel: 1,
	        startYPos: 7,
	        startYVel: 0,
	        startLength: 10
	      });
	};



/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var Level = __webpack_require__(17);
	var Obstacle = __webpack_require__(8);

	module.exports = exports = function() {
	  var obstacles = [];
	  for (var i = 1; i <= 40; i++) {
	    obstacles.push(new Obstacle(10, i));
	    obstacles.push(new Obstacle(20, 49 - i));
	    obstacles.push(new Obstacle(30, i));
	    obstacles.push(new Obstacle(40, 49 - i));
	    obstacles.push(new Obstacle(50, i));
	    obstacles.push(new Obstacle(60, 49 - i));
	    obstacles.push(new Obstacle(70, i));
	  }

	  return new Level({
	        id: 'Snake on a Plane',
	        num: 7,
	        obstacles: obstacles,
	        startXPos: 20,
	        startXVel: 1,
	        startYPos: 7,
	        startYVel: 0,
	        startLength: 10
	      });
	};



/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var Level = __webpack_require__(17);
	var Obstacle = __webpack_require__(8);

	module.exports = exports = function() {
	  var obstacles = [];
	  for (var i = 2; i <= 47; i++) {
	    obstacles.push(new Obstacle(i, i));
	    obstacles.push(new Obstacle(i + 30, i));
	  }

	  return new Level({
	        id: 'What the..',
	        num: 8,
	        obstacles: obstacles,
	        startXPos: 20,
	        startXVel: 1,
	        startYPos: 7,
	        startYVel: 0,
	        startLength: 10
	      });
	};



/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Level = __webpack_require__(17);
	var Obstacle = __webpack_require__(8);

	module.exports = exports = function() {
	  var obstacles = [];
	  for (var r = 2; r < 78; r += 2) {
	    for (var i = 2; i < 48; i += 2) {
	      obstacles.push(new Obstacle(r, i));
	    }
	  }
	  return new Level({
	        id: 'Sweet Embrace of Death',
	        num: 0,
	        obstacles: obstacles,
	        startXPos: 21,
	        startXVel: 0,
	        startYPos: 20,
	        startYVel: 1,
	        startLength: 0
	      });
	};


/***/ }
/******/ ]);