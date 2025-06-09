export const formatDate = (date: Date, locale: string = "en"): string => {
  const weekday = new Intl.DateTimeFormat(locale, { weekday: "long" }).format(
    date,
  );
  const weekdayCapitalized = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat(locale, { month: "long" }).format(date);
  const year = date.getFullYear();

  return `${weekdayCapitalized} ${day}, ${month} - ${year}`;
};
