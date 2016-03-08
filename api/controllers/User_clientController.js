passwordHash = require('password-hash');
module.exports = {

    login: function(req, res){

        var username = req.param('username');
        var password = req.param('password');
        user_client.findOne({username: username}).populate('client').exec(function(err, doc) {
            if(err){
                return res.serverError(err);
            }
            if(doc==null||!passwordHash.verify(password, doc.password)){
								var message = "用户名或密码错误";
								res.redirect('/login?omitNavigation=omitNavigation&message='+encodeURIComponent(message));
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
    }




};
