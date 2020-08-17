"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const findNearestAvailable = ({
  occupied,
  totalSlots
}) => {
  let nearestAvaialbeSlot = 0;
  const [min, max] = [Math.min(1), Math.max(totalSlots + 1)];
  const freeSlots = Array.from(Array(max - min), (v, i) => i + min).filter(i => !occupied.includes(i)); // check if allslots occupied

  if (freeSlots.length > 0) {
    nearestAvaialbeSlot = Math.min.apply(Math, freeSlots);
  }

  return nearestAvaialbeSlot;
};

var _default = findNearestAvailable;
exports.default = _default;
//# sourceMappingURL=slotFinder.js.map