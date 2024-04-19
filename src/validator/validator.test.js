import TextValidator from './validator';
import Dice from "../model/dice/dice";

let createDices = () => {
  let dices = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'].map((item) => {
    return new Dice([item]);
  });
  dices.forEach((dice, idx) => dice.populateAdjacentDices(idx, dices));
  return dices;
};

test('create new validator', () => {
  let validator = new TextValidator();
  expect(validator).toHaveProperty('dictionary');
});


test('isValidStringInput', () => {
  let validator = new TextValidator();
  let dices = createDices();

  expect(validator.isValidStringInput('abcd', dices)).toBe(true);
  expect(validator.isValidStringInput('efgh', dices)).toBe(true);
  expect(validator.isValidStringInput('ijkl', dices)).toBe(true);
  expect(validator.isValidStringInput('mnop', dices)).toBe(true);
  expect(validator.isValidStringInput('afcd', dices)).toBe(true);
  expect(validator.isValidStringInput('bglh', dices)).toBe(true);
  expect(validator.isValidStringInput('adad', dices)).toBe(false);
  expect(validator.isValidStringInput('aabb', dices)).toBe(false);
});
