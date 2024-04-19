import Game from './game';
import Dice from '../dice/dice';

const DICE_CONFIG = [
  ['d', 'e', 'i', 'l', 'r', 'x'],
  ['h', 'l', 'n', 'n', 'r', 'z'],
  ['d', 'e', 'l', 'r', 'v', 'y'],
  ['e', 'l', 'r', 't', 't', 'y'],
  ['e', 'h', 'r', 't', 'v', 'w'],
  ['e', 'e', 'g', 'h', 'n', 'w'],
  ['a', 'a', 'e', 'e', 'g', 'n'],
  ['a', 'o', 'o', 't', 't', 'w'],
  ['e', 'i', 'o', 's', 's', 't'],
  ['e', 'e', 'i', 'n', 's', 'u'],
  ['d', 'i', 's', 't', 't', 'y'],
  ['a', 'f', 'f', 'k', 'p', 's'],
  ['a', 'c', 'h', 'o', 'p', 's'],
  ['c', 'i', 'm', 'o', 't', 'u'],
  ['h', 'i', 'm', 'n', 'q', 'u'],
  ['a', 'b', 'b', 'j', 'o', 'o'],
];

let sampleDices = DICE_CONFIG.map((dice) => new Dice(dice));

test('create new game', () => {
  let game = new Game();
  expect(game).toHaveProperty('dices');
  expect(game).toHaveProperty('totalScore');
  expect(game).toHaveProperty('answers');
  expect(game).toHaveProperty('validator');
  expect(game.dices).toHaveLength(16);
  expect(game.dices).toEqual(expect.arrayContaining(sampleDices));
  expect(game.dices[0].adjecents).toHaveLength(0);
});

test('_populateBoard', () => {
  let game = new Game();
  game._populateBoard();
  expect(game.dices[0].adjecents).toHaveLength(3);
  expect(game.dices[1].adjecents).toHaveLength(5);
  expect(game.dices[2].adjecents).toHaveLength(5);
  expect(game.dices[3].adjecents).toHaveLength(3);
  expect(game.dices[4].adjecents).toHaveLength(5);
  expect(game.dices[5].adjecents).toHaveLength(8);
  expect(game.dices[6].adjecents).toHaveLength(8);
  expect(game.dices[7].adjecents).toHaveLength(5);
  expect(game.dices[8].adjecents).toHaveLength(5);
  expect(game.dices[9].adjecents).toHaveLength(8);
  expect(game.dices[10].adjecents).toHaveLength(8);
  expect(game.dices[11].adjecents).toHaveLength(5);
  expect(game.dices[12].adjecents).toHaveLength(3);
  expect(game.dices[13].adjecents).toHaveLength(5);
  expect(game.dices[14].adjecents).toHaveLength(5);
  expect(game.dices[15].adjecents).toHaveLength(3);
});

test('_addWildCards', () => {
  let game = new Game();
  game._addWildCards(2);
  let wildCards = game.dices.filter((dice) => dice.word === '*');
  expect(wildCards.length).toBe(2);
});

