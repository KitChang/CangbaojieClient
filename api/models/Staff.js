/**
* Staff.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  identity: 'staff',
  attributes: {
    username: {
        type: 'string'
    },
    password: {
        type: 'string'
    },
    client: {
        model: 'client'
    }
  }
};

