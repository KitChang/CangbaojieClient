/**
* Access.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  identity: 'access',
  attributes: {
    device: {
        model: 'device'
    },
    advertisement: {
        model: 'advertisement'
    },
    appUser: {
        model: 'AppUser'
    },
    client: {
        model: 'client'
    }
  }
};

