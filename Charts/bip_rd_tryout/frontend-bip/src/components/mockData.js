// src/components/mockData.js

export const generateCellData = () => {
  const cells = ['AG-CELL-00110-CLA.079', 'AG-CELL-00109-CLA.078', 'AG-CELL-00107-CLA.055'];
  const baseCycles = Array.from({ length: 600 }, (_, i) => i + 1);

  return baseCycles.map(cycle => {
    const row = { cycle };
    cells.forEach((cell, idx) => {
      row[`${cell}_efficiency`] = Number((60 + Math.random() * 12 - idx * 5).toFixed(2));
      row[`${cell}_voltage`] = Number((3.2 * Math.sin(cycle / 10) + 1.5 + Math.random() * 0.2).toFixed(2));
    });
    return row;
  });
};