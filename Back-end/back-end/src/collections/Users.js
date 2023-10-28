const Users = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    // Email is added by default
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    // Add more fields as needed
  ],
};

module.exports = Users;
