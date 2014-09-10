module.exports = {
  schema: true,
  connection: 'mongo',
  attributes: {
    skill: {
      type: 'string',
      required: true
    },
    owner: {
      model: 'person'
    },
    lastScore: {
      type: 'float',
      max: 100,
      min: 0,
      required: true
    },
    score: {
      type: 'float',
      max: 100,
      min: 0,
      required: true
    }
  }
};
