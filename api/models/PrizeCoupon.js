
module.exports = {
  identity: 'PrizeCoupon',
  attributes: {
      appUser: {model: 'AppUser'},
      advertisement: {model: 'advertisement'},
      redeemLocation: {type: 'string'},
      prize: {type: 'string'},
      prizeCouponExpiredAt: {type: 'date'},
      picked: {type: 'boolean', defaultsTo: false, required: true},
      pickAt: {type: 'date'},
      throughDevice: {type: 'string'}
  }
};