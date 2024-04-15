export default function getDirtyDefaultValues(formValue, dirtyFields) {
  const dirtyDefaultValues = {};
  Object.entries(dirtyFields).forEach(([field, isDirty]) => {
    // eslint-disable-next-line no-prototype-builtins
    if (isDirty && formValue.hasOwnProperty(field)) {
      dirtyDefaultValues[field] = formValue[field];
    }
  });
  return dirtyDefaultValues;
}
