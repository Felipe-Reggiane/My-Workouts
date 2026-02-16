export const squareBracketPattern = {
  pattern: /\[(.*?)\]/,
  renderText: (matchingString: string) =>
    matchingString.replace(/\[/g, "").replace(/]/g, ""),
};
