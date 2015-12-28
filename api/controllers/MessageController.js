/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
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
        
        var Session = require("../lib/session");
        var session = new Session(req.session);
        var user = session.user();
        var clientId = user.client.id;
        
        var name = req.param('name');
        var contactPhone = req.param('contactPhone');
        var email = req.param('email');
        var title = req.param('title');
        var message2 = req.param('message');
        message.create({user: user.id, client: clientId, name: name, contactPhone: contactPhone, email: email, title: title, message: message2}).exec(function(err){
            res.redirect('/?message=OK');
        });
        
        
        
        
    },
	
};

