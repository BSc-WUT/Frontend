export const snakeToCamel = (input: any): any => {
  if (Array.isArray(input)) {
    return input.map((item) => snakeToCamel(item));
  } else if (input != null && typeof input === "object") {
    return Object.keys(input).reduce((acc, key) => {
      const camelCaseKey = key.replace(/_([a-z])/g, (_, match) =>
        match.toUpperCase()
      );
      const camelCaseFixed = camelCaseKey.replace("_", "");
      acc[camelCaseFixed] = snakeToCamel(input[key]);
      return acc;
    }, {} as Record<string, any>);
  }
  return input;
};

export const camelToSnake = (input: any): any => {
  if (Array.isArray(input)) {
    return input.map((item) => camelToSnake(item));
  } else if (input != null && typeof input === "object") {
    return Object.keys(input).reduce((acc, key) => {
      const snakeCaseKey = key.replace(
        /[A-Z]/g,
        (match) => "_" + match.toLowerCase()
      );
      acc[snakeCaseKey] = camelToSnake(input[key]);
      return acc;
    }, {} as Record<string, any>);
  }
  return input;
};
