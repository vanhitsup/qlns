const SI_SYMBOL = ["", "k", "M", "B", "T"];

export function abbreviateNumber(number) {
  const tier = Math.floor(Math.log10(Math.abs(number)) / 3);

  if (tier === 0) {
    return number.toFixed(0);
  }

  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;

  return `${scaled.toFixed(1)}${suffix}`;
}
