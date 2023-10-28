const Category = {
  slug: 'Category',
  auth: false,
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Priority',
      type: 'select',
      options: ['High', 'Urgent', 'Low'],
      required: true,
    },
  ],
};

module.exports = Category;
