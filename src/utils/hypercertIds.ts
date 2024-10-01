export const hypercertIdRegex = /^\d+-0x[a-fA-F0-9]{39,42}-\d{39,42}$/;

export const isValidHypercertId = (hypercertId: string) => {
  return hypercertIdRegex.test(hypercertId);
};
