/**
 * TopupRequestController
 *
 * @description :: Server-side logic for managing Topuprequests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new: function(req, res){
        res.view('topup-request-new');
    
    },
    create: function(req, res){
        
        var Session = require("../lib/session");
        var session = new Session(req.session);
        var user = session.user();
        var clientId = user.client.id;
        var topupValue = req.param('topupValue');
        var name = req.param('name');
        var contactPhone = req.param('contactPhone');
        var email = req.param('email');
        var remarks = req.param('remarks');
        TopupRequest.create({user: user.id, client: clientId, topupValue: topupValue, name: name, contactPhone: contactPhone, email: email, remarks: remarks}).exec(function(err){
            var messageStr = name+" 充值"+topupValue;
            ClientMessage.create({client: clientId, message: messageStr}).exec(function(){
                
                res.redirect('/?message=OK');
            });
            
            
        });
        
    },
};

