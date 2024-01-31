export const formatDate = (date) => {
  const newDate = new Date(date);

  if (!(newDate instanceof Date)) {
    // Handle the case where date is not a valid Date object
    return "Invalid Date";
  }

  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return newDate.toLocaleDateString(undefined, options);
}