module.exports = exports = {
  next: null,
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
  }
};
