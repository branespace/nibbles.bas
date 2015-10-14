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
