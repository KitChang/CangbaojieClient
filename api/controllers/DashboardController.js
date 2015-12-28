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
        client.findOne({id: user.client.id}).exec(function(err, clientOne){
            
            advertisement.find({client: user.client.id}).exec(function(err, ads){
            var Session = require("../lib/session");
            var session = new Session(req.session);
            var user = session.user();
            var dateTo = moment(new Date()).endOf('day');
            var dateFrom = moment(dateTo).subtract(7, "days");
            var todayStart = moment(new Date).startOf('day');
            var todayEnd = moment(new Date).endOf('day');
            option = {};
            //option.client = user.client.id;
            access.find({client: user.client.id}).where({ "createdAt" : { ">" : new Date(dateFrom), "<" : new Date(dateTo) }}).exec(function(err, accessResults){
                console.log(accessResults.length);
                access.find(option).where({ "createdAt" : { ">" : new Date(todayStart), "<" : new Date(todayEnd) }}).exec(function(err, accessToday){
                    var accessToday2 = 0; totalAccess = 0;
                    if(accessToday)
                        accessToday2 = accessToday.length;
                    if(accessResults)
                        totalAccess = accessResults.length;
                    ClientMessage.find({client: user.client.id, sort: 'createdAt ASC'}).exec(function(err, clientMessages){
                        res.view('dashboard', {ads: ads, selectedAd: null, access: accessResults,moment: moment, accessToday: accessToday2, totalAccess: totalAccess, user: user, clientMessages: clientMessages, client: clientOne});
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
                var dateTo = moment(new Date());
                var dateFrom = moment(dateTo).subtract(7, "days");
                var advertisementId = req.param('advertisement');
                var todayStart = moment(new Date).startOf('day');
                var todayEnd = moment(new Date).endOf('day');
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
    //            else{
    //                var adId = [];
    //                for(var i=0; i<ads.length; i++){
    //                    adId.push(ads[i].id);
    //                }
    //                option.advertisement = adId;
    //            }
                option.client = user.client.id;
                access.find(option).where({ "createdAt" : { ">" : new Date(dateFrom), "<" : new Date(dateTo) }}).exec(function(err, accessResults){
                access.find(option).where({ "createdAt" : { ">" : new Date(todayStart), "<" : new Date(todayEnd) }}).exec(function(err, accessToday){
                    var accessToday2 = 0; totalAccess = 0;
                    if(accessToday)
                        accessToday2 = accessToday.length;
                    if(accessResults)
                        totalAccess = accessResults.length;
                    if(advertisementId == "")
                        advertisementId = "-1";
                     advertisement.findOne({id: advertisementId}).exec(function(err, ad){
                        ClientMessage.find({client: user.client.id, sort: 'createdAt ASC'}).exec(function(err, clientMessages){
                        res.view('dashboard', {ads: ads, selectedAd: ad, moment: moment, accessToday: accessToday2, totalAccess: totalAccess, access: accessResults, user: user, clientMessages: clientMessages, client: clientOne});    
                        });

                    });
                    });
                });

            })
        });
    },

    
};

