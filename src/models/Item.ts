export interface Item {
  id: string;
  name: string;
  userId: string;
}

export function createItem(initial?: Partial<Item>): Item {
  return {
    id: "",
    name: "",
    userId: "",
    ...initial,
  };
}
