let field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let currentPlayer = 1;

/**
 * Получить значение поля
 * 
 * @return {number[][]}
 */
function getField() {
  return field;
}

/**
 * Делаем ход на поле. Если поле уже занято, то возвращаем false. 
 * Если всё успешно, то меняем текущего игрока и возвращаем true
 * 
 * @param {number} x номер столбца 
 * @param {number} y номер строки
 * @return {boolean}
 */
function makeMove(x, y) {
  if (field[y - 1][x - 1] !== 0) return false;

  field[y - 1][x - 1] = currentPlayer;
  currentPlayer = (currentPlayer === 1 ? 2 : 1);
  return true;
}

/**
 * Сбросить значение поля на пустое
 */
function reset() {
  field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
}

/**
 * Устанавливает новое значение для поля
 * 
 * @param {string} val поле в формате 000|000|000
 */
function presetField(newField) {
  field = newField;
}

/**
 * Изменить номер игрока
 * 
 * @param {number} i номер игрока 
 */
function setCurrentPlayer(i) {
  currentPlayer = i;
}

/**
 * Проверить победил ли какой-то игрок. Если да, то возвращает его номер. В противном случае false
 * 
 * @return { (number|false) }
 */
function getWinner() {
  for (let i = 0; i < 3; i++) {
    // Проверяем вертикали
    if ((field[0][i] === field[1][i] && field[1][i] === field[2][i])
    && field[1][i] !== '0') return field[2][i];  

    // Проверяем горизонтали
    if ((field[i][0] === field[i][1] && field[i][1] === field[i][2])
    && field[i][0] !== '0') return field[i][2];      
  }

  // Проверяем 1-ую диагональ
  if ((field[0][0] === field[1][1] && field[1][1] === field[2][2])
  && field[1][1] !== '0') return field[1][1];  

  // Проверяем 2-ую диагональ
  if ((field[2][0] === field[1][1] && field[1][1] === field[0][2])
  && field[1][1] !== '0') return field[1][1];  

  return false;
}

module.exports = {
  getField,
  makeMove,
  reset,
  presetField,
  setCurrentPlayer,
  getWinner,
}