import queryString from "query-string";

export const parseSearchString = () =>
  queryString.parse(window.location.search);

export const writeHistory = searchParams => {
  let serializedSearchParams = Object.entries(searchParams)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  if (serializedSearchParams.length > 0) {
    window.history.pushState({}, "", "?" + serializedSearchParams);
  }
};
