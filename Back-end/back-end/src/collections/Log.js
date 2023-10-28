const Logs = {
  slug: "Log",
  auth: false,
  admin: {
    useAsTitle: "action",
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
          await payload.create({
            collection: 'Log',
            data: {
              type: 'Todo',
              Name: args.result.title,
              Action: 'Create',
            },
          });
        }
      },
      async (args) => {
        if (args.operation === 'update') {
          await payload.create({
            collection: 'Log',
            data: {
              type: 'Todo',
              Name: args.doc.title,
              Action: 'Update',
            },
          });
        }
      },
      async (args) => {
        await payload.create({
          collection: 'Log',
          data: {
            type: 'Todo',
            Name: args.doc.title,
            Action: 'Delete',
          },
        });
      },
    ],
  },
  fields: [
    {
      name: "action",
      label: "Action",
      type: "select",
      options: ["Create", "Update", "Delete"],
      required: true,
    },
    {
      name: "itemType",
      label: "Koleksi",
      type: "select",
      options: ["Todo", "Category"],
      required: true,
    },
    {
      name: "priority",
      label: "Priority",
      type: "relationship",
      relationTo: "Category",
      required: true,
    },
    {
      name: "timestamp",
      label: "TimeStamp",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "d MMM yyyy, HH:mm",
        },
      },
    },
  ],
};

module.exports = Logs;
