export const apiLoader = () => (next) => (action) => {
  const isMutation = action?.meta?.arg?.type === 'mutation';
  const apiFetchingStatus = action?.meta?.requestStatus;

  if (isMutation) {
    /* eslint no-console: "error" */
    console.log('went inside isMutation');
    if (apiFetchingStatus === 'pending') {
      /* eslint no-console: "error" */
      console.log('went inside pending');
      document.body.style.cursor = 'wait';
    } else {
      document.body.style.cursor = 'default';
    }
  }

  return next(action);
};
