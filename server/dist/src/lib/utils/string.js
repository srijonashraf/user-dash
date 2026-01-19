export const trimOrUndefined = (value) => {
    const trimmed = value?.trim();
    return trimmed?.length ? trimmed : undefined;
};
