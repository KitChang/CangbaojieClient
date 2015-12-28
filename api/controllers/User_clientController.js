

module.exports = {
	
    login: function(req, res){
        var username = req.param('username');
        var password = req.param('password');
        user_client.findOne({username: username, password: password}).populate('client').exec(function(err, doc) {
            
            if(doc==null){
                res.redirect('/login');
                return;
            }
            
            var Session = require("../lib/session");
            var session = new Session(req.session);
            session.login(doc);
            res.redirect("/");
        });
        
    },
    logout: function(req, res){
        var Session = require('../lib/session');
        var session = new Session(req.session);
        session.logout();
        res.redirect("/login");
    },
    destroy: function(req, res){
            user.destroy().exec(function(err){
            res.end();
        });

    }
    
    
    
};

