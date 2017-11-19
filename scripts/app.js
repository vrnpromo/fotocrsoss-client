(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _game = require('./states/game.js');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var phaser = new Phaser.Game(760, 650, Phaser.CANVAS, 'game');

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

		var bmp = phaser.add.bitmapData(32, 32);
		bmp.draw('letter_empty', 0, 0, 32, 32);
		//    // draw to the canvas context like normal
		//    bmd.ctx.beginPath();
		//    bmd.ctx.rect(0,0,32,32);
		//    bmd.ctx.fillStyle = color;
		//    bmd.ctx.fill();

		// use the bitmap data as the texture for the sprite
		var sprite = phaser.add.sprite(x * 32, y * 32, bmp); //48
	}

	return {
		preload: function preload() {
			phaser.load.image('bg', './data/Background.png'); //t2
			phaser.load.image('bg_fot', './data/BackgroundFot.png');
			phaser.load.image('letter_empty', './data/Letter8x8.png');

			//gui
			phaser.load.image('gui_game_btn', './data/ButtonsNormal.png');

			phaser.load.xml('level', './data/levels/901.xml', false);
		},
		create: function create() {
			phaser.add.sprite(0, 0, 'bg');

			var photoCont = phaser.add.group();
			photoCont.create(0, 0, 'bg_fot');
			photoCont.x = 750 - 304;
			photoCont.y = 70;
			//phaser.add.sprite(750-304, 0, 'bg_fot'); //304


			var btnCont = phaser.add.group();
			btnCont.create(0, 0, 'gui_game_btn');
			btnCont.create(96 + 12, 0, 'gui_game_btn');
			btnCont.create((96 + 12) * 2, 0, 'gui_game_btn');
			btnCont.create((96 + 12) * 3, 0, 'gui_game_btn');
			btnCont.x = 750 - 304;
			btnCont.y = 70 + 304 + 14;
			btnCont.scale.setTo(0.72, 0.72);

			var letterCont = phaser.add.group();
			letterCont.create(0, 0, 'letter_empty');
			letterCont.create(48 + 4, 0, 'letter_empty');
			letterCont.create((48 + 4) * 2, 0, 'letter_empty');
			letterCont.create((48 + 4) * 3, 0, 'letter_empty');
			letterCont.create((48 + 4) * 4, 0, 'letter_empty');
			letterCont.create((48 + 4) * 5, 0, 'letter_empty');
			letterCont.create((48 + 4) * 6, 0, 'letter_empty');
			letterCont.create((48 + 4) * 7, 0, 'letter_empty');
			letterCont.create((48 + 4) * 8, 0, 'letter_empty');
			letterCont.create((48 + 4) * 9, 0, 'letter_empty');
			letterCont.x = 150;
			letterCont.y = 650 - 110;

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
				//var s = phaser.add.sprite(80, 0, 'pic1');
				var s = photoCont.create(0, 0, 'pic1');
				s.x = 4;
				s.y = 4;
				s.scale.setTo(0.98, 0.98);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGFwcC5qcyIsInNyY1xcc3RhdGVzXFxnYW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7O0FBRUEsSUFBSSxTQUFTLElBQUksT0FBTyxJQUFYLENBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLE9BQU8sTUFBakMsRUFBeUMsTUFBekMsQ0FBYjs7QUFFQSxPQUFPLEtBQVAsQ0FBYSxHQUFiLENBQWlCLE1BQWpCLEVBQXlCLG9CQUFVLE1BQVYsQ0FBekI7O0FBRUEsT0FBTyxLQUFQLENBQWEsS0FBYixDQUFtQixNQUFuQjs7Ozs7Ozs7a0JDTndCLFM7QUFBVCxTQUFTLFNBQVQsQ0FBbUIsTUFBbkIsRUFBMkI7QUFDekMsS0FBSSxPQUFPLEVBQVg7O0FBRUEsVUFBUyxRQUFULENBQWtCLENBQWxCLEVBQW9CLENBQXBCLEVBQXVDO0FBQUEsTUFBaEIsS0FBZ0IsdUVBQVYsU0FBVTs7QUFDdEMsTUFBSSxNQUFNLE9BQU8sR0FBUCxDQUFXLFVBQVgsQ0FBc0IsRUFBdEIsRUFBMEIsRUFBMUIsQ0FBVjtBQUNBLE1BQUksSUFBSixDQUFTLGNBQVQsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsRUFBL0IsRUFBbUMsRUFBbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVHO0FBQ0EsTUFBSSxTQUFTLE9BQU8sR0FBUCxDQUFXLE1BQVgsQ0FBa0IsSUFBRSxFQUFwQixFQUF3QixJQUFFLEVBQTFCLEVBQThCLEdBQTlCLENBQWIsQ0FWbUMsQ0FVYztBQUNwRDs7QUFFRCxRQUFPO0FBQ04sV0FBUyxtQkFBWTtBQUNwQixVQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLElBQWxCLEVBQXdCLHVCQUF4QixFQURvQixDQUM2QjtBQUNqRCxVQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLFFBQWxCLEVBQTRCLDBCQUE1QjtBQUNBLFVBQU8sSUFB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QUFKLEdBQVEsTUFBaEQsRUFBd0QsSUFBSSxDQUE1RCxFQUErRCxTQUEvRDtBQUREO0FBRUE7QUFDRDtBQUNELElBN0JKOztBQStCQSxVQUFPLElBQVAsQ0FBWSxjQUFaLENBQTJCLEdBQTNCLENBQStCLFlBQUs7QUFDbkM7QUFDQSxRQUFJLElBQUksVUFBVSxNQUFWLENBQWlCLENBQWpCLEVBQW9CLENBQXBCLEVBQXVCLE1BQXZCLENBQVI7QUFDQSxNQUFFLENBQUYsR0FBTSxDQUFOO0FBQ0EsTUFBRSxDQUFGLEdBQU0sQ0FBTjtBQUNBLE1BQUUsS0FBRixDQUFRLEtBQVIsQ0FBYyxJQUFkLEVBQW1CLElBQW5CO0FBQ0EsSUFORCxFQU1HLElBTkg7O0FBUUEsVUFBTyxJQUFQLENBQVksS0FBWjs7QUFFRztBQUNBO0FBQ0E7QUFDQSxHQTVGRTtBQTZGSCxVQUFRLGtCQUFVLENBRWpCLENBL0ZFO0FBZ0dILFVBQVEsa0JBQVU7QUFDcEI7QUFDQTtBQWxHSyxFQUFQO0FBb0dBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBnYW1lU3RhdGUgZnJvbSAnLi9zdGF0ZXMvZ2FtZS5qcydcclxuXHJcbmxldCBwaGFzZXIgPSBuZXcgUGhhc2VyLkdhbWUoNzYwLCA2NTAsIFBoYXNlci5DQU5WQVMsICdnYW1lJyk7XHJcblxyXG5waGFzZXIuc3RhdGUuYWRkKCdnYW1lJywgZ2FtZVN0YXRlKHBoYXNlcikpO1xyXG5cclxucGhhc2VyLnN0YXRlLnN0YXJ0KCdnYW1lJyk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdhbWVTdGF0ZShwaGFzZXIpIHtcclxuXHRsZXQgZGF0YSA9IHt9XHJcblxyXG5cdGZ1bmN0aW9uIGRyYXdSZWN0KHgseSwgY29sb3I9JyNmZjAwMDAnKXtcclxuXHRcdHZhciBibXAgPSBwaGFzZXIuYWRkLmJpdG1hcERhdGEoMzIsIDMyKTtcclxuXHRcdGJtcC5kcmF3KCdsZXR0ZXJfZW1wdHknLCAwLCAwLCAzMiwgMzIpO1xyXG5cdCAvLyAgICAvLyBkcmF3IHRvIHRoZSBjYW52YXMgY29udGV4dCBsaWtlIG5vcm1hbFxyXG5cdCAvLyAgICBibWQuY3R4LmJlZ2luUGF0aCgpO1xyXG5cdCAvLyAgICBibWQuY3R4LnJlY3QoMCwwLDMyLDMyKTtcclxuXHQgLy8gICAgYm1kLmN0eC5maWxsU3R5bGUgPSBjb2xvcjtcclxuXHQgLy8gICAgYm1kLmN0eC5maWxsKCk7XHJcblxyXG5cdCAgICAvLyB1c2UgdGhlIGJpdG1hcCBkYXRhIGFzIHRoZSB0ZXh0dXJlIGZvciB0aGUgc3ByaXRlXHJcblx0ICAgIHZhciBzcHJpdGUgPSBwaGFzZXIuYWRkLnNwcml0ZSh4KjMyLCB5KjMyLCBibXApOyAvLzQ4XHJcblx0fVxyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0cHJlbG9hZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRwaGFzZXIubG9hZC5pbWFnZSgnYmcnLCAnLi9kYXRhL0JhY2tncm91bmQucG5nJyk7Ly90MlxyXG5cdFx0XHRwaGFzZXIubG9hZC5pbWFnZSgnYmdfZm90JywgJy4vZGF0YS9CYWNrZ3JvdW5kRm90LnBuZycpO1xyXG5cdFx0XHRwaGFzZXIubG9hZC5pbWFnZSgnbGV0dGVyX2VtcHR5JywgJy4vZGF0YS9MZXR0ZXI4eDgucG5nJyk7XHJcblxyXG5cdFx0XHQvL2d1aVxyXG5cdFx0XHRwaGFzZXIubG9hZC5pbWFnZSgnZ3VpX2dhbWVfYnRuJywgJy4vZGF0YS9CdXR0b25zTm9ybWFsLnBuZycpO1xyXG5cclxuXHRcdFx0cGhhc2VyLmxvYWQueG1sKCdsZXZlbCcsICcuL2RhdGEvbGV2ZWxzLzkwMS54bWwnLCBmYWxzZSk7XHJcblxyXG5cdFx0fSxcclxuXHRcdGNyZWF0ZTogZnVuY3Rpb24oKXtcclxuXHRcdFx0cGhhc2VyLmFkZC5zcHJpdGUoMCwgMCwgJ2JnJyk7XHJcblxyXG5cdFx0XHRsZXQgcGhvdG9Db250ID0gcGhhc2VyLmFkZC5ncm91cCgpO1xyXG5cdFx0XHRwaG90b0NvbnQuY3JlYXRlKDAsMCwgJ2JnX2ZvdCcpO1xyXG5cdFx0XHRwaG90b0NvbnQueCA9IDc1MC0zMDQ7XHJcblx0XHRcdHBob3RvQ29udC55ID0gNzA7XHJcblx0XHRcdC8vcGhhc2VyLmFkZC5zcHJpdGUoNzUwLTMwNCwgMCwgJ2JnX2ZvdCcpOyAvLzMwNFxyXG5cclxuXHJcblx0XHRcdGxldCBidG5Db250ID0gcGhhc2VyLmFkZC5ncm91cCgpO1xyXG5cdFx0XHRidG5Db250LmNyZWF0ZSgwLDAsICdndWlfZ2FtZV9idG4nKTtcclxuXHRcdFx0YnRuQ29udC5jcmVhdGUoOTYgKyAxMiwgMCwgJ2d1aV9nYW1lX2J0bicpO1xyXG5cdFx0XHRidG5Db250LmNyZWF0ZSgoOTYgKyAxMikqMiwgMCwgJ2d1aV9nYW1lX2J0bicpO1xyXG5cdFx0XHRidG5Db250LmNyZWF0ZSgoOTYgKyAxMikqMywgMCwgJ2d1aV9nYW1lX2J0bicpO1xyXG5cdFx0XHRidG5Db250LnggPSA3NTAtMzA0O1xyXG5cdFx0XHRidG5Db250LnkgPSA3MCArIDMwNCArIDE0O1xyXG5cdFx0XHRidG5Db250LnNjYWxlLnNldFRvKDAuNzIsIDAuNzIpO1xyXG5cclxuXHRcdFx0bGV0IGxldHRlckNvbnQgPSBwaGFzZXIuYWRkLmdyb3VwKCk7XHJcblx0XHRcdGxldHRlckNvbnQuY3JlYXRlKDAsMCwgJ2xldHRlcl9lbXB0eScpO1xyXG5cdFx0XHRsZXR0ZXJDb250LmNyZWF0ZSg0OCs0LDAsICdsZXR0ZXJfZW1wdHknKTtcclxuXHRcdFx0bGV0dGVyQ29udC5jcmVhdGUoKDQ4KzQpKjIsMCwgJ2xldHRlcl9lbXB0eScpO1xyXG5cdFx0XHRsZXR0ZXJDb250LmNyZWF0ZSgoNDgrNCkqMywwLCAnbGV0dGVyX2VtcHR5Jyk7XHJcblx0XHRcdGxldHRlckNvbnQuY3JlYXRlKCg0OCs0KSo0LDAsICdsZXR0ZXJfZW1wdHknKTtcclxuXHRcdFx0bGV0dGVyQ29udC5jcmVhdGUoKDQ4KzQpKjUsMCwgJ2xldHRlcl9lbXB0eScpO1xyXG5cdFx0XHRsZXR0ZXJDb250LmNyZWF0ZSgoNDgrNCkqNiwwLCAnbGV0dGVyX2VtcHR5Jyk7XHJcblx0XHRcdGxldHRlckNvbnQuY3JlYXRlKCg0OCs0KSo3LDAsICdsZXR0ZXJfZW1wdHknKTtcclxuXHRcdFx0bGV0dGVyQ29udC5jcmVhdGUoKDQ4KzQpKjgsMCwgJ2xldHRlcl9lbXB0eScpO1xyXG5cdFx0XHRsZXR0ZXJDb250LmNyZWF0ZSgoNDgrNCkqOSwwLCAnbGV0dGVyX2VtcHR5Jyk7XHJcblx0XHRcdGxldHRlckNvbnQueCA9IDE1MDtcclxuXHRcdFx0bGV0dGVyQ29udC55ID0gNjUwLTExMDtcclxuXHJcblx0XHRcdHZhciB4bWwgPSBwaGFzZXIuY2FjaGUuZ2V0WE1MKCdsZXZlbCcpO1xyXG5cclxuXHRcdFx0bGV0IGNvdW50PTA7XHJcblx0XHRcdHhtbC5xdWVyeVNlbGVjdG9yQWxsKCdjcm9zc3dvcmQ+d29yZCcpLmZvckVhY2god29yZD0+e1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKHdvcmQpO1xyXG5cdFx0XHRcdGxldCBpbWcgPSB3b3JkLnF1ZXJ5U2VsZWN0b3IoJ2ltYWdlMScpLnRleHRDb250ZW50O1xyXG5cdFx0XHRcdGxldCBsYWJlbCA9IHdvcmQucXVlcnlTZWxlY3Rvcignd29yZCcpLnRleHRDb250ZW50O1xyXG5cdFx0XHRcdGxldCBwb3MgPSB7XHJcblx0XHRcdFx0XHR4OiBwYXJzZUludCh3b3JkLnF1ZXJ5U2VsZWN0b3IoJ3hwMScpLnRleHRDb250ZW50KSArIDEsXHJcblx0XHRcdFx0XHR5OiBwYXJzZUludCh3b3JkLnF1ZXJ5U2VsZWN0b3IoJ3lwMScpLnRleHRDb250ZW50KSArIDEsXHJcblx0XHRcdFx0XHR4MjogcGFyc2VJbnQod29yZC5xdWVyeVNlbGVjdG9yKCd4cDInKS50ZXh0Q29udGVudCkgKyAxLFxyXG5cdFx0XHRcdFx0eTI6IHBhcnNlSW50KHdvcmQucXVlcnlTZWxlY3RvcigneXAyJykudGV4dENvbnRlbnQpICsgMVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYoaW1nICYmIGxhYmVsKXtcclxuXHRcdCAgICBcdFx0Ly9kYXRhW2xhYmVsXSA9ICdwaWMnKygrK2NvdW50KTtcclxuXHRcdCAgICBcdFx0cGhhc2VyLmxvYWQuaW1hZ2UoJ3BpYycrKCsrY291bnQpLCBgLi9kYXRhL2ltZ3MvJHtpbWd9YCk7XHJcblxyXG5cdFx0ICAgIFx0XHRkcmF3UmVjdChwb3MueCwgcG9zLnkpO1xyXG5cdFx0ICAgIFx0XHRkcmF3UmVjdChwb3MueDIsIHBvcy55MiwgJyMwMGZmMDAnKTtcclxuXHJcblx0XHQgICAgXHRcdGxldCBsZW5ndGggPSBsYWJlbC5sZW5ndGgtMTtcclxuXHRcdCAgICBcdFx0Y29uc29sZS5sb2cocG9zLngsIHBvcy55LCBwb3MueDIsIHBvcy55MiwgbGVuZ3RoKVxyXG5cdFx0ICAgIFx0XHRpZihwb3MueCA9PSBwb3MueDIpe1xyXG5cclxuXHRcdCAgICBcdFx0XHR3aGlsZSgtLWxlbmd0aClcclxuXHRcdCAgICBcdFx0XHRcdGRyYXdSZWN0KHBvcy54LCBwb3MueSA8IHBvcy55Mj8gcG9zLnkrbGVuZ3RoIDogcG9zLnkgLSBsZW5ndGgsICcjYWEwMDAwJylcclxuXHRcdCAgICBcdFx0fWVsc2V7XHJcblx0XHQgICAgXHRcdFx0d2hpbGUoLS1sZW5ndGgpXHJcblx0XHQgICAgXHRcdFx0XHRkcmF3UmVjdChwb3MueCA8IHBvcy54Mj8gcG9zLngrbGVuZ3RoIDogcG9zLnggLSBsZW5ndGgsIHBvcy55LCAnI2FhMDAwMCcpXHJcblx0XHQgICAgXHRcdH1cclxuXHRcdCAgICBcdH1cclxuXHRcdCAgICB9KVxyXG5cclxuXHRcdFx0cGhhc2VyLmxvYWQub25Mb2FkQ29tcGxldGUuYWRkKCgpPT4ge1xyXG5cdFx0XHRcdC8vdmFyIHMgPSBwaGFzZXIuYWRkLnNwcml0ZSg4MCwgMCwgJ3BpYzEnKTtcclxuXHRcdFx0XHRsZXQgcyA9IHBob3RvQ29udC5jcmVhdGUoMCwgMCwgJ3BpYzEnKTtcclxuXHRcdFx0XHRzLnggPSA0O1xyXG5cdFx0XHRcdHMueSA9IDQ7XHJcblx0XHRcdFx0cy5zY2FsZS5zZXRUbygwLjk4LDAuOTgpO1xyXG5cdFx0XHR9LCB0aGlzKTtcclxuXHJcblx0XHRcdHBoYXNlci5sb2FkLnN0YXJ0KCk7XHJcblxyXG4gICAgXHRcdC8vcy5yb3RhdGlvbiA9IDAuMTQ7XHJcbiAgICBcdFx0Ly9zLng9MDtcclxuICAgIFx0XHQvL3MueT0wXHJcbiAgICBcdH0sXHJcbiAgICBcdHVwZGF0ZTogZnVuY3Rpb24oKXtcclxuXHJcbiAgICBcdH0sXHJcbiAgICBcdHJlbmRlcjogZnVuY3Rpb24oKXtcclxuXHRcdFx0Ly9waGFzZXIuZGVidWcudGV4dCgnQklCQSBCSUJBIEJJQkEnLCAzNjAsIDk2LCAncmdiKDI1NSwwLDApJyk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==
