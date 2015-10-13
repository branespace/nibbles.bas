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
