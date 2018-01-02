export function pluralize(singular, plural, count) {
  if (count === 1) {
    return singular;
  } else {
    return plural;
  }
}