
module.exports = {
  identity: 'TopupRequest',
  attributes: {
      client: {model: 'client'},
      status: {type: 'string', enum: ['open', 'process', 'closed'], defaultsTo: 'open', required: true},
      user: {model: 'User_client'}
  }
};

