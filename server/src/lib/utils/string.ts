export const trimOrUndefined = <T extends string>(
  value: T | undefined,
): T | undefined => {
  const trimmed = value?.trim();
  return trimmed?.length ? (trimmed as T) : undefined;
};
