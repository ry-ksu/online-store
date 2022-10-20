import { Controller } from './Controller';
import { json } from '../../data/json';

const controller = new Controller();

describe('Controller.filterItems', () => {
  test('check searching', () => {
    expect(controller.filterItems({}, json, 'ggg')).toStrictEqual([]);
    expect(controller.filterItems({}, json, '')).toStrictEqual(json.items);
  });
})

describe('Controller.transferSliderFromStrToNumb', () => {
  test('check null object', () => {
    expect(controller.transferSliderFromStrToNumb({})).toStrictEqual({});
  });

  test('check priceSlider', () => {
    expect(controller.transferSliderFromStrToNumb({"priceSlider":["2007.00","4173.00"]}))
    .toStrictEqual({"priceSlider":[2007.00, 4173.00]});
  });

  test('check quantitySlider', () => {
    expect(controller.transferSliderFromStrToNumb({"quantitySlider":["1.00","30.00"]}))
    .toStrictEqual({"quantitySlider":[1.00, 30.00]});
  });
})