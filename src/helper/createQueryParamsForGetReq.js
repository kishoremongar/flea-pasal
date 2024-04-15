/**
 * @param {string} baseUrl - The Url for get request.
 * @param {Object} params - The object contains query param details,
 *                          like {status:'active', location:'india'}
 * @returns the url for get request
 */

const createQueryParamsForGetReq = (baseUrl, params = {}) => {
  const arr = [];
  for (const [key, value] of Object.entries(params)) {
    if (
      value !== undefined &&
      value !== '' &&
      value !== null &&
      value !== isNaN
    ) {
      arr.push(`&${key}=${value}`);
    }
  }
  const url = `${baseUrl}${arr.join('')}`;
  return url.replace('/&', '/?');
};
export default createQueryParamsForGetReq;
