export const buildPagination = (page = 1, limit = 6) => {
  const p = Math.max(1, parseInt(page, 10) || 1);
  const l = Math.max(1, parseInt(limit, 10) || 6);
  return { page: p, limit: l, skip: (p - 1) * l };
};
