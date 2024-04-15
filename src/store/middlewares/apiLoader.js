export const apiLoader = (api) => (next) => (action) => {
  const isMutation = action?.meta?.arg?.type === "mutation" ? true : false;
  const apiFetchingStatus = action?.meta?.requestStatus;

  if (isMutation) {
    console.log("went inside isMutation");

    if (apiFetchingStatus === "pending") {
      console.log("went inside pending");
      document.body.style.cursor = "wait";
    } else {
      document.body.style.cursor = "default";
    }
  }

  return next(action);
};
