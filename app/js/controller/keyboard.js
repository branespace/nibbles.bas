module.exports = exports = function(event, controller) {
  event = event || window.event;
  if (event.keyCode == '38' || event.keyCode == '75') {
    controller.up();
  } else if (event.keyCode == '40' || event.keyCode == '74') {
    controller.down();
  } else if (event.keyCode == '37' || event.keyCode == '72') {
    controller.left();
  } else if (event.keyCode == '39' || event.keyCode == '76') {
    controller.right();
  }

};
