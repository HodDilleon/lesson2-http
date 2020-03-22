const { Given, Then } = require('cucumber');
const assert = require('assert');
const request = require('supertest');

const controller = require('../src/game');
const app = require('../src/server');

let lastResult = {};

Given('пустое поле', () => {
	controller.reset();
});

Given('ходит игрок {int}', (i) => {
	controller.setCurrentPlayer(i);
});

Given('игрок ходит в клетку {int}, {int}', (x, y) => {
	return request(app)
		.post('/move')
		.send({ x, y })
		.then((res) => {
			lastResult = res;
		});
});

Then('поле становится {string}', function (string) {
	return request(app)
		.get('/getField')
		.then((res) => {
			// преобразуем массив в формат строки
			stringFormat = JSON.parse(res.text)
				.map(el => el.join(''))
				.join('|');
			assert.equal(stringFormat, string);
		})
});

Given('поле {string}', function (string) {
	// преобразуем строку в формат массива. Окончательные значения должны быть в числовом формате
	let arrFormat = string
		.split('|')
		.map(el => el.split('')
			.map(el => +el)
		)
	controller.presetField(arrFormat);
});

Then('возвращается ошибка', function () {
	if (lastResult.status !== 400) throw new Error('Ошибка не возвращается!')
});

Then('победил игрок {int}', function (int) {
	assert.equal(controller.getWinner(), int);
});