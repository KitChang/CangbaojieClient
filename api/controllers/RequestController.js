/**
 * RequestController
 *
 * @description :: Server-side logic for managing requests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function(req, res){
        var Session = require("../lib/session");
        var session = new Session(req.session);
        var user = session.user();
        console.log("client id" +user.client.id);
        var clientId = user.client.id;
        request.find({client: clientId}).populate('advertisement').exec(function(err, results){
            
            if(err)
                return res.serverError(err);
            console.log("request.le"+results.length);
            
            res.view('request', {results: results});
            });
    },
    new: function(req, res){
        res.view('request-new');
    },
    create: function(req, res){
        var state = req.param('state');
        var city = req.param('city');
        var region = req.param('region');
        var street = req.param('street');
        var Session = require("../lib/session");
        var session = new Session(req.session);
        var user = session.user();
        var clientId = user.client.id;
        request.create({client: clientId, state: state, city: city, region: region, street: street}).exec(function(err, doc){
            var messageStr = "用户"+user.username+"推广请求已发出-地点:"+city;
            ClientMessage.create({client: clientId, message: messageStr}).exec(function(){
                res.redirect('/?message=OK');
            });
        });
    },
    destroy: function(req, res){
        request.destroy().exec(function(err){
            res.end();
            return;
        });
    }
    
    
};

