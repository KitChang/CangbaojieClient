/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moment = require('moment');
moment.locale('zh-cn');
module.exports = {
	dashboard: function(req, res){
        var Session = require("../lib/session");
        var session = new Session(req.session);
        var user = session.user();
        if(!user){
            return res.serverError();
        }
        client.findOne({id: user.client.id}).exec(function(err, clientOne){
            advertisement.find({client: user.client.id}).exec(function(err, ads){
            var dateTo = moment().endOf('day').toDate();
            var dateFrom = moment().subtract(7, "days").startOf('day').toDate();
            var todayStart = moment().startOf('day').toDate();
            var todayEnd = moment().endOf('day').toDate();
            option = {};
            //option.client = user.client.id;
            access.find({client: user.client.id}).where({ "createdAt" : { ">=" : dateFrom, "<" : dateTo }}).exec(function(err, accessResults){
                
                access.find(option).where({ "createdAt" : { ">=" : todayStart, "<" : todayEnd }}).exec(function(err, accessToday){
                    var accessCountToday = 0; totalAccess = 0;
                    if(accessToday)
                        accessCountToday = accessToday.length;
                    if(accessResults)
                        totalAccess = accessResults.length;
                    ClientMessage.find({client: user.client.id, sort: 'createdAt ASC'}).exec(function(err, clientMessages){
                        res.view('dashboard', {ads: ads, selectedAd: null, access: accessResults,moment: moment, accessToday: accessCountToday, totalAccess: totalAccess, user: user, clientMessages: clientMessages, client: clientOne});
                    });
                        
                });
                });
            
            });
            
            
        });
        
    },
    dashboardSearch: function(req, res){
        var Session = require("../lib/session");
        var session = new Session(req.session);
        var user = session.user();
        var clientId = user.client.id;
        
        client.findOne({id: user.client.id}).exec(function(err, clientOne){
            advertisement.find({client: user.client.id}).exec(function(err, ads){
                var locationType = req.param('locationType');
                var dateTo = moment().endOf('day').toDate();
                var dateFrom = moment().subtract(7, "days").startOf('day').toDate();
                var advertisementId = req.param('advertisement');
                var todayStart = moment().startOf('day').toDate();
                var todayEnd = moment().endOf('day').toDate();
                var locationType = req.param('locationType');
                var state = req.param('state');
                var city = req.param('city');
                var region = req.param('region');
                var street = req.param('street');
                var option = {};
                if(locationType&&locationType!=""){
                    option.locationType = locationType;
                }
                if (state&state!="") {
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
                if(advertisementId!=""){
                    option.advertisement = advertisementId;
                }
                if(locationType&&locationType!=""){
                    option.locatioType = locationType;
                }
                option.client = user.client.id;
                access.find(option).where({ "createdAt" : { ">=" : dateFrom, "<" : dateTo }}).exec(function(err, accessResults){
                access.find(option).where({ "createdAt" : { ">=" : todayStart, "<" : todayEnd }}).exec(function(err, accessToday){
                    var accessCountToday = 0; totalAccess = 0;
                    if(accessToday)
                        accessCountToday = accessToday.length;
                    if(accessResults)
                        totalAccess = accessResults.length;
                    if(advertisementId == "")
                        advertisementId = "-1";
                     advertisement.findOne({id: advertisementId}).exec(function(err, ad){
                        ClientMessage.find({client: user.client.id, sort: 'createdAt ASC'}).exec(function(err, clientMessages){
                        res.view('dashboard', {ads: ads, selectedAd: ad, moment: moment, accessToday: accessCountToday, totalAccess: totalAccess, access: accessResults, user: user, clientMessages: clientMessages, client: clientOne});    
                        });

                    });
                    });
                });

            })
        });
    },

    
};

