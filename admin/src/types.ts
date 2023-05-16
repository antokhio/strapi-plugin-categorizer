export type CategorizerValue = {
  id: number;
  parent: null | { id: number };
} & {
  [key: string]: any;
};
