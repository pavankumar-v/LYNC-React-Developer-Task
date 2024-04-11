export const localizedDateFormat = (date: Date) => {
  if (date) {
    date = new Date(date);
    return date.toLocaleDateString(navigator.language);
  }

  return null;
};
