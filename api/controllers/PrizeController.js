/**
 * PrizeController
 *
 * @description :: Server-side logic for managing prizes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require("moment");
module.exports = {
	prizeStock: function(req, res){
        var Session = require("../lib/session");
        var session = new Session(req.session);
        var user = session.user();
        if(!user){
            return res.serverError();
        }
        advertisement.find({client: user.client.id}).exec(function(err, ads){
            if(err){
                return res.serverError(err);
            }
            res.view('prize-stock', {ads: ads, selectedAd: null});
        });
        
    },
    prizeStockSearch: function(req, res){
        var addId = req.param('advertisement');
        var Session = require("../lib/session");
        var session = new Session(req.session);
        var user = session.user();
        if(!user){
            return res.serverError();
        }
        advertisement.find({client: user.client.id}).exec(function(err, ads){
            if(err){
                return res.serverError(err);
            }
            advertisement.findOne({id: addId}).exec(function(err, ad){
                if(err){
                    return res.serverError(err);
                }
                res.view('prize-stock', {ads: ads, selectedAd: ad});
            })
          
        })
          
    },
    prizeWinner: function(req, res){
        var Session = require("../lib/session");
        var session = new Session(req.session);
        var user = session.user();
        advertisement.find({client: user.client.id}).exec(function(err, advertisements){
            if(err){
                return res.serverError(err);
            }
            var adId = [];
            for(var i=0; i<advertisements.length; i++){
                adId.push(advertisements[i].id);
            }
            PrizeCoupon.find({advertisement: adId}).populate('appUser').exec(function(err, results){
                if(err){
                    return res.serverError(err);
                }
                res.view('prize-winner', {results: results, ads: advertisements, moment: moment, prize: "all", adSelected: null});
            });
            
            
        });
    },
    prizeWinnerSearch: function(req, res){
        var Session = require("../lib/session");
        var session = new Session(req.session);
        var user = session.user();
        var advertisementId = req.param('advertisement');
        var prize = req.param('prize');
        var option = {};
        advertisement.find({client: user.client.id}).exec(function(err, advertisements){
            
            if(err){
                return res.serverError(err);
            }
            if(prize!="all"){
                option.prize = prize;
            }
            if(advertisementId!=""){
                option.advertisement = advertisementId;
            }else{
                var adId = [];
                for(var i=0; i<advertisements.length; i++){
                    adId.push(advertisements[i].id);
                }
                option.advertisement = adId;
            }
            
            
            var state = req.param('state');
            var city = req.param('city');
            var region = req.param('region');
            var street = req.param('street');
            
            if (state&&state!="") {
                option.state = state;
            }
            if (city&&city!="") {
                option.city = city;
            }
            if(region&&region!=""){
                option.region = region;
            }
            if(street&&street!=""){
                option.street = street;
            }
            option.sort = 'createdAt DESC';
            
            PrizeCoupon.find(option).populate('appUser').exec(function(err, results){
                if(err){
                    return res.serverError(err);
                }
                res.view('prize-winner', {results: results, ads: advertisements, moment: moment, prize: prize, adSelected: advertisementId});
            });
            
        });
    }
    
    
    
};

