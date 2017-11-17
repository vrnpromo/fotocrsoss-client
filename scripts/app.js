(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _game = require('./states/game.js');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var phaser = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');

phaser.state.add('game', (0, _game2.default)(phaser));

phaser.state.start('game');

},{"./states/game.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = gameState;
function gameState(phaser) {
	return {
		preload: function preload() {},
		create: function create() {},
		update: function update() {},
		render: function render() {
			phaser.debug.text('BIBA BIBA BIBA', 360, 96, 'rgb(255,0,0)');
		}
	};
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGFwcC5qcyIsInNyY1xcc3RhdGVzXFxnYW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7O0FBRUEsSUFBSSxTQUFTLElBQUksT0FBTyxJQUFYLENBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLE9BQU8sTUFBakMsRUFBeUMsTUFBekMsQ0FBYjs7QUFFQSxPQUFPLEtBQVAsQ0FBYSxHQUFiLENBQWlCLE1BQWpCLEVBQXlCLG9CQUFVLE1BQVYsQ0FBekI7O0FBRUEsT0FBTyxLQUFQLENBQWEsS0FBYixDQUFtQixNQUFuQjs7Ozs7Ozs7a0JDTndCLFM7QUFBVCxTQUFTLFNBQVQsQ0FBbUIsTUFBbkIsRUFBMkI7QUFDekMsUUFBTztBQUNOLFdBQVMsbUJBQVcsQ0FFbkIsQ0FISztBQUlOLFVBQVEsa0JBQVUsQ0FFakIsQ0FOSztBQU9OLFVBQVEsa0JBQVUsQ0FFakIsQ0FUSztBQVVOLFVBQVEsa0JBQVU7QUFDakIsVUFBTyxLQUFQLENBQWEsSUFBYixDQUFrQixnQkFBbEIsRUFBb0MsR0FBcEMsRUFBeUMsRUFBekMsRUFBNkMsY0FBN0M7QUFDQTtBQVpLLEVBQVA7QUFjQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgZ2FtZVN0YXRlIGZyb20gJy4vc3RhdGVzL2dhbWUuanMnXHJcblxyXG5sZXQgcGhhc2VyID0gbmV3IFBoYXNlci5HYW1lKDgwMCwgNjAwLCBQaGFzZXIuQ0FOVkFTLCAnZ2FtZScpO1xyXG5cclxucGhhc2VyLnN0YXRlLmFkZCgnZ2FtZScsIGdhbWVTdGF0ZShwaGFzZXIpKTtcclxuXHJcbnBoYXNlci5zdGF0ZS5zdGFydCgnZ2FtZScpO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnYW1lU3RhdGUocGhhc2VyKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdHByZWxvYWQ6IGZ1bmN0aW9uICgpe1xyXG5cclxuXHRcdH0sXHJcblx0XHRjcmVhdGU6IGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0fSxcclxuXHRcdHVwZGF0ZTogZnVuY3Rpb24oKXtcclxuXHJcblx0XHR9LFxyXG5cdFx0cmVuZGVyOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRwaGFzZXIuZGVidWcudGV4dCgnQklCQSBCSUJBIEJJQkEnLCAzNjAsIDk2LCAncmdiKDI1NSwwLDApJyk7XHJcblx0XHR9XHJcblx0fVxyXG59Il19
