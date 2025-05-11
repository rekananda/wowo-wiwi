export const getInitial = (str: string, length: number = 2): string => {
  return str.match(/\b\w/g)?.slice(0, length).join('').toUpperCase() || '';
};

export const capitalize = (str: string): string => {
  return str.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase());
}