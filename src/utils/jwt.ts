export const getAuthHeaders = (jwt: string) => {
  return { Authorization: `BEARER ${jwt}` };
};
