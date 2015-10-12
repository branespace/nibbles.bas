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
