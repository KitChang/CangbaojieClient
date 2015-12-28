/**
* Request.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  identity: 'request',
  attributes: {
      advertisement: {model: 'advertisement'},
      client: {model: 'client'},
      status: {type: 'string', enum: ['未审查', '处理中', '完成'], defaultsTo: '未审查', required: true}
  }
};

