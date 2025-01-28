export const getRequiredEnvVar = (variableName: string, hint?: string) => {
  const variable = process.env[variableName];
  if (!variable) {
    throw new Error(
      `Environment variable ${variableName}${hint ? ` (${hint})` : ""} is not set.`,
    );
  }

  return variable;
};
