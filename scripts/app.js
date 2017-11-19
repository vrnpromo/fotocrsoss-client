(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _mainMenu = require('./states/mainMenu.js');

var _mainMenu2 = _interopRequireDefault(_mainMenu);

var _game = require('./states/game.js');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var phaser = new Phaser.Game(760, 650, Phaser.CANVAS, 'game');

phaser.state.add('mainMenu', (0, _mainMenu2.default)(phaser));
phaser.state.add('game', (0, _game2.default)(phaser));

phaser.state.start('mainMenu');

},{"./states/game.js":2,"./states/mainMenu.js":3}],2:[function(require,module,exports){
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
			//phaser.load.image('bg', './data/Background.png');//t2
			phaser.load.image('bg_fot', './data/BackgroundFot.png');
			phaser.load.image('letter_empty', './data/Letter8x8.png');

			//gui
			//phaser.load.image('gui_game_btn', './data/ButtonsNormal.png');

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

			//this.pet.loadTexture('pet_black_hat');
			// var button = game.make.button(game.world.centerX - 95, 400, 'button', removeGroup, this, 2, 1, 0);

			//   button.onInputOver.add(over, this);
			//   button.onInputOut.add(out, this);

			// item.events.onInputDown.add(select);
			//    	item.events.onInputUp.add(release);
			//    	item.events.onInputOut.add(moveOff);

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

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
			value: true
});

exports.default = function (phaser) {
			return {
						preload: function preload() {
									phaser.load.image('bg', './data/Background.png'); //t2

									//gui
									phaser.load.image('gui_game_btn', './data/ButtonsNormal.png');
									phaser.load.image('gui_game_btn_over', './data/ButtonsOver.png');
						},
						create: function create() {
									phaser.add.sprite(0, 0, 'bg');

									var style = { font: "24px Arial", fill: "#000000", align: "center" };
									//let btn = phaser.add.button(phaser.world.centerX - 95, phaser.world.centerY, 'gui_game_btn', ()=>{phaser.state.start('game');}, this);
									var group = phaser.add.group();
									group.inputEnableChildren = true;

									group.create(0, 0, 'gui_game_btn');
									var label = phaser.add.text(12, 12, "Start", style, group);

									group.onChildInputDown.add(function () {
												phaser.state.start('game');
									});

									group.x = phaser.world.centerX - 46;
									group.y = phaser.world.centerY - 46;
									// var button = game.make.button(game.world.centerX - 95, 400, 'button', removeGroup, this, 2, 1, 0);

									//   button.onInputOver.add(over, this);
									//   button.onInputOut.add(out, this);
						},
						update: function update() {},
						render: function render() {}
			};
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGFwcC5qcyIsInNyY1xcc3RhdGVzXFxnYW1lLmpzIiwic3JjXFxzdGF0ZXNcXG1haW5NZW51LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLFNBQVMsSUFBSSxPQUFPLElBQVgsQ0FBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEIsT0FBTyxNQUFqQyxFQUF5QyxNQUF6QyxDQUFiOztBQUVBLE9BQU8sS0FBUCxDQUFhLEdBQWIsQ0FBaUIsVUFBakIsRUFBNkIsd0JBQWMsTUFBZCxDQUE3QjtBQUNBLE9BQU8sS0FBUCxDQUFhLEdBQWIsQ0FBaUIsTUFBakIsRUFBeUIsb0JBQVUsTUFBVixDQUF6Qjs7QUFFQSxPQUFPLEtBQVAsQ0FBYSxLQUFiLENBQW1CLFVBQW5COzs7Ozs7OztrQkNSd0IsUztBQUFULFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQjtBQUN6QyxLQUFJLE9BQU8sRUFBWDs7QUFFQSxVQUFTLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBb0IsQ0FBcEIsRUFBdUM7QUFBQSxNQUFoQixLQUFnQix1RUFBVixTQUFVOztBQUN0QyxNQUFJLE1BQU0sT0FBTyxHQUFQLENBQVcsVUFBWCxDQUFzQixFQUF0QixFQUEwQixFQUExQixDQUFWO0FBQ0EsTUFBSSxJQUFKLENBQVMsY0FBVCxFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixFQUEvQixFQUFtQyxFQUFuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUc7QUFDQSxNQUFJLFNBQVMsT0FBTyxHQUFQLENBQVcsTUFBWCxDQUFrQixJQUFFLEVBQXBCLEVBQXdCLElBQUUsRUFBMUIsRUFBOEIsR0FBOUIsQ0FBYixDQVZtQyxDQVVjO0FBQ3BEOztBQUVELFFBQU87QUFDTixXQUFTLG1CQUFZO0FBQ3BCO0FBQ0EsVUFBTyxJQUFQLENBQVksS0FBWixD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QUNBLGVBQU0sbUJBQU4sR0FBNEIsSUFBNUI7O0FBRUEsZUFBTSxNQUFOLENBQWEsQ0FBYixFQUFlLENBQWYsRUFBa0IsY0FBbEI7QUFDQSxhQUFJLFFBQVEsT0FBTyxHQUFQLENBQVcsSUFBWCxDQUFnQixFQUFoQixFQUFvQixFQUFwQixFQUF3QixPQUF4QixFQUFpQyxLQUFqQyxFQUF3QyxLQUF4QyxDQUFaOztBQUVBLGVBQU0sZ0JBQU4sQ0FBdUIsR0FBdkIsQ0FBMkIsWUFBSTtBQUFDLG1CQUFPLEtBQVAsQ0FBYSxLQUFiLENBQW1CLE1BQW5CO0FBQTRCLFVBQTVEOztBQUVBLGVBQU0sQ0FBTixHQUFVLE9BQU8sS0FBUCxDQUFhLE9BQWIsR0FBdUIsRUFBakM7QUFDQSxlQUFNLENBQU4sR0FBVSxPQUFPLEtBQVAsQ0FBYSxPQUFiLEdBQXVCLEVBQWpDO0FBQ0E7O0FBRUM7QUFDQTtBQUNELE9BM0JJO0FBNEJMLGNBQU8sa0JBQUksQ0FBRSxDQTVCUjtBQTZCTCxjQUFPLGtCQUFJLENBQUU7QUE3QlIsSUFBTjtBQStCQSxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBtYWluTWVudVN0YXRlIGZyb20gJy4vc3RhdGVzL21haW5NZW51LmpzJ1xyXG5pbXBvcnQgZ2FtZVN0YXRlIGZyb20gJy4vc3RhdGVzL2dhbWUuanMnXHJcblxyXG5sZXQgcGhhc2VyID0gbmV3IFBoYXNlci5HYW1lKDc2MCwgNjUwLCBQaGFzZXIuQ0FOVkFTLCAnZ2FtZScpO1xyXG5cclxucGhhc2VyLnN0YXRlLmFkZCgnbWFpbk1lbnUnLCBtYWluTWVudVN0YXRlKHBoYXNlcikpO1xyXG5waGFzZXIuc3RhdGUuYWRkKCdnYW1lJywgZ2FtZVN0YXRlKHBoYXNlcikpO1xyXG5cclxucGhhc2VyLnN0YXRlLnN0YXJ0KCdtYWluTWVudScpO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnYW1lU3RhdGUocGhhc2VyKSB7XHJcblx0bGV0IGRhdGEgPSB7fVxyXG5cclxuXHRmdW5jdGlvbiBkcmF3UmVjdCh4LHksIGNvbG9yPScjZmYwMDAwJyl7XHJcblx0XHR2YXIgYm1wID0gcGhhc2VyLmFkZC5iaXRtYXBEYXRhKDMyLCAzMik7XHJcblx0XHRibXAuZHJhdygnbGV0dGVyX2VtcHR5JywgMCwgMCwgMzIsIDMyKTtcclxuXHQgLy8gICAgLy8gZHJhdyB0byB0aGUgY2FudmFzIGNvbnRleHQgbGlrZSBub3JtYWxcclxuXHQgLy8gICAgYm1kLmN0eC5iZWdpblBhdGgoKTtcclxuXHQgLy8gICAgYm1kLmN0eC5yZWN0KDAsMCwzMiwzMik7XHJcblx0IC8vICAgIGJtZC5jdHguZmlsbFN0eWxlID0gY29sb3I7XHJcblx0IC8vICAgIGJtZC5jdHguZmlsbCgpO1xyXG5cclxuXHQgICAgLy8gdXNlIHRoZSBiaXRtYXAgZGF0YSBhcyB0aGUgdGV4dHVyZSBmb3IgdGhlIHNwcml0ZVxyXG5cdCAgICB2YXIgc3ByaXRlID0gcGhhc2VyLmFkZC5zcHJpdGUoeCozMiwgeSozMiwgYm1wKTsgLy80OFxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdHByZWxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Ly9waGFzZXIubG9hZC5pbWFnZSgnYmcnLCAnLi9kYXRhL0JhY2tncm91bmQucG5nJyk7Ly90MlxyXG5cdFx0XHRwaGFzZXIubG9hZC5pbWFnZSgnYmdfZm90JywgJy4vZGF0YS9CYWNrZ3JvdW5kRm90LnBuZycpO1xyXG5cdFx0XHRwaGFzZXIubG9hZC5pbWFnZSgnbGV0dGVyX2VtcHR5JywgJy4vZGF0YS9MZXR0ZXI4eDgucG5nJyk7XHJcblxyXG5cdFx0XHQvL2d1aVxyXG5cdFx0XHQvL3BoYXNlci5sb2FkLmltYWdlKCdndWlfZ2FtZV9idG4nLCAnLi9kYXRhL0J1dHRvbnNOb3JtYWwucG5nJyk7XHJcblxyXG5cdFx0XHRwaGFzZXIubG9hZC54bWwoJ2xldmVsJywgJy4vZGF0YS9sZXZlbHMvOTAxLnhtbCcsIGZhbHNlKTtcclxuXHJcblx0XHR9LFxyXG5cdFx0Y3JlYXRlOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRwaGFzZXIuYWRkLnNwcml0ZSgwLCAwLCAnYmcnKTtcclxuXHJcblx0XHRcdGxldCBwaG90b0NvbnQgPSBwaGFzZXIuYWRkLmdyb3VwKCk7XHJcblx0XHRcdHBob3RvQ29udC5jcmVhdGUoMCwwLCAnYmdfZm90Jyk7XHJcblx0XHRcdHBob3RvQ29udC54ID0gNzUwLTMwNDtcclxuXHRcdFx0cGhvdG9Db250LnkgPSA3MDtcclxuXHRcdFx0Ly9waGFzZXIuYWRkLnNwcml0ZSg3NTAtMzA0LCAwLCAnYmdfZm90Jyk7IC8vMzA0XHJcblxyXG5cclxuXHRcdFx0bGV0IGJ0bkNvbnQgPSBwaGFzZXIuYWRkLmdyb3VwKCk7XHJcblx0XHRcdGJ0bkNvbnQuY3JlYXRlKDAsMCwgJ2d1aV9nYW1lX2J0bicpO1xyXG5cdFx0XHRidG5Db250LmNyZWF0ZSg5NiArIDEyLCAwLCAnZ3VpX2dhbWVfYnRuJyk7XHJcblx0XHRcdGJ0bkNvbnQuY3JlYXRlKCg5NiArIDEyKSoyLCAwLCAnZ3VpX2dhbWVfYnRuJyk7XHJcblx0XHRcdGJ0bkNvbnQuY3JlYXRlKCg5NiArIDEyKSozLCAwLCAnZ3VpX2dhbWVfYnRuJyk7XHJcblx0XHRcdGJ0bkNvbnQueCA9IDc1MC0zMDQ7XHJcblx0XHRcdGJ0bkNvbnQueSA9IDcwICsgMzA0ICsgMTQ7XHJcblx0XHRcdGJ0bkNvbnQuc2NhbGUuc2V0VG8oMC43MiwgMC43Mik7XHJcblxyXG5cdFx0XHRsZXQgbGV0dGVyQ29udCA9IHBoYXNlci5hZGQuZ3JvdXAoKTtcclxuXHRcdFx0bGV0dGVyQ29udC5jcmVhdGUoMCwwLCAnbGV0dGVyX2VtcHR5Jyk7XHJcblx0XHRcdGxldHRlckNvbnQuY3JlYXRlKDQ4KzQsMCwgJ2xldHRlcl9lbXB0eScpO1xyXG5cdFx0XHRsZXR0ZXJDb250LmNyZWF0ZSgoNDgrNCkqMiwwLCAnbGV0dGVyX2VtcHR5Jyk7XHJcblx0XHRcdGxldHRlckNvbnQuY3JlYXRlKCg0OCs0KSozLDAsICdsZXR0ZXJfZW1wdHknKTtcclxuXHRcdFx0bGV0dGVyQ29udC5jcmVhdGUoKDQ4KzQpKjQsMCwgJ2xldHRlcl9lbXB0eScpO1xyXG5cdFx0XHRsZXR0ZXJDb250LmNyZWF0ZSgoNDgrNCkqNSwwLCAnbGV0dGVyX2VtcHR5Jyk7XHJcblx0XHRcdGxldHRlckNvbnQuY3JlYXRlKCg0OCs0KSo2LDAsICdsZXR0ZXJfZW1wdHknKTtcclxuXHRcdFx0bGV0dGVyQ29udC5jcmVhdGUoKDQ4KzQpKjcsMCwgJ2xldHRlcl9lbXB0eScpO1xyXG5cdFx0XHRsZXR0ZXJDb250LmNyZWF0ZSgoNDgrNCkqOCwwLCAnbGV0dGVyX2VtcHR5Jyk7XHJcblx0XHRcdGxldHRlckNvbnQuY3JlYXRlKCg0OCs0KSo5LDAsICdsZXR0ZXJfZW1wdHknKTtcclxuXHRcdFx0bGV0dGVyQ29udC54ID0gMTUwO1xyXG5cdFx0XHRsZXR0ZXJDb250LnkgPSA2NTAtMTEwO1xyXG5cclxuXHRcdFx0Ly90aGlzLnBldC5sb2FkVGV4dHVyZSgncGV0X2JsYWNrX2hhdCcpO1xyXG5cdFx0IFx0Ly8gdmFyIGJ1dHRvbiA9IGdhbWUubWFrZS5idXR0b24oZ2FtZS53b3JsZC5jZW50ZXJYIC0gOTUsIDQwMCwgJ2J1dHRvbicsIHJlbW92ZUdyb3VwLCB0aGlzLCAyLCAxLCAwKTtcclxuXHJcblx0XHQgIC8vICAgYnV0dG9uLm9uSW5wdXRPdmVyLmFkZChvdmVyLCB0aGlzKTtcclxuXHRcdCAgLy8gICBidXR0b24ub25JbnB1dE91dC5hZGQob3V0LCB0aGlzKTtcclxuXHJcblx0XHQgIFx0Ly8gaXRlbS5ldmVudHMub25JbnB1dERvd24uYWRkKHNlbGVjdCk7XHJcbiAgICAgLy8gICAgXHRpdGVtLmV2ZW50cy5vbklucHV0VXAuYWRkKHJlbGVhc2UpO1xyXG4gICAgIC8vICAgIFx0aXRlbS5ldmVudHMub25JbnB1dE91dC5hZGQobW92ZU9mZik7XHJcblxyXG5cdFx0XHR2YXIgeG1sID0gcGhhc2VyLmNhY2hlLmdldFhNTCgnbGV2ZWwnKTtcclxuXHJcblx0XHRcdGxldCBjb3VudD0wO1xyXG5cdFx0XHR4bWwucXVlcnlTZWxlY3RvckFsbCgnY3Jvc3N3b3JkPndvcmQnKS5mb3JFYWNoKHdvcmQ9PntcclxuXHRcdFx0XHRjb25zb2xlLmxvZyh3b3JkKTtcclxuXHRcdFx0XHRsZXQgaW1nID0gd29yZC5xdWVyeVNlbGVjdG9yKCdpbWFnZTEnKS50ZXh0Q29udGVudDtcclxuXHRcdFx0XHRsZXQgbGFiZWwgPSB3b3JkLnF1ZXJ5U2VsZWN0b3IoJ3dvcmQnKS50ZXh0Q29udGVudDtcclxuXHRcdFx0XHRsZXQgcG9zID0ge1xyXG5cdFx0XHRcdFx0eDogcGFyc2VJbnQod29yZC5xdWVyeVNlbGVjdG9yKCd4cDEnKS50ZXh0Q29udGVudCkgKyAxLFxyXG5cdFx0XHRcdFx0eTogcGFyc2VJbnQod29yZC5xdWVyeVNlbGVjdG9yKCd5cDEnKS50ZXh0Q29udGVudCkgKyAxLFxyXG5cdFx0XHRcdFx0eDI6IHBhcnNlSW50KHdvcmQucXVlcnlTZWxlY3RvcigneHAyJykudGV4dENvbnRlbnQpICsgMSxcclxuXHRcdFx0XHRcdHkyOiBwYXJzZUludCh3b3JkLnF1ZXJ5U2VsZWN0b3IoJ3lwMicpLnRleHRDb250ZW50KSArIDFcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmKGltZyAmJiBsYWJlbCl7XHJcblx0XHQgICAgXHRcdC8vZGF0YVtsYWJlbF0gPSAncGljJysoKytjb3VudCk7XHJcblx0XHQgICAgXHRcdHBoYXNlci5sb2FkLmltYWdlKCdwaWMnKygrK2NvdW50KSwgYC4vZGF0YS9pbWdzLyR7aW1nfWApO1xyXG5cclxuXHRcdCAgICBcdFx0ZHJhd1JlY3QocG9zLngsIHBvcy55KTtcclxuXHRcdCAgICBcdFx0ZHJhd1JlY3QocG9zLngyLCBwb3MueTIsICcjMDBmZjAwJyk7XHJcblxyXG5cdFx0ICAgIFx0XHRsZXQgbGVuZ3RoID0gbGFiZWwubGVuZ3RoLTE7XHJcblx0XHQgICAgXHRcdGNvbnNvbGUubG9nKHBvcy54LCBwb3MueSwgcG9zLngyLCBwb3MueTIsIGxlbmd0aClcclxuXHRcdCAgICBcdFx0aWYocG9zLnggPT0gcG9zLngyKXtcclxuXHJcblx0XHQgICAgXHRcdFx0d2hpbGUoLS1sZW5ndGgpXHJcblx0XHQgICAgXHRcdFx0XHRkcmF3UmVjdChwb3MueCwgcG9zLnkgPCBwb3MueTI/IHBvcy55K2xlbmd0aCA6IHBvcy55IC0gbGVuZ3RoLCAnI2FhMDAwMCcpXHJcblx0XHQgICAgXHRcdH1lbHNle1xyXG5cdFx0ICAgIFx0XHRcdHdoaWxlKC0tbGVuZ3RoKVxyXG5cdFx0ICAgIFx0XHRcdFx0ZHJhd1JlY3QocG9zLnggPCBwb3MueDI/IHBvcy54K2xlbmd0aCA6IHBvcy54IC0gbGVuZ3RoLCBwb3MueSwgJyNhYTAwMDAnKVxyXG5cdFx0ICAgIFx0XHR9XHJcblx0XHQgICAgXHR9XHJcblx0XHQgICAgfSlcclxuXHJcblx0XHRcdHBoYXNlci5sb2FkLm9uTG9hZENvbXBsZXRlLmFkZCgoKT0+IHtcclxuXHRcdFx0XHQvL3ZhciBzID0gcGhhc2VyLmFkZC5zcHJpdGUoODAsIDAsICdwaWMxJyk7XHJcblx0XHRcdFx0bGV0IHMgPSBwaG90b0NvbnQuY3JlYXRlKDAsIDAsICdwaWMxJyk7XHJcblx0XHRcdFx0cy54ID0gNDtcclxuXHRcdFx0XHRzLnkgPSA0O1xyXG5cdFx0XHRcdHMuc2NhbGUuc2V0VG8oMC45OCwwLjk4KTtcclxuXHRcdFx0fSwgdGhpcyk7XHJcblxyXG5cdFx0XHRwaGFzZXIubG9hZC5zdGFydCgpO1xyXG5cclxuICAgIFx0XHQvL3Mucm90YXRpb24gPSAwLjE0O1xyXG4gICAgXHRcdC8vcy54PTA7XHJcbiAgICBcdFx0Ly9zLnk9MFxyXG4gICAgXHR9LFxyXG4gICAgXHR1cGRhdGU6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgXHR9LFxyXG4gICAgXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdC8vcGhhc2VyLmRlYnVnLnRleHQoJ0JJQkEgQklCQSBCSUJBJywgMzYwLCA5NiwgJ3JnYigyNTUsMCwwKScpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihwaGFzZXIpIHtcclxuXHRyZXR1cm57XHJcblx0XHRwcmVsb2FkOigpPT57XHJcblx0XHRcdHBoYXNlci5sb2FkLmltYWdlKCdiZycsICcuL2RhdGEvQmFja2dyb3VuZC5wbmcnKTsvL3QyXHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHQvL2d1aVxyXG5cdFx0XHRwaGFzZXIubG9hZC5pbWFnZSgnZ3VpX2dhbWVfYnRuJywgJy4vZGF0YS9CdXR0b25zTm9ybWFsLnBuZycpO1xyXG5cdFx0XHRwaGFzZXIubG9hZC5pbWFnZSgnZ3VpX2dhbWVfYnRuX292ZXInLCAnLi9kYXRhL0J1dHRvbnNPdmVyLnBuZycpO1xyXG5cdFx0fSxcclxuXHRcdGNyZWF0ZTooKT0+e1xyXG5cdFx0XHRwaGFzZXIuYWRkLnNwcml0ZSgwLCAwLCAnYmcnKTtcclxuXHJcblx0XHRcdGxldCBzdHlsZSA9IHsgZm9udDogXCIyNHB4IEFyaWFsXCIsIGZpbGw6IFwiIzAwMDAwMFwiLCBhbGlnbjogXCJjZW50ZXJcIiB9O1xyXG5cdFx0XHQvL2xldCBidG4gPSBwaGFzZXIuYWRkLmJ1dHRvbihwaGFzZXIud29ybGQuY2VudGVyWCAtIDk1LCBwaGFzZXIud29ybGQuY2VudGVyWSwgJ2d1aV9nYW1lX2J0bicsICgpPT57cGhhc2VyLnN0YXRlLnN0YXJ0KCdnYW1lJyk7fSwgdGhpcyk7XHJcblx0XHRcdGxldCBncm91cCA9IHBoYXNlci5hZGQuZ3JvdXAoKTtcclxuXHRcdFx0Z3JvdXAuaW5wdXRFbmFibGVDaGlsZHJlbiA9IHRydWU7XHJcblxyXG5cdFx0XHRncm91cC5jcmVhdGUoMCwwLCAnZ3VpX2dhbWVfYnRuJyk7XHJcblx0XHRcdGxldCBsYWJlbCA9IHBoYXNlci5hZGQudGV4dCgxMiwgMTIsIFwiU3RhcnRcIiwgc3R5bGUsIGdyb3VwKTtcclxuXHJcblx0XHRcdGdyb3VwLm9uQ2hpbGRJbnB1dERvd24uYWRkKCgpPT57cGhhc2VyLnN0YXRlLnN0YXJ0KCdnYW1lJyk7fSk7XHJcblxyXG5cdFx0XHRncm91cC54ID0gcGhhc2VyLndvcmxkLmNlbnRlclggLSA0NjtcclxuXHRcdFx0Z3JvdXAueSA9IHBoYXNlci53b3JsZC5jZW50ZXJZIC0gNDY7XHJcblx0XHRcdC8vIHZhciBidXR0b24gPSBnYW1lLm1ha2UuYnV0dG9uKGdhbWUud29ybGQuY2VudGVyWCAtIDk1LCA0MDAsICdidXR0b24nLCByZW1vdmVHcm91cCwgdGhpcywgMiwgMSwgMCk7XHJcblxyXG5cdFx0ICAvLyAgIGJ1dHRvbi5vbklucHV0T3Zlci5hZGQob3ZlciwgdGhpcyk7XHJcblx0XHQgIC8vICAgYnV0dG9uLm9uSW5wdXRPdXQuYWRkKG91dCwgdGhpcyk7XHJcblx0XHR9LFxyXG5cdFx0dXBkYXRlOigpPT57fSxcclxuXHRcdHJlbmRlcjooKT0+e31cclxuXHR9XHJcbn0iXX0=
