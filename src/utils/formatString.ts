// première lettre en majuscule
export function firstLetterUpper(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}