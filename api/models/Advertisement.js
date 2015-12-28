/**
* Advertisement.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  identity: 'advertisement',
  attributes: {
      title: {
          type: 'string',
          required: true
      },
      description: {
          type: 'string',
          required: true
      },
      category: {
          type: 'string',
          required: true
      },
      expiredDate: {
          type: 'date',
          required: true
      },
      effectiveDate: {
          type: 'date',
          required: true
      },
      drawPerformInterval: {
          type: 'date',
          required: true
      },
      pricePerClick: {
          type: 'float',
          required: true,
      },
      
      device: {
        type: 'array',
        defaultsTo: []
      },
      client: {
          model: 'client'
      },
      expiredDate: {
          type: 'date'
      },
      effectiveDate: {
          type: 'date'
      }, 
      advertisementImage: {
          model: 'AdvertisementImage'
      }, 
      prizeCouponExpiredDate: {
          type: 'date'
      },
      highCode: {
          type: 'string'
      },
      lowCode: {
          type: 'string'
      },
      drawCount: {type: 'integer', defaultsTo: 0, required: true},
      redeem1PrizeQuantity: {
          type: 'integer', defaultsTo: 0, required: true
      },
      redeem2PrizeQuantity: {
          type: 'integer', defaultsTo: 0, required: true
      },
      redeem3PrizeQuantity: {
          type: 'integer', defaultsTo: 0, required: true
      },
      redeem4PrizeQuantity: {
          type: 'integer', defaultsTo: 0, required: true
      },
      redeem5PrizeQuantity: {
          type: 'integer', defaultsTo: 0, required: true
      }
  }
    
};

