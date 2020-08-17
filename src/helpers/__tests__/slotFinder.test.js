import findNearestAvailable from '../slotFinder';

describe('Find Nearest Available Parking Slot', () => {
  test('it should return nearest parking slot', () => {
    const occupied = [1, 3, 4, 5];
    const totalSlots = 6;
    const result = findNearestAvailable({ occupied, totalSlots });
    expect(result).toEqual(2);
    expect(result).toBeGreaterThan(0);
  });
  test(`it should return '0' if all slot are filled`, () => {
    const occupied = [1, 2, 3, 4, 5, 6];
    const totalSlots = 6;
    const result = findNearestAvailable({ occupied, totalSlots });
    expect(result).toEqual(0);
    expect(result).toBeGreaterThanOrEqual(0);
  });
});
