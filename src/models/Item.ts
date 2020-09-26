export interface Item {
  id: string;
  name: string;
}

export function createItem(initial?: Partial<Item>): Item {
  return {
    id: "",
    name: "",
    ...initial,
  };
}
