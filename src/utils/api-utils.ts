export function snakeCaseKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(snakeCaseKeys);
  } else if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase(),
        snakeCaseKeys(value),
      ])
    );
  }

  return obj;
}

export function camelCaseKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(camelCaseKeys);
  } else if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
        camelCaseKeys(value),
      ])
    );
  }
  return obj;
}
