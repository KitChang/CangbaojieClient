/**
 * MessageRequestController
 *
 * @description :: Server-side logic for managing Messagerequests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    new: function(req, res){
        var Session = require("../lib/session");
        var session = new Session(req.session);
        var user = session.user();
        var clientId = user.client.id;
        res.view('message');

    },
    create: function(req, res){

        var advertisementId = req.param('advertisement');
        var state = req.param('state');
        var city = req.param('city');
        var region = req.param('region');
        var street = req.param('street');
        var locationType = req.param('location_type');
        var Session = require("../lib/session");
        var session = new Session(req.session);
        var user = session.user();
        var clientId = user.client.id;

        advertisement.findOne({id: advertisementId, client: clientId, deleted: false}).exec(function(err, ad){
            if(!ad){
                return res.serverError();
            }
            request.create({advertisement: advertisementId, client: clientId, state: state, city: city, region: region, street: street, location_type: locationType}).exec(function(err, doc){
                if(err){
                    return res.serverError(err);
                }
                res.redirect('/request?message=提交成功');
            });
        });
    },

};
