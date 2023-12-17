export const generateRecipeLink = (title: string) => {
  return `${title.toLowerCase().replace(/\s+/g, '-')}`;
};
