/**
* ClientMessage.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  identity: 'ClientMessage',
  attributes: {
      client: {
          model: 'client',
          required: true
              },
      message: {
          type: 'string',
          required: true
      }
  }
};

