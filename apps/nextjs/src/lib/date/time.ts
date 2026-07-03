export const times = () => [...am(), ...pm()];

const am = () => timeData.map((v) => `${v} am`);
const pm = () => timeData.map((v) => `${v} pm`);

const timeData: string[] = [12, ...new Array(11)].reduce((acc, v, i) => {
  if (i === 0) {
    acc.push(...[`${v}:00`, `${v}:30`]);
    return acc;
  }
  acc.push(...[`${i}:00`, `${i}:30`]);
  return acc;
}, []);
