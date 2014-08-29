module.exports = {
  schema: true,
  connection: 'mongo',
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    skill: {
      type: 'string',
      required: true
    },
    duration: {
      type: 'integer',
      min: 0,
      required: true
    },
    student: {
      model: 'person'
    }
  }
};
