import Dice from './dice';

let createDices = () => {
  return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'].map((item) => {
    return new Dice([item]);
  });
};

test('creation of new dice', () => {
  let letters = ['a', 'b', 'c', 'd'];
  let dice = new Dice(letters);
  expect(dice).toHaveProperty('letters');
  expect(dice).toHaveProperty('word');
  expect(dice.word).toBe(letters[0]);
});

test('rollDice', () => {
  let letters = ['a', 'b', 'c', 'd'];
  let dice = new Dice(letters);
  dice.rollDice();
  expect(letters).toContain(dice.word);
});

test('populateAdjacentDices - conner position - position 0', () => {
  let dices = createDices();
  dices[0].populateAdjacentDices(0, dices);
  expect(dices[0].adjecents).toHaveLength(3);
  expect(dices[0].adjecents).toEqual(expect.arrayContaining([
    dices[1], dices[4], dices[5],
  ]));
});

test('populateAdjacentDices  - conner position - position 3', () => {
  let dices = createDices();
  dices[3].populateAdjacentDices(3, dices);
  expect(dices[3].adjecents).toHaveLength(3);
  expect(dices[3].adjecents).toEqual(expect.arrayContaining([
    dices[2], dices[7], dices[6],
  ]));
});

test('populateAdjacentDices  - conner position - position 12', () => {
  let dices = createDices();
  dices[12].populateAdjacentDices(12, dices);
  expect(dices[12].adjecents).toHaveLength(3);
  expect(dices[12].adjecents).toEqual(expect.arrayContaining([
    dices[13], dices[8], dices[9],
  ]));
});

test('populateAdjacentDices  - conner position - position 15', () => {
  let dices = createDices();
  dices[15].populateAdjacentDices(15, dices);
  expect(dices[15].adjecents).toHaveLength(3);
  expect(dices[15].adjecents).toEqual(expect.arrayContaining([
    dices[14], dices[11], dices[10],
  ]));
});

test('populateAdjacentDices  - top position - position 1', () => {
  let dices = createDices();
  dices[1].populateAdjacentDices(1, dices);
  expect(dices[1].adjecents).toHaveLength(5);
  expect(dices[1].adjecents).toEqual(expect.arrayContaining([
    dices[0], dices[2], dices[4], dices[5], dices[6],
  ]));
});

test('populateAdjacentDices  - top position - position 2', () => {
  let dices = createDices();
  dices[2].populateAdjacentDices(2, dices);
  expect(dices[2].adjecents).toHaveLength(5);
  expect(dices[2].adjecents).toEqual(expect.arrayContaining([
    dices[1], dices[3], dices[5], dices[6], dices[7],
  ]));
});

test('populateAdjacentDices  - left position - position 4', () => {
  let dices = createDices();
  dices[4].populateAdjacentDices(4, dices);
  expect(dices[4].adjecents).toHaveLength(5);
  expect(dices[4].adjecents).toEqual(expect.arrayContaining([
    dices[0], dices[1], dices[5], dices[8], dices[9],
  ]));
});

test('populateAdjacentDices  - left position - position 8', () => {
  let dices = createDices();
  dices[8].populateAdjacentDices(8, dices);
  expect(dices[8].adjecents).toHaveLength(5);
  expect(dices[8].adjecents).toEqual(expect.arrayContaining([
    dices[4], dices[5], dices[9], dices[12], dices[13],
  ]));
});

test('populateAdjacentDices  - right position - position 7', () => {
  let dices = createDices();
  dices[7].populateAdjacentDices(7, dices);
  expect(dices[7].adjecents).toHaveLength(5);
  expect(dices[7].adjecents).toEqual(expect.arrayContaining([
    dices[2], dices[3], dices[6], dices[10], dices[11],
  ]));
});

test('populateAdjacentDices  - right position - position 11', () => {
  let dices = createDices();
  dices[11].populateAdjacentDices(11, dices);
  expect(dices[11].adjecents).toHaveLength(5);
  expect(dices[11].adjecents).toEqual(expect.arrayContaining([
    dices[6], dices[7], dices[10], dices[14], dices[15],
  ]));
});

test('populateAdjacentDices  - bottom position - position 13', () => {
  let dices = createDices();
  dices[13].populateAdjacentDices(13, dices);
  expect(dices[13].adjecents).toHaveLength(5);
  expect(dices[13].adjecents).toEqual(expect.arrayContaining([
    dices[8], dices[9], dices[10], dices[12], dices[14],
  ]));
});

test('populateAdjacentDices  - bottom position - position 14', () => {
  let dices = createDices();
  dices[14].populateAdjacentDices(14, dices);
  expect(dices[14].adjecents).toHaveLength(5);
  expect(dices[14].adjecents).toEqual(expect.arrayContaining([
    dices[9], dices[10], dices[11], dices[13], dices[15],
  ]));
});

test('populateAdjacentDices  - center position - position 5', () => {
  let dices = createDices();
  dices[5].populateAdjacentDices(5, dices);
  expect(dices[5].adjecents).toHaveLength(8);
  expect(dices[5].adjecents).toEqual(expect.arrayContaining([
    dices[0], dices[1], dices[2], dices[4], dices[6], dices[8], dices[9], dices[10]
  ]));
});

test('populateAdjacentDices  - center position - position 6', () => {
  let dices = createDices();
  dices[6].populateAdjacentDices(6, dices);
  expect(dices[6].adjecents).toHaveLength(8);
  expect(dices[6].adjecents).toEqual(expect.arrayContaining([
    dices[1], dices[2], dices[3], dices[5], dices[7], dices[9], dices[10], dices[11]
  ]));
});

test('populateAdjacentDices  - center position - position 9', () => {
  let dices = createDices();
  dices[9].populateAdjacentDices(9, dices);
  expect(dices[9].adjecents).toHaveLength(8);
  expect(dices[9].adjecents).toEqual(expect.arrayContaining([
    dices[4], dices[5], dices[6], dices[8], dices[10], dices[12], dices[13], dices[14]
  ]));
});

test('populateAdjacentDices  - center position - position 10', () => {
  let dices = createDices();
  dices[10].populateAdjacentDices(10, dices);
  expect(dices[10].adjecents).toHaveLength(8);
  expect(dices[10].adjecents).toEqual(expect.arrayContaining([
    dices[5], dices[6], dices[7], dices[9], dices[11], dices[13], dices[14], dices[15]
  ]));
});
