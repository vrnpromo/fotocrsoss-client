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
	var data = {};

	function drawRect(x, y) {
		var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#ff0000';

		var bmd = phaser.add.bitmapData(32, 32);

		// draw to the canvas context like normal
		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, 32, 32);
		bmd.ctx.fillStyle = color;
		bmd.ctx.fill();

		// use the bitmap data as the texture for the sprite
		var sprite = phaser.add.sprite(x * 32, y * 32, bmd);
	}

	return {
		preload: function preload() {
			phaser.load.xml('level', './data/levels/901.xml', false);
		},
		create: function create() {
			var xml = phaser.cache.getXML('level');

			var count = 0;
			xml.querySelectorAll('crossword>word').forEach(function (word) {
				console.log(word);
				var img = word.querySelector('image1').textContent;
				var label = word.querySelector('word').textContent;
				var pos = {
					x: parseInt(word.querySelector('xp1').textContent) + 1,
					y: parseInt(word.querySelector('yp1').textContent) + 1,
					x2: parseInt(word.querySelector('xp2').textContent) + 1,
					y2: parseInt(word.querySelector('yp2').textContent) + 1
				};

				if (img && label) {
					//data[label] = 'pic'+(++count);
					phaser.load.image('pic' + ++count, './data/imgs/' + img);

					drawRect(pos.x, pos.y);
					drawRect(pos.x2, pos.y2, '#00ff00');

					var length = label.length - 1;
					console.log(pos.x, pos.y, pos.x2, pos.y2, length);
					if (pos.x == pos.x2) {

						while (--length) {
							drawRect(pos.x, pos.y < pos.y2 ? pos.y + length : pos.y - length, '#aa0000');
						}
					} else {
						while (--length) {
							drawRect(pos.x < pos.x2 ? pos.x + length : pos.x - length, pos.y, '#aa0000');
						}
					}
				}
			});

			phaser.load.onLoadComplete.add(function () {
				var s = phaser.add.sprite(80, 0, 'pic1');

				s.x = 500;
			}, this);

			phaser.load.start();

			//s.rotation = 0.14;
			//s.x=0;
			//s.y=0
		},
		update: function update() {},
		render: function render() {
			//phaser.debug.text('BIBA BIBA BIBA', 360, 96, 'rgb(255,0,0)');
		}
	};
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGFwcC5qcyIsInNyY1xcc3RhdGVzXFxnYW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7O0FBRUEsSUFBSSxTQUFTLElBQUksT0FBTyxJQUFYLENBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLE9BQU8sTUFBakMsRUFBeUMsTUFBekMsQ0FBYjs7QUFFQSxPQUFPLEtBQVAsQ0FBYSxHQUFiLENBQWlCLE1BQWpCLEVBQXlCLG9CQUFVLE1BQVYsQ0FBekI7O0FBRUEsT0FBTyxLQUFQLENBQWEsS0FBYixDQUFtQixNQUFuQjs7Ozs7Ozs7a0JDTndCLFM7QUFBVCxTQUFTLFNBQVQsQ0FBbUIsTUFBbkIsRUFBMkI7QUFDekMsS0FBSSxPQUFPLEVBQVg7O0FBRUEsVUFBUyxRQUFULENBQWtCLENBQWxCLEVBQW9CLENBQXBCLEVBQXVDO0FBQUEsTUFBaEIsS0FBZ0IsdUVBQVYsU0FBVTs7QUFDdEMsTUFBSSxNQUFNLE9BQU8sR0FBUCxDQUFXLFVBQVgsQ0FBc0IsRUFBdEIsRUFBMEIsRUFBMUIsQ0FBVjs7QUFFRztBQUNBLE1BQUksR0FBSixDQUFRLFNBQVI7QUFDQSxNQUFJLEdBQUosQ0FBUSxJQUFSLENBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsRUFBakIsRUFBb0IsRUFBcEI7QUFDQSxNQUFJLEdBQUosQ0FBUSxTQUFSLEdBQW9CLEtBQXBCO0FBQ0EsTUFBSSxHQUFKLENBQVEsSUFBUjs7QUFFQTtBQUNBLE1BQUksU0FBUyxPQUFPLEdBQVAsQ0FBVyxNQUFYLENBQWtCLElBQUUsRUFBcEIsRUFBd0IsSUFBRSxFQUExQixFQUE4QixHQUE5QixDQUFiO0FBQ0g7O0FBRUQsUUFBTztBQUNOLFdBQVMsbUJBQVc7QUFDbkIsVUFBTyxJQUFQLENBQVksR0FBWixDQUFnQixPQUFoQixFQUF5Qix1QkFBekIsRUFBa0QsS0FBbEQ7QUFFQSxHQUpLO0FBS04sVUFBUSxrQkFBVTtBQUNkLE9BQUksTUFBTSxPQUFPLEtBQVAsQ0FBYSxNQUFiLENBQW9CLE9BQXBCLENBQVY7O0FBRUEsT0FBSSxRQUFNLENBQVY7QUFDQSxPQUFJLGdCQUFKLENBQXFCLGdCQUFyQixFQUF1QyxPQUF2QyxDQUErQyxnQkFBTTtBQUNwRCxZQUFRLEdBQVIsQ0FBWSxJQUFaO0FBQ0EsUUFBSSxNQUFNLEtBQUssYUFBTCxDQUFtQixRQUFuQixFQUE2QixXQUF2QztBQUNBLFFBQUksUUFBUSxLQUFLLGFBQUwsQ0FBbUIsTUFBbkIsRUFBMkIsV0FBdkM7QUFDQSxRQUFJLE1BQU07QUFDVCxRQUFHLFNBQVMsS0FBSyxhQUFMLENBQW1CLEtBQW5CLEVBQTBCLFdBQW5DLElBQWtELENBRDVDO0FBRVQsUUFBRyxTQUFTLEtBQUssYUFBTCxDQUFtQixLQUFuQixFQUEwQixXQUFuQyxJQUFrRCxDQUY1QztBQUdULFNBQUksU0FBUyxLQUFLLGFBQUwsQ0FBbUIsS0FBbkIsRUFBMEIsV0FBbkMsSUFBa0QsQ0FIN0M7QUFJVCxTQUFJLFNBQVMsS0FBSyxhQUFMLENBQW1CLEtBQW5CLEVBQTBCLFdBQW5DLElBQWtEO0FBSjdDLEtBQVY7O0FBT0EsUUFBRyxPQUFPLEtBQVYsRUFBZ0I7QUFDZjtBQUNILFlBQU8sSUFBUCxDQUFZLEtBQVosQ0FBa0IsUUFBTyxFQUFFLEtBQTNCLG1CQUFrRCxHQUFsRDs7QUFFQSxjQUFTLElBQUksQ0FBYixFQUFnQixJQUFJLENBQXBCO0FBQ0EsY0FBUyxJQUFJLEVBQWIsRUFBaUIsSUFBSSxFQUFyQixFQUF5QixTQUF6Qjs7QUFFQSxTQUFJLFNBQVMsTUFBTSxNQUFOLEdBQWEsQ0FBMUI7QUFDQSxhQUFRLEdBQVIsQ0FBWSxJQUFJLENBQWhCLEVBQW1CLElBQUksQ0FBdkIsRUFBMEIsSUFBSSxFQUE5QixFQUFrQyxJQUFJLEVBQXRDLEVBQTBDLE1BQTFDO0FBQ0EsU0FBRyxJQUFJLENBQUosSUFBUyxJQUFJLEVBQWhCLEVBQW1COztBQUVsQixhQUFNLEVBQUUsTUFBUjtBQUNDLGdCQUFTLElBQUksQ0FBYixFQUFnQixJQUFJLENBQUosR0FBUSxJQUFJLEVBQVosR0FBZ0IsSUFBSSxDQUFKLEdBQU0sTUFBdEIsR0FBK0IsSUFBSSxDQUFKLEdBQVEsTUFBdkQsRUFBK0QsU0FBL0Q7QUFERDtBQUVBLE1BSkQsTUFJSztBQUNKLGFBQU0sRUFBRSxNQUFSO0FBQ0MsZ0JBQVMsSUFBSSxDQUFKLEdBQVEsSUFBSSxFQUFaLEdBQWdCLElBQUksQ0FBSixHQUFNLE1BQXRCLEdBQStCLElBQUksQ0FBSixHQUFRLE1BQWhELEVBQXdELElBQUksQ0FBNUQsRUFBK0QsU0FBL0Q7QUFERDtBQUVBO0FBQ0U7QUFDRCxJQTdCRDs7QUErQkgsVUFBTyxJQUFQLENBQVksY0FBWixDQUEyQixHQUEzQixDQUErQixZQUFJO0FBQ2xDLFFBQUksSUFBSSxPQUFPLEdBQVAsQ0FBVyxNQUFYLENBQWtCLEVBQWxCLEVBQXNCLENBQXRCLEVBQXlCLE1BQXpCLENBQVI7O0FBRUEsTUFBRSxDQUFGLEdBQU0sR0FBTjtBQUNBLElBSkQsRUFJRyxJQUpIOztBQU1BLFVBQU8sSUFBUCxDQUFZLEtBQVo7O0FBRUc7QUFDQTtBQUNBO0FBQ0gsR0FuREs7QUFvRE4sVUFBUSxrQkFBVSxDQUVqQixDQXRESztBQXVETixVQUFRLGtCQUFVO0FBQ2pCO0FBQ0E7QUF6REssRUFBUDtBQTJEQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgZ2FtZVN0YXRlIGZyb20gJy4vc3RhdGVzL2dhbWUuanMnXHJcblxyXG5sZXQgcGhhc2VyID0gbmV3IFBoYXNlci5HYW1lKDgwMCwgNjAwLCBQaGFzZXIuQ0FOVkFTLCAnZ2FtZScpO1xyXG5cclxucGhhc2VyLnN0YXRlLmFkZCgnZ2FtZScsIGdhbWVTdGF0ZShwaGFzZXIpKTtcclxuXHJcbnBoYXNlci5zdGF0ZS5zdGFydCgnZ2FtZScpO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnYW1lU3RhdGUocGhhc2VyKSB7XHJcblx0bGV0IGRhdGEgPSB7fVxyXG5cclxuXHRmdW5jdGlvbiBkcmF3UmVjdCh4LHksIGNvbG9yPScjZmYwMDAwJyl7XHJcblx0XHR2YXIgYm1kID0gcGhhc2VyLmFkZC5iaXRtYXBEYXRhKDMyLCAzMik7XHJcblxyXG5cdCAgICAvLyBkcmF3IHRvIHRoZSBjYW52YXMgY29udGV4dCBsaWtlIG5vcm1hbFxyXG5cdCAgICBibWQuY3R4LmJlZ2luUGF0aCgpO1xyXG5cdCAgICBibWQuY3R4LnJlY3QoMCwwLDMyLDMyKTtcclxuXHQgICAgYm1kLmN0eC5maWxsU3R5bGUgPSBjb2xvcjtcclxuXHQgICAgYm1kLmN0eC5maWxsKCk7XHJcblxyXG5cdCAgICAvLyB1c2UgdGhlIGJpdG1hcCBkYXRhIGFzIHRoZSB0ZXh0dXJlIGZvciB0aGUgc3ByaXRlXHJcblx0ICAgIHZhciBzcHJpdGUgPSBwaGFzZXIuYWRkLnNwcml0ZSh4KjMyLCB5KjMyLCBibWQpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdHByZWxvYWQ6IGZ1bmN0aW9uICgpe1xyXG5cdFx0XHRwaGFzZXIubG9hZC54bWwoJ2xldmVsJywgJy4vZGF0YS9sZXZlbHMvOTAxLnhtbCcsIGZhbHNlKTtcclxuXHJcblx0XHR9LFxyXG5cdFx0Y3JlYXRlOiBmdW5jdGlvbigpe1xyXG5cdFx0ICAgIHZhciB4bWwgPSBwaGFzZXIuY2FjaGUuZ2V0WE1MKCdsZXZlbCcpO1xyXG5cclxuXHQgICAgXHRsZXQgY291bnQ9MDtcclxuXHRcdCAgICB4bWwucXVlcnlTZWxlY3RvckFsbCgnY3Jvc3N3b3JkPndvcmQnKS5mb3JFYWNoKHdvcmQ9PntcclxuXHRcdCAgICBcdGNvbnNvbGUubG9nKHdvcmQpO1xyXG5cdFx0ICAgIFx0bGV0IGltZyA9IHdvcmQucXVlcnlTZWxlY3RvcignaW1hZ2UxJykudGV4dENvbnRlbnQ7XHJcblx0XHQgICAgXHRsZXQgbGFiZWwgPSB3b3JkLnF1ZXJ5U2VsZWN0b3IoJ3dvcmQnKS50ZXh0Q29udGVudDtcclxuXHRcdCAgICBcdGxldCBwb3MgPSB7XHJcblx0ICAgIFx0XHRcdHg6IHBhcnNlSW50KHdvcmQucXVlcnlTZWxlY3RvcigneHAxJykudGV4dENvbnRlbnQpICsgMSxcclxuXHQgICAgXHRcdFx0eTogcGFyc2VJbnQod29yZC5xdWVyeVNlbGVjdG9yKCd5cDEnKS50ZXh0Q29udGVudCkgKyAxLFxyXG5cdCAgICBcdFx0XHR4MjogcGFyc2VJbnQod29yZC5xdWVyeVNlbGVjdG9yKCd4cDInKS50ZXh0Q29udGVudCkgKyAxLFxyXG5cdCAgICBcdFx0XHR5MjogcGFyc2VJbnQod29yZC5xdWVyeVNlbGVjdG9yKCd5cDInKS50ZXh0Q29udGVudCkgKyAxXHJcblx0XHQgICAgXHR9XHJcblxyXG5cdFx0ICAgIFx0aWYoaW1nICYmIGxhYmVsKXtcclxuXHRcdCAgICBcdFx0Ly9kYXRhW2xhYmVsXSA9ICdwaWMnKygrK2NvdW50KTtcclxuXHRcdFx0XHRcdHBoYXNlci5sb2FkLmltYWdlKCdwaWMnKygrK2NvdW50KSwgYC4vZGF0YS9pbWdzLyR7aW1nfWApO1xyXG5cclxuXHRcdFx0XHRcdGRyYXdSZWN0KHBvcy54LCBwb3MueSk7XHJcblx0XHRcdFx0XHRkcmF3UmVjdChwb3MueDIsIHBvcy55MiwgJyMwMGZmMDAnKTtcclxuXHJcblx0XHRcdFx0XHRsZXQgbGVuZ3RoID0gbGFiZWwubGVuZ3RoLTE7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhwb3MueCwgcG9zLnksIHBvcy54MiwgcG9zLnkyLCBsZW5ndGgpXHJcblx0XHRcdFx0XHRpZihwb3MueCA9PSBwb3MueDIpe1xyXG5cclxuXHRcdFx0XHRcdFx0d2hpbGUoLS1sZW5ndGgpXHJcblx0XHRcdFx0XHRcdFx0ZHJhd1JlY3QocG9zLngsIHBvcy55IDwgcG9zLnkyPyBwb3MueStsZW5ndGggOiBwb3MueSAtIGxlbmd0aCwgJyNhYTAwMDAnKVxyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdHdoaWxlKC0tbGVuZ3RoKVxyXG5cdFx0XHRcdFx0XHRcdGRyYXdSZWN0KHBvcy54IDwgcG9zLngyPyBwb3MueCtsZW5ndGggOiBwb3MueCAtIGxlbmd0aCwgcG9zLnksICcjYWEwMDAwJylcclxuXHRcdFx0XHRcdH1cclxuXHRcdCAgICBcdH1cclxuXHRcdCAgICB9KVxyXG5cclxuXHRcdFx0cGhhc2VyLmxvYWQub25Mb2FkQ29tcGxldGUuYWRkKCgpPT57XHJcblx0XHRcdFx0dmFyIHMgPSBwaGFzZXIuYWRkLnNwcml0ZSg4MCwgMCwgJ3BpYzEnKTtcclxuXHJcblx0XHRcdFx0cy54ID0gNTAwO1xyXG5cdFx0XHR9LCB0aGlzKTtcclxuXHJcblx0XHRcdHBoYXNlci5sb2FkLnN0YXJ0KCk7XHJcblxyXG4gICAgXHRcdC8vcy5yb3RhdGlvbiA9IDAuMTQ7XHJcbiAgICBcdFx0Ly9zLng9MDtcclxuICAgIFx0XHQvL3MueT0wXHJcblx0XHR9LFxyXG5cdFx0dXBkYXRlOiBmdW5jdGlvbigpe1xyXG5cclxuXHRcdH0sXHJcblx0XHRyZW5kZXI6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdC8vcGhhc2VyLmRlYnVnLnRleHQoJ0JJQkEgQklCQSBCSUJBJywgMzYwLCA5NiwgJ3JnYigyNTUsMCwwKScpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=
