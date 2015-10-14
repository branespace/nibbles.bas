var config = require('../config');

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
