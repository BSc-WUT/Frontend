export const convertKeysToCamelCase = (input: any): any => {
  if (Array.isArray(input)) {
    return input.map((item) => convertKeysToCamelCase(item));
  } else if (input != null && typeof input === "object") {
    return Object.keys(input).reduce((acc, key) => {
      const camelCaseKey = key.replace(/_([a-z])/g, (_, match) =>
        match.toUpperCase()
      );
      const camelCaseFixed = camelCaseKey.replace("_", "");
      acc[camelCaseFixed] = convertKeysToCamelCase(input[key]);
      return acc;
    }, {} as Record<string, any>);
  }
  return input;
};
