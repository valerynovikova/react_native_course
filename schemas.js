export const TodoSchema = {
  name: 'Todo',
  properties: {
    _id: 'int',
    title: 'string',
    completed: 'bool',
  },
  primaryKey: '_id',
};
