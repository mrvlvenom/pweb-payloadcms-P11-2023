const payload = require('payload');

const Todo = {
  slug: 'todo',
  auth: false,
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    update: () => true,
    delete: () => true,
    create: () => true,
  },
  hooks: {
    afterOperation: [
      async (args) => {
        if (args.operation === 'create') {
          // Create click activity
          payload.create({
            collection: 'todo',
            data: {
              todo: args.result.id,
              timestamp: new Date(),
            },
          });
        }
      },
    ],
    afterChange: [
      async (args) => {
        if (args.operation === 'update') {
          // Create changelog activity
          payload.create({
            collection: 'changelog',
            data: {
              type: 'todo',
              name: args.doc.title,
              action: 'updated',
            },
          });
        }
      },
    ],
  },
  fields: [
    {
      name: 'action',
      label: 'Action',
      type: 'select',
      options: ['Create', 'Update', 'Delete'],
      required: true,
    },
    {
      name: 'itemType',
      label: 'Koleksi',
      type: 'select',
      options: ['Todo', 'Category'],
      required: true,
    },
    {
      name: 'priority',
      label: 'Priority',
      type: 'relationship',
      relationTo: 'category',
      required: true,
    },
    {
      name: 'dateOnly',
      label: 'Time Stamp',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyyy, HH:mm',
        },
      },
    },
  ],
};

module.exports = Todo;
