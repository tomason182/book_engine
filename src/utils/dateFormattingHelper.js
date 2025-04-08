export function formatToLocaleDate(date) {
  const language = navigator.language || "en-US";
  const [year, month, day] = date.split("-");
  const formattedDate = new Date(year, month - 1, day);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return formattedDate.toLocaleDateString(language, options);
}
