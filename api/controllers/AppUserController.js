/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function(req, res) {
        
        AppUser.find().exec(function(err, resultArr){
            if(err){
                return res.serverError(err);
            }
            
            res.view('user', {resultArr: resultArr});
        });
    },
    findOne: function(req, res){
        
        var id = req.param('id');
        
        AppUser.findOne({id: id}).exec(function(err, result){
            
            res.view('user-one', {result: result})
        });
    },
    create: function(req, res){
        
        var username = req.param('username');
        var password = req.param('password');
        var role = req.param('role');
        var client = req.param('client');
        
        AppUser.findOne({username: username}).exec(function(err, doc){
            
            if(doc!=null){
                return res.serverError(err);
            }
            
            AppUser.create({username: username, password: password, role: role}).exec(function(err, doc){
                
                res.redirect('/user/'+doc.id);
            });
        });
    },
    update: function(req, res){
        
        var id = req.param('id');
        var role = req.param('role');
        var changePassword = req.param('changePassword');
        var password = req.param('password');
        option = {};
        option.role = role;
        if(changePassword=='change')
            option.password = password;
        
        AppUser.update({id: id}, option).exec(function(err, doc){
            
            res.redirect('/user/'+id);  
        });
    },
    new: function(req, res){
        
        res.view('user-new');
    },
    destroy: function(req, res){
        
        var id = req.param("id");
        
        AppUser.destroy({id: id}).exec(function(err, result){
            
            res.redirect('user');
        })
    },
    login: function(req, res){
        
        var username = req.param('username');
        var password = req.param('password');
        
        
        AppUser.findOne({username: username, password: password}).exec(function(err, doc) {
            
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
        user_client.destroy().exec(function(err){
            user.destroy().exec(function(err){
            res.end();
        });
        });
    }
    
    
    
};

