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
//start(key, clearWorld, clearCache, parameter)

},{"./states/game.js":3,"./states/mainMenu.js":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	create: function create(phaser, x, y, label) {
		var asset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'letter_empty';

		var bmp = phaser.add.bitmapData(32, 32);
		bmp.draw(asset, 0, 0, 32, 32);
		//    // draw to the canvas context like normal
		//    bmd.ctx.beginPath();
		//    bmd.ctx.rect(0,0,32,32);
		//    bmd.ctx.fillStyle = color;
		//    bmd.ctx.fill();

		// use the bitmap data as the texture for the sprite
		var style = { font: "24px Arial", fill: "#000000", align: "center" };
		//let btn = phaser.add.button(phaser.world.centerX - 95, phaser.world.centerY, 'gui_game_btn', ()=>{phaser.state.start('game');}, this);
		var group = phaser.add.group();
		//group.inputEnableChildren = true;
		group.create(0, 0, bmp);
		phaser.add.text(7, 3, label, style, group);

		group.x = x;
		group.y = y;

		return group; //48
	}
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = gameState;

var _letter = require('./../letters/letter.js');

var _letter2 = _interopRequireDefault(_letter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

					//drawRect(pos.x, pos.y);
					//drawRect(pos.x2, pos.y2, '#00ff00');
					var length = label.length - 1;
					console.log(pos.x, pos.y, pos.x2, pos.y2, length);

					_letter2.default.create(phaser, pos.x * 32, pos.y * 32, label[0]);
					_letter2.default.create(phaser, pos.x2 * 32, pos.y2 * 32, label[length]);

					if (pos.x == pos.x2) {

						while (--length) {
							_letter2.default.create(phaser, pos.x * 32, (pos.y < pos.y2 ? pos.y + length : pos.y - length) * 32, label[length]);
						}
					} else {
						while (--length) {
							_letter2.default.create(phaser, (pos.x < pos.x2 ? pos.x + length : pos.x - length) * 32, pos.y * 32, label[length]);
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

},{"./../letters/letter.js":2}],4:[function(require,module,exports){
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

									phaser.state.start('game'); // for test
						},
						update: function update() {},
						render: function render() {}
			};
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGFwcC5qcyIsInNyY1xcbGV0dGVyc1xcbGV0dGVyLmpzIiwic3JjXFxzdGF0ZXNcXGdhbWUuanMiLCJzcmNcXHN0YXRlc1xcbWFpbk1lbnUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUksU0FBUyxJQUFJLE9BQU8sSUFBWCxDQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixPQUFPLE1BQWpDLEVBQXlDLE1BQXpDLENBQWI7O0FBRUEsT0FBTyxLQUFQLENBQWEsR0FBYixDQUFpQixVQUFqQixFQUE2Qix3QkFBYyxNQUFkLENBQTdCO0FBQ0EsT0FBTyxLQUFQLENBQWEsR0FBYixDQUFpQixNQUFqQixFQUF5QixvQkFBVSxNQUFWLENBQXpCOztBQUVBLE9BQU8sS0FBUCxDQUFhLEtBQWIsQ0FBbUIsVUFBbkI7QUFDQTs7Ozs7Ozs7a0JDVGM7QUFDYixTQUFRLGdCQUFTLE1BQVQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsS0FBdkIsRUFBc0Q7QUFBQSxNQUF4QixLQUF3Qix1RUFBaEIsY0FBZ0I7O0FBQzdELE1BQUksTUFBTSxPQUFPLEdBQVAsQ0FBVyxVQUFYLENBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLENBQVY7QUFDQSxNQUFJLElBQUosQ0FBUyxLQUFULEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFRztBQUNBLE1BQUksUUFBUSxFQUFFLE1BQU0sWUFBUixFQUFzQixNQUFNLFNBQTVCLEVBQXVDLE9BQU8sUUFBOUMsRUFBWjtBQUNIO0FBQ0EsTUFBSSxRQUFRLE9BQU8sR0FBUCxDQUFXLEtBQVgsRUFBWjtBQUNBO0FBQ0EsUUFBTSxNQUFOLENBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixHQUFuQjtBQUNHLFNBQU8sR0FBUCxDQUFXLElBQVgsQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEM7O0FBRUEsUUFBTSxDQUFOLEdBQVUsQ0FBVjtBQUNBLFFBQU0sQ0FBTixHQUFVLENBQVY7O0FBRUEsU0FBTyxLQUFQLENBcEIwRCxDQW9CNUM7QUFDakI7QUF0QlksQzs7Ozs7Ozs7a0JDRVUsUzs7QUFGeEI7Ozs7OztBQUVlLFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQjtBQUN6QyxLQUFJLE9BQU8sRUFBWDs7QUFFQSxVQUFTLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBb0IsQ0FBcEIsRUFBdUM7QUFBQSxNQUFoQixLQUFnQix1RUFBVixTQUFVOztBQUN0QyxNQUFJLE1BQU0sT0FBTyxHQUFQLENBQVcsVUFBWCxDQUFzQixFQUF0QixFQUEwQixFQUExQixDQUFWO0FBQ0EsTUFBSSxJQUFKLENBQVMsY0FBVCxFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixFQUEvQixFQUFtQyxFQUFuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUc7QUFDQSxNQUFJLFNBQVMsT0FBTyxHQUFQLENBQVcsTUFBWCxDQUFrQixJQUFFLEVBQXBCLEVBQXdCLElBQUUsRUFBMUIsRUFBOEIsR0FBOUIsQ0FBYixDQVZtQyxDQVVjO0FBQ3BEOztBQUVELFFBQU87QUFDTixXQUFTLG1CQUFZO0FBQ3BCO0FBQ0EsVUFBTyxJQUFQLENBQVksS0FBWixDQUFrQixRQUFsQixFQUE0QiwwQkFBNUI7QUFDQSxVQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLGNBQWxCLEVBQWtDLHNCQUFsQzs7QUFFQTtBQUNBOztBQUVBLFVBQU8sSUFBUCxDQUFZLEdBQVosQ0FBZ0IsT0FBaEIsRUFBeUIsdUJBQXpCLEVBQWtELEtBQWxEO0FBRUEsR0FYSztBQVlOLFVBQVEsa0JBQVU7QUFDakIsVUFBTyxHQUFQLENBQVcsTUFBWCxDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixJQUF4Qjs7QUFFQSxPQUFJLFlBQVksT0FBTyxHQUFQLENBQVcsS0FBWCxFQUFoQjtBQUNBLGFBQVUsTUFBVixDQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFzQixRQUF0QjtBQUNBLGFBQVUsQ0FBVixHQUFjLE1BQUksR0FBbEI7QUFDQSxhQUFVLENBQVYsR0FBYyxFQUFkO0FBQ0E7OztBQUdBLE9BQUksVUFBVSxPQUFPLEdBQVAsQ0FBVyxLQUFYLEVBQWQ7QUFDQSxXQUFRLE1BQVIsQ0FBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW9CLGNBQXBCO0FBQ0EsV0FBUSxNQUFSLENBQWUsS0FBSyxFQUFwQixFQUF3QixDQUF4QixFQUEyQixjQUEzQjtBQUNBLFdBQVEsTUFBUixDQUFlLENBQUMsS0FBSyxFQUFOLElBQVUsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsY0FBL0I7QUFDQSxXQUFRLE1BQVIsQ0FBZSxDQUFDLEtBQUssRUFBTixJQUFVLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLGNBQS9CO0FBQ0EsV0FBUSxDQUFSLEdBQVksTUFBSSxHQUFoQjtBQUNBLFdBQVEsQ0FBUixHQUFZLEtBQUssR0FBTCxHQUFXLEVBQXZCO0FBQ0EsV0FBUSxLQUFSLENBQWMsS0FBZCxDQUFvQixJQUFwQixFQUEwQixJQUExQjs7QUFFQSxPQUFJLGFBQWEsT0FBTyxHQUFQLENBQVcsS0FBWCxFQUFqQjtBQUNBLGNBQVcsTUFBWCxDQUFrQixDQUFsQixFQUFvQixDQUFwQixFQUF1QixjQUF2QjtBQUNBLGNBQVcsTUFBWCxDQUFrQixLQUFHLENBQXJCLEVBQXVCLENBQXZCLEVBQTBCLGNBQTFCO0FBQ0EsY0FBVyxNQUFYLENBQWtCLENBQUMsS0FBRyxDQUFKLElBQU8sQ0FBekIsRUFBMkIsQ0FBM0IsRUFBOEIsY0FBOUI7QUFDQSxjQUFXLE1BQVgsQ0FBa0IsQ0FBQyxLQUFHLENBQUosSUFBTyxDQUF6QixFQUEyQixDQUEzQixFQUE4QixjQUE5QjtBQUNBLGNBQVcsTUFBWCxDQUFrQixDQUFDLEtBQUcsQ0FBSixJQUFPLENBQXpCLEVBQTJCLENBQTNCLEVBQThCLGNBQTlCO0FBQ0EsY0FBVyxNQUFYLENBQWtCLENBQUMsS0FBRyxDQUFKLElBQU8sQ0FBekIsRUFBMkIsQ0FBM0IsRUFBOEIsY0FBOUI7QUFDQSxjQUFXLE1BQVgsQ0FBa0IsQ0FBQyxLQUFHLENBQUosSUFBTyxDQUF6QixFQUEyQixDQUEzQixFQUE4QixjQUE5QjtBQUNBLGNBQVcsTUFBWCxDQUFrQixDQUFDLEtBQUcsQ0FBSixJQUFPLENBQXpCLEVBQTJCLENBQTNCLEVBQThCLGNBQTlCO0FBQ0EsY0FBVyxNQUFYLENBQWtCLENBQUMsS0FBRyxDQUFKLElBQU8sQ0FBekIsRUFBMkIsQ0FBM0IsRUFBOEIsY0FBOUI7QUFDQSxjQUFXLE1BQVgsQ0FBa0IsQ0FBQyxLQUFHLENBQUosSUFBTyxDQUF6QixFQUEyQixDQUEzQixFQUE4QixjQUE5QjtBQUNBLGNBQVcsQ0FBWCxHQUFlLEdBQWY7QUFDQSxjQUFXLENBQVgsR0FBZSxNQUFJLEdBQW5COztBQUVBO0FBQ0M7O0FBRUE7QUFDQTs7QUFFQztBQUNBO0FBQ0E7O0FBRUYsT0FBSSxNQUFNLE9BQU8sS0FBUCxDQUFhLE1BQWIsQ0FBb0IsT0FBcEIsQ0FBVjs7QUFFQSxPQUFJLFFBQU0sQ0FBVjtBQUNBLE9BQUksZ0JBQUosQ0FBcUIsZ0JBQXJCLEVBQXVDLE9BQXZDLENBQStDLGdCQUFNO0FBQ3BELFlBQVEsR0FBUixDQUFZLElBQVo7QUFDQSxRQUFJLE1BQU0sS0FBSyxhQUFMLENBQW1CLFFBQW5CLEVBQTZCLFdBQXZDO0FBQ0EsUUFBSSxRQUFRLEtBQUssYUFBTCxDQUFtQixNQUFuQixFQUEyQixXQUF2QztBQUNBLFFBQUksTUFBTTtBQUNULFFBQUcsU0FBUyxLQUFLLGFBQUwsQ0FBbUIsS0FBbkIsRUFBMEIsV0FBbkMsSUFBa0QsQ0FENUM7QUFFVCxRQUFHLFNBQVMsS0FBSyxhQUFMLENBQW1CLEtBQW5CLEVBQTBCLFdBQW5DLElBQWtELENBRjVDO0FBR1QsU0FBSSxTQUFTLEtBQUssYUFBTCxDQUFtQixLQUFuQixFQUEwQixXQUFuQyxJQUFrRCxDQUg3QztBQUlULFNBQUksU0FBUyxLQUFLLGFBQUwsQ0FBbUIsS0FBbkIsRUFBMEIsV0FBbkMsSUFBa0Q7QUFKN0MsS0FBVjs7QUFPQSxRQUFHLE9BQU8sS0FBVixFQUFnQjtBQUNaO0FBQ0EsWUFBTyxJQUFQLENBQVksS0FBWixDQUFrQixRQUFPLEVBQUUsS0FBM0IsbUJBQWtELEdBQWxEOztBQUVBO0FBQ0E7QUFDQSxTQUFJLFNBQVMsTUFBTSxNQUFOLEdBQWEsQ0FBMUI7QUFDQSxhQUFRLEdBQVIsQ0FBWSxJQUFJLENBQWhCLEVBQW1CLElBQUksQ0FBdkIsRUFBMEIsSUFBSSxFQUE5QixFQUFrQyxJQUFJLEVBQXRDLEVBQTBDLE1BQTFDOztBQUVBLHNCQUFPLE1BQVAsQ0FBYyxNQUFkLEVBQXNCLElBQUksQ0FBSixHQUFNLEVBQTVCLEVBQWdDLElBQUksQ0FBSixHQUFNLEVBQXRDLEVBQTBDLE1BQU0sQ0FBTixDQUExQztBQUNBLHNCQUFPLE1BQVAsQ0FBYyxNQUFkLEVBQXNCLElBQUksRUFBSixHQUFPLEVBQTdCLEVBQWlDLElBQUksRUFBSixHQUFPLEVBQXhDLEVBQTRDLE1BQU0sTUFBTixDQUE1Qzs7QUFFQSxTQUFHLElBQUksQ0FBSixJQUFTLElBQUksRUFBaEIsRUFBbUI7O0FBRWxCLGFBQU0sRUFBRSxNQUFSO0FBQ0Msd0JBQU8sTUFBUCxDQUFjLE1BQWQsRUFBc0IsSUFBSSxDQUFKLEdBQVEsRUFBOUIsRUFBa0MsQ0FBQyxJQUFJLENBQUosR0FBUSxJQUFJLEVBQVosR0FBZ0IsSUFBSSxDQUFKLEdBQU0sTUFBdEIsR0FBK0IsSUFBSSxDQUFKLEdBQVEsTUFBeEMsSUFBZ0QsRUFBbEYsRUFBc0YsTUFBTSxNQUFOLENBQXRGO0FBREQ7QUFFQSxNQUpELE1BSUs7QUFDSixhQUFNLEVBQUUsTUFBUjtBQUNDLHdCQUFPLE1BQVAsQ0FBYyxNQUFkLEVBQXNCLENBQUMsSUFBSSxDQUFKLEdBQVEsSUFBSSxFQUFaLEdBQWdCLElBQUksQ0FBSixHQUFNLE1BQXRCLEdBQStCLElBQUksQ0FBSixHQUFRLE1BQXhDLElBQWtELEVBQXhFLEVBQTRFLElBQUksQ0FBSixHQUFNLEVBQWxGLEVBQXNGLE1BQU0sTUFBTixDQUF0RjtBQUREO0FBRUE7QUFDRDtBQUNELElBaENKOztBQWtDQSxVQUFPLElBQVAsQ0FBWSxjQUFaLENBQTJCLEdBQTNCLENBQStCLFlBQUs7QUFDbkM7QUFDQSxRQUFJLElBQUksVUFBVSxNQUFWLENBQWlCLENBQWpCLEVBQW9CLENBQXBCLEVBQXVCLE1BQXZCLENBQVI7QUFDQSxNQUFFLENBQUYsR0FBTSxDQUFOO0FBQ0EsTUFBRSxDQUFGLEdBQU0sQ0FBTjtBQUNBLE1BQUUsS0FBRixDQUFRLEtBQVIsQ0FBYyxJQUFkLEVBQW1CLElBQW5CO0FBQ0EsSUFORCxFQU1HLElBTkg7O0FBUUEsVUFBTyxJQUFQLENBQVksS0FBWjs7QUFFRztBQUNBO0FBQ0E7QUFDQSxHQXpHRTtBQTBHSCxVQUFRLGtCQUFVLENBRWpCLENBNUdFO0FBNkdILFVBQVEsa0JBQVU7QUFDcEI7QUFDQTtBQS9HSyxFQUFQO0FBaUhBOzs7Ozs7Ozs7a0JDbkljLFVBQVMsTUFBVCxFQUFpQjtBQUMvQixVQUFNO0FBQ0wsZUFBUSxtQkFBSTtBQUNYLGdCQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLElBQWxCLEVBQXdCLHVCQUF4QixFQURXLENBQ3NDOztBQUVqRDtBQUNBLGdCQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLGNBQWxCLEVBQWtDLDBCQUFsQztBQUNBLGdCQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLG1CQUFsQixFQUF1Qyx3QkFBdkM7QUFDQSxPQVBJO0FBUUwsY0FBTyxrQkFBSTtBQUNWLGdCQUFPLEdBQVAsQ0FBVyxNQUFYLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCLElBQXhCOztBQUVBLGFBQUksUUFBUSxFQUFFLE1BQU0sWUFBUixFQUFzQixNQUFNLFNBQTVCLEVBQXVDLE9BQU8sUUFBOUMsRUFBWjtBQUNBO0FBQ0EsYUFBSSxRQUFRLE9BQU8sR0FBUCxDQUFXLEtBQVgsRUFBWjtBQUNBLGVBQU0sbUJBQU4sR0FBNEIsSUFBNUI7O0FBRUEsZUFBTSxNQUFOLENBQWEsQ0FBYixFQUFlLENBQWYsRUFBa0IsY0FBbEI7QUFDQSxhQUFJLFFBQVEsT0FBTyxHQUFQLENBQVcsSUFBWCxDQUFnQixFQUFoQixFQUFvQixFQUFwQixFQUF3QixPQUF4QixFQUFpQyxLQUFqQyxFQUF3QyxLQUF4QyxDQUFaOztBQUVBLGVBQU0sZ0JBQU4sQ0FBdUIsR0FBdkIsQ0FBMkIsWUFBSTtBQUFDLG1CQUFPLEtBQVAsQ0FBYSxLQUFiLENBQW1CLE1BQW5CO0FBQTRCLFVBQTVEOztBQUVBLGVBQU0sQ0FBTixHQUFVLE9BQU8sS0FBUCxDQUFhLE9BQWIsR0FBdUIsRUFBakM7QUFDQSxlQUFNLENBQU4sR0FBVSxPQUFPLEtBQVAsQ0FBYSxPQUFiLEdBQXVCLEVBQWpDO0FBQ0E7O0FBRUM7QUFDQTs7QUFFQyxnQkFBTyxLQUFQLENBQWEsS0FBYixDQUFtQixNQUFuQixFQXBCUSxDQW9Cb0I7QUFDOUIsT0E3Qkk7QUE4QkwsY0FBTyxrQkFBSSxDQUFFLENBOUJSO0FBK0JMLGNBQU8sa0JBQUksQ0FBRTtBQS9CUixJQUFOO0FBaUNBLEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IG1haW5NZW51U3RhdGUgZnJvbSAnLi9zdGF0ZXMvbWFpbk1lbnUuanMnXHJcbmltcG9ydCBnYW1lU3RhdGUgZnJvbSAnLi9zdGF0ZXMvZ2FtZS5qcydcclxuXHJcbmxldCBwaGFzZXIgPSBuZXcgUGhhc2VyLkdhbWUoNzYwLCA2NTAsIFBoYXNlci5DQU5WQVMsICdnYW1lJyk7XHJcblxyXG5waGFzZXIuc3RhdGUuYWRkKCdtYWluTWVudScsIG1haW5NZW51U3RhdGUocGhhc2VyKSk7XHJcbnBoYXNlci5zdGF0ZS5hZGQoJ2dhbWUnLCBnYW1lU3RhdGUocGhhc2VyKSk7XHJcblxyXG5waGFzZXIuc3RhdGUuc3RhcnQoJ21haW5NZW51Jyk7XHJcbi8vc3RhcnQoa2V5LCBjbGVhcldvcmxkLCBjbGVhckNhY2hlLCBwYXJhbWV0ZXIpIiwiZXhwb3J0IGRlZmF1bHR7XHJcblx0Y3JlYXRlOiBmdW5jdGlvbihwaGFzZXIsIHgsIHksIGxhYmVsLCBhc3NldCA9ICdsZXR0ZXJfZW1wdHknKSB7XHJcblx0XHRsZXQgYm1wID0gcGhhc2VyLmFkZC5iaXRtYXBEYXRhKDMyLCAzMik7XHJcblx0XHRibXAuZHJhdyhhc3NldCwgMCwgMCwgMzIsIDMyKTtcclxuXHQgLy8gICAgLy8gZHJhdyB0byB0aGUgY2FudmFzIGNvbnRleHQgbGlrZSBub3JtYWxcclxuXHQgLy8gICAgYm1kLmN0eC5iZWdpblBhdGgoKTtcclxuXHQgLy8gICAgYm1kLmN0eC5yZWN0KDAsMCwzMiwzMik7XHJcblx0IC8vICAgIGJtZC5jdHguZmlsbFN0eWxlID0gY29sb3I7XHJcblx0IC8vICAgIGJtZC5jdHguZmlsbCgpO1xyXG5cclxuXHQgICAgLy8gdXNlIHRoZSBiaXRtYXAgZGF0YSBhcyB0aGUgdGV4dHVyZSBmb3IgdGhlIHNwcml0ZVxyXG5cdCAgICBsZXQgc3R5bGUgPSB7IGZvbnQ6IFwiMjRweCBBcmlhbFwiLCBmaWxsOiBcIiMwMDAwMDBcIiwgYWxpZ246IFwiY2VudGVyXCIgfTtcclxuXHRcdC8vbGV0IGJ0biA9IHBoYXNlci5hZGQuYnV0dG9uKHBoYXNlci53b3JsZC5jZW50ZXJYIC0gOTUsIHBoYXNlci53b3JsZC5jZW50ZXJZLCAnZ3VpX2dhbWVfYnRuJywgKCk9PntwaGFzZXIuc3RhdGUuc3RhcnQoJ2dhbWUnKTt9LCB0aGlzKTtcclxuXHRcdGxldCBncm91cCA9IHBoYXNlci5hZGQuZ3JvdXAoKTtcclxuXHRcdC8vZ3JvdXAuaW5wdXRFbmFibGVDaGlsZHJlbiA9IHRydWU7XHJcblx0XHRncm91cC5jcmVhdGUoMCwgMCwgYm1wKTtcclxuXHQgICAgcGhhc2VyLmFkZC50ZXh0KDcsIDMsIGxhYmVsLCBzdHlsZSwgZ3JvdXApO1xyXG5cclxuXHQgICAgZ3JvdXAueCA9IHg7XHJcblx0ICAgIGdyb3VwLnkgPSB5O1xyXG5cclxuXHQgICAgcmV0dXJuIGdyb3VwOyAvLzQ4XHJcblx0fVxyXG59IiwiaW1wb3J0IGxldHRlciBmcm9tICcuLy4uL2xldHRlcnMvbGV0dGVyLmpzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2FtZVN0YXRlKHBoYXNlcikge1xyXG5cdGxldCBkYXRhID0ge31cclxuXHJcblx0ZnVuY3Rpb24gZHJhd1JlY3QoeCx5LCBjb2xvcj0nI2ZmMDAwMCcpe1xyXG5cdFx0dmFyIGJtcCA9IHBoYXNlci5hZGQuYml0bWFwRGF0YSgzMiwgMzIpO1xyXG5cdFx0Ym1wLmRyYXcoJ2xldHRlcl9lbXB0eScsIDAsIDAsIDMyLCAzMik7XHJcblx0IC8vICAgIC8vIGRyYXcgdG8gdGhlIGNhbnZhcyBjb250ZXh0IGxpa2Ugbm9ybWFsXHJcblx0IC8vICAgIGJtZC5jdHguYmVnaW5QYXRoKCk7XHJcblx0IC8vICAgIGJtZC5jdHgucmVjdCgwLDAsMzIsMzIpO1xyXG5cdCAvLyAgICBibWQuY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG5cdCAvLyAgICBibWQuY3R4LmZpbGwoKTtcclxuXHJcblx0ICAgIC8vIHVzZSB0aGUgYml0bWFwIGRhdGEgYXMgdGhlIHRleHR1cmUgZm9yIHRoZSBzcHJpdGVcclxuXHQgICAgdmFyIHNwcml0ZSA9IHBoYXNlci5hZGQuc3ByaXRlKHgqMzIsIHkqMzIsIGJtcCk7IC8vNDhcclxuXHR9XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRwcmVsb2FkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdC8vcGhhc2VyLmxvYWQuaW1hZ2UoJ2JnJywgJy4vZGF0YS9CYWNrZ3JvdW5kLnBuZycpOy8vdDJcclxuXHRcdFx0cGhhc2VyLmxvYWQuaW1hZ2UoJ2JnX2ZvdCcsICcuL2RhdGEvQmFja2dyb3VuZEZvdC5wbmcnKTtcclxuXHRcdFx0cGhhc2VyLmxvYWQuaW1hZ2UoJ2xldHRlcl9lbXB0eScsICcuL2RhdGEvTGV0dGVyOHg4LnBuZycpO1xyXG5cclxuXHRcdFx0Ly9ndWlcclxuXHRcdFx0Ly9waGFzZXIubG9hZC5pbWFnZSgnZ3VpX2dhbWVfYnRuJywgJy4vZGF0YS9CdXR0b25zTm9ybWFsLnBuZycpO1xyXG5cclxuXHRcdFx0cGhhc2VyLmxvYWQueG1sKCdsZXZlbCcsICcuL2RhdGEvbGV2ZWxzLzkwMS54bWwnLCBmYWxzZSk7XHJcblxyXG5cdFx0fSxcclxuXHRcdGNyZWF0ZTogZnVuY3Rpb24oKXtcclxuXHRcdFx0cGhhc2VyLmFkZC5zcHJpdGUoMCwgMCwgJ2JnJyk7XHJcblxyXG5cdFx0XHRsZXQgcGhvdG9Db250ID0gcGhhc2VyLmFkZC5ncm91cCgpO1xyXG5cdFx0XHRwaG90b0NvbnQuY3JlYXRlKDAsMCwgJ2JnX2ZvdCcpO1xyXG5cdFx0XHRwaG90b0NvbnQueCA9IDc1MC0zMDQ7XHJcblx0XHRcdHBob3RvQ29udC55ID0gNzA7XHJcblx0XHRcdC8vcGhhc2VyLmFkZC5zcHJpdGUoNzUwLTMwNCwgMCwgJ2JnX2ZvdCcpOyAvLzMwNFxyXG5cclxuXHJcblx0XHRcdGxldCBidG5Db250ID0gcGhhc2VyLmFkZC5ncm91cCgpO1xyXG5cdFx0XHRidG5Db250LmNyZWF0ZSgwLDAsICdndWlfZ2FtZV9idG4nKTtcclxuXHRcdFx0YnRuQ29udC5jcmVhdGUoOTYgKyAxMiwgMCwgJ2d1aV9nYW1lX2J0bicpO1xyXG5cdFx0XHRidG5Db250LmNyZWF0ZSgoOTYgKyAxMikqMiwgMCwgJ2d1aV9nYW1lX2J0bicpO1xyXG5cdFx0XHRidG5Db250LmNyZWF0ZSgoOTYgKyAxMikqMywgMCwgJ2d1aV9nYW1lX2J0bicpO1xyXG5cdFx0XHRidG5Db250LnggPSA3NTAtMzA0O1xyXG5cdFx0XHRidG5Db250LnkgPSA3MCArIDMwNCArIDE0O1xyXG5cdFx0XHRidG5Db250LnNjYWxlLnNldFRvKDAuNzIsIDAuNzIpO1xyXG5cclxuXHRcdFx0bGV0IGxldHRlckNvbnQgPSBwaGFzZXIuYWRkLmdyb3VwKCk7XHJcblx0XHRcdGxldHRlckNvbnQuY3JlYXRlKDAsMCwgJ2xldHRlcl9lbXB0eScpO1xyXG5cdFx0XHRsZXR0ZXJDb250LmNyZWF0ZSg0OCs0LDAsICdsZXR0ZXJfZW1wdHknKTtcclxuXHRcdFx0bGV0dGVyQ29udC5jcmVhdGUoKDQ4KzQpKjIsMCwgJ2xldHRlcl9lbXB0eScpO1xyXG5cdFx0XHRsZXR0ZXJDb250LmNyZWF0ZSgoNDgrNCkqMywwLCAnbGV0dGVyX2VtcHR5Jyk7XHJcblx0XHRcdGxldHRlckNvbnQuY3JlYXRlKCg0OCs0KSo0LDAsICdsZXR0ZXJfZW1wdHknKTtcclxuXHRcdFx0bGV0dGVyQ29udC5jcmVhdGUoKDQ4KzQpKjUsMCwgJ2xldHRlcl9lbXB0eScpO1xyXG5cdFx0XHRsZXR0ZXJDb250LmNyZWF0ZSgoNDgrNCkqNiwwLCAnbGV0dGVyX2VtcHR5Jyk7XHJcblx0XHRcdGxldHRlckNvbnQuY3JlYXRlKCg0OCs0KSo3LDAsICdsZXR0ZXJfZW1wdHknKTtcclxuXHRcdFx0bGV0dGVyQ29udC5jcmVhdGUoKDQ4KzQpKjgsMCwgJ2xldHRlcl9lbXB0eScpO1xyXG5cdFx0XHRsZXR0ZXJDb250LmNyZWF0ZSgoNDgrNCkqOSwwLCAnbGV0dGVyX2VtcHR5Jyk7XHJcblx0XHRcdGxldHRlckNvbnQueCA9IDE1MDtcclxuXHRcdFx0bGV0dGVyQ29udC55ID0gNjUwLTExMDtcclxuXHJcblx0XHRcdC8vdGhpcy5wZXQubG9hZFRleHR1cmUoJ3BldF9ibGFja19oYXQnKTtcclxuXHRcdCBcdC8vIHZhciBidXR0b24gPSBnYW1lLm1ha2UuYnV0dG9uKGdhbWUud29ybGQuY2VudGVyWCAtIDk1LCA0MDAsICdidXR0b24nLCByZW1vdmVHcm91cCwgdGhpcywgMiwgMSwgMCk7XHJcblxyXG5cdFx0ICAvLyAgIGJ1dHRvbi5vbklucHV0T3Zlci5hZGQob3ZlciwgdGhpcyk7XHJcblx0XHQgIC8vICAgYnV0dG9uLm9uSW5wdXRPdXQuYWRkKG91dCwgdGhpcyk7XHJcblxyXG5cdFx0ICBcdC8vIGl0ZW0uZXZlbnRzLm9uSW5wdXREb3duLmFkZChzZWxlY3QpO1xyXG4gICAgIC8vICAgIFx0aXRlbS5ldmVudHMub25JbnB1dFVwLmFkZChyZWxlYXNlKTtcclxuICAgICAvLyAgICBcdGl0ZW0uZXZlbnRzLm9uSW5wdXRPdXQuYWRkKG1vdmVPZmYpO1xyXG5cclxuXHRcdFx0dmFyIHhtbCA9IHBoYXNlci5jYWNoZS5nZXRYTUwoJ2xldmVsJyk7XHJcblxyXG5cdFx0XHRsZXQgY291bnQ9MDtcclxuXHRcdFx0eG1sLnF1ZXJ5U2VsZWN0b3JBbGwoJ2Nyb3Nzd29yZD53b3JkJykuZm9yRWFjaCh3b3JkPT57XHJcblx0XHRcdFx0Y29uc29sZS5sb2cod29yZCk7XHJcblx0XHRcdFx0bGV0IGltZyA9IHdvcmQucXVlcnlTZWxlY3RvcignaW1hZ2UxJykudGV4dENvbnRlbnQ7XHJcblx0XHRcdFx0bGV0IGxhYmVsID0gd29yZC5xdWVyeVNlbGVjdG9yKCd3b3JkJykudGV4dENvbnRlbnQ7XHJcblx0XHRcdFx0bGV0IHBvcyA9IHtcclxuXHRcdFx0XHRcdHg6IHBhcnNlSW50KHdvcmQucXVlcnlTZWxlY3RvcigneHAxJykudGV4dENvbnRlbnQpICsgMSxcclxuXHRcdFx0XHRcdHk6IHBhcnNlSW50KHdvcmQucXVlcnlTZWxlY3RvcigneXAxJykudGV4dENvbnRlbnQpICsgMSxcclxuXHRcdFx0XHRcdHgyOiBwYXJzZUludCh3b3JkLnF1ZXJ5U2VsZWN0b3IoJ3hwMicpLnRleHRDb250ZW50KSArIDEsXHJcblx0XHRcdFx0XHR5MjogcGFyc2VJbnQod29yZC5xdWVyeVNlbGVjdG9yKCd5cDInKS50ZXh0Q29udGVudCkgKyAxXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihpbWcgJiYgbGFiZWwpe1xyXG5cdFx0ICAgIFx0XHQvL2RhdGFbbGFiZWxdID0gJ3BpYycrKCsrY291bnQpO1xyXG5cdFx0ICAgIFx0XHRwaGFzZXIubG9hZC5pbWFnZSgncGljJysoKytjb3VudCksIGAuL2RhdGEvaW1ncy8ke2ltZ31gKTtcclxuXHJcblx0XHQgICAgXHRcdC8vZHJhd1JlY3QocG9zLngsIHBvcy55KTtcclxuXHRcdCAgICBcdFx0Ly9kcmF3UmVjdChwb3MueDIsIHBvcy55MiwgJyMwMGZmMDAnKTtcclxuXHRcdCAgICBcdFx0bGV0IGxlbmd0aCA9IGxhYmVsLmxlbmd0aC0xO1xyXG5cdFx0ICAgIFx0XHRjb25zb2xlLmxvZyhwb3MueCwgcG9zLnksIHBvcy54MiwgcG9zLnkyLCBsZW5ndGgpXHJcblxyXG5cdFx0ICAgIFx0XHRsZXR0ZXIuY3JlYXRlKHBoYXNlciwgcG9zLngqMzIsIHBvcy55KjMyLCBsYWJlbFswXSk7XHJcblx0XHQgICAgXHRcdGxldHRlci5jcmVhdGUocGhhc2VyLCBwb3MueDIqMzIsIHBvcy55MiozMiwgbGFiZWxbbGVuZ3RoXSk7XHJcblxyXG5cdFx0ICAgIFx0XHRpZihwb3MueCA9PSBwb3MueDIpe1xyXG5cclxuXHRcdCAgICBcdFx0XHR3aGlsZSgtLWxlbmd0aClcclxuXHRcdCAgICBcdFx0XHRcdGxldHRlci5jcmVhdGUocGhhc2VyLCBwb3MueCAqIDMyLCAocG9zLnkgPCBwb3MueTI/IHBvcy55K2xlbmd0aCA6IHBvcy55IC0gbGVuZ3RoKSozMiwgbGFiZWxbbGVuZ3RoXSlcclxuXHRcdCAgICBcdFx0fWVsc2V7XHJcblx0XHQgICAgXHRcdFx0d2hpbGUoLS1sZW5ndGgpXHJcblx0XHQgICAgXHRcdFx0XHRsZXR0ZXIuY3JlYXRlKHBoYXNlciwgKHBvcy54IDwgcG9zLngyPyBwb3MueCtsZW5ndGggOiBwb3MueCAtIGxlbmd0aCkgKiAzMiwgcG9zLnkqMzIsIGxhYmVsW2xlbmd0aF0pXHJcblx0XHQgICAgXHRcdH1cclxuXHRcdCAgICBcdH1cclxuXHRcdCAgICB9KVxyXG5cclxuXHRcdFx0cGhhc2VyLmxvYWQub25Mb2FkQ29tcGxldGUuYWRkKCgpPT4ge1xyXG5cdFx0XHRcdC8vdmFyIHMgPSBwaGFzZXIuYWRkLnNwcml0ZSg4MCwgMCwgJ3BpYzEnKTtcclxuXHRcdFx0XHRsZXQgcyA9IHBob3RvQ29udC5jcmVhdGUoMCwgMCwgJ3BpYzEnKTtcclxuXHRcdFx0XHRzLnggPSA0O1xyXG5cdFx0XHRcdHMueSA9IDQ7XHJcblx0XHRcdFx0cy5zY2FsZS5zZXRUbygwLjk4LDAuOTgpO1xyXG5cdFx0XHR9LCB0aGlzKTtcclxuXHJcblx0XHRcdHBoYXNlci5sb2FkLnN0YXJ0KCk7XHJcblxyXG4gICAgXHRcdC8vcy5yb3RhdGlvbiA9IDAuMTQ7XHJcbiAgICBcdFx0Ly9zLng9MDtcclxuICAgIFx0XHQvL3MueT0wXHJcbiAgICBcdH0sXHJcbiAgICBcdHVwZGF0ZTogZnVuY3Rpb24oKXtcclxuXHJcbiAgICBcdH0sXHJcbiAgICBcdHJlbmRlcjogZnVuY3Rpb24oKXtcclxuXHRcdFx0Ly9waGFzZXIuZGVidWcudGV4dCgnQklCQSBCSUJBIEJJQkEnLCAzNjAsIDk2LCAncmdiKDI1NSwwLDApJyk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHBoYXNlcikge1xyXG5cdHJldHVybntcclxuXHRcdHByZWxvYWQ6KCk9PntcclxuXHRcdFx0cGhhc2VyLmxvYWQuaW1hZ2UoJ2JnJywgJy4vZGF0YS9CYWNrZ3JvdW5kLnBuZycpOy8vdDJcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdC8vZ3VpXHJcblx0XHRcdHBoYXNlci5sb2FkLmltYWdlKCdndWlfZ2FtZV9idG4nLCAnLi9kYXRhL0J1dHRvbnNOb3JtYWwucG5nJyk7XHJcblx0XHRcdHBoYXNlci5sb2FkLmltYWdlKCdndWlfZ2FtZV9idG5fb3ZlcicsICcuL2RhdGEvQnV0dG9uc092ZXIucG5nJyk7XHJcblx0XHR9LFxyXG5cdFx0Y3JlYXRlOigpPT57XHJcblx0XHRcdHBoYXNlci5hZGQuc3ByaXRlKDAsIDAsICdiZycpO1xyXG5cclxuXHRcdFx0bGV0IHN0eWxlID0geyBmb250OiBcIjI0cHggQXJpYWxcIiwgZmlsbDogXCIjMDAwMDAwXCIsIGFsaWduOiBcImNlbnRlclwiIH07XHJcblx0XHRcdC8vbGV0IGJ0biA9IHBoYXNlci5hZGQuYnV0dG9uKHBoYXNlci53b3JsZC5jZW50ZXJYIC0gOTUsIHBoYXNlci53b3JsZC5jZW50ZXJZLCAnZ3VpX2dhbWVfYnRuJywgKCk9PntwaGFzZXIuc3RhdGUuc3RhcnQoJ2dhbWUnKTt9LCB0aGlzKTtcclxuXHRcdFx0bGV0IGdyb3VwID0gcGhhc2VyLmFkZC5ncm91cCgpO1xyXG5cdFx0XHRncm91cC5pbnB1dEVuYWJsZUNoaWxkcmVuID0gdHJ1ZTtcclxuXHJcblx0XHRcdGdyb3VwLmNyZWF0ZSgwLDAsICdndWlfZ2FtZV9idG4nKTtcclxuXHRcdFx0bGV0IGxhYmVsID0gcGhhc2VyLmFkZC50ZXh0KDEyLCAxMiwgXCJTdGFydFwiLCBzdHlsZSwgZ3JvdXApO1xyXG5cclxuXHRcdFx0Z3JvdXAub25DaGlsZElucHV0RG93bi5hZGQoKCk9PntwaGFzZXIuc3RhdGUuc3RhcnQoJ2dhbWUnKTt9KTtcclxuXHJcblx0XHRcdGdyb3VwLnggPSBwaGFzZXIud29ybGQuY2VudGVyWCAtIDQ2O1xyXG5cdFx0XHRncm91cC55ID0gcGhhc2VyLndvcmxkLmNlbnRlclkgLSA0NjtcclxuXHRcdFx0Ly8gdmFyIGJ1dHRvbiA9IGdhbWUubWFrZS5idXR0b24oZ2FtZS53b3JsZC5jZW50ZXJYIC0gOTUsIDQwMCwgJ2J1dHRvbicsIHJlbW92ZUdyb3VwLCB0aGlzLCAyLCAxLCAwKTtcclxuXHJcblx0XHQgIC8vICAgYnV0dG9uLm9uSW5wdXRPdmVyLmFkZChvdmVyLCB0aGlzKTtcclxuXHRcdCAgLy8gICBidXR0b24ub25JbnB1dE91dC5hZGQob3V0LCB0aGlzKTtcclxuXHJcblx0XHQgIFx0cGhhc2VyLnN0YXRlLnN0YXJ0KCdnYW1lJyk7IC8vIGZvciB0ZXN0XHJcblx0XHR9LFxyXG5cdFx0dXBkYXRlOigpPT57fSxcclxuXHRcdHJlbmRlcjooKT0+e31cclxuXHR9XHJcbn0iXX0=
