const findNearestAvailable = ({ occupied, totalSlots }) => {
  let nearestAvaialbeSlot = 0;
  const [min, max] = [Math.min(1), Math.max(totalSlots + 1)];
  const freeSlots = Array.from(Array(max - min), (v, i) => i + min).filter(
    (i) => !occupied.includes(i),
  );
  // check if allslots occupied
  if (freeSlots.length > 0) {
    nearestAvaialbeSlot = Math.min.apply(Math, freeSlots);
  }
  return nearestAvaialbeSlot;
};

export default findNearestAvailable;
