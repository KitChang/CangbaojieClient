/**
 * ClickController
 *
 * @description :: Server-side logic for managing clicks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');
module.exports = {
	clickStatistics: function(req, res){
        var Session = require("../lib/session");
        var session = new Session(req.session);
        var user = session.user();
        advertisement.find({client: user.client.id}).exec(function(err, ads){
            var dateTo = moment(new Date());
            console.log("today"+dateTo.toString());
            var dateFrom = moment(dateTo).subtract(7, "days");
            option = {client: user.client.id};
            access.find(option).where({ "createdAt" : { ">" : new Date(dateFrom), "<" : new Date(dateTo) }}).populate("appUser").exec(function(err, results){
                res.view("click-statistics", {ads: ads, results: results, moment: moment});
            });
        })
    },
    clickStatisticsSearch: function(req, res){
        var Session = require("../lib/session");
        var session = new Session(req.session);
        var user = session.user();
        advertisement.find({client: user.client.id}).exec(function(err, ads){
            var duration = req.param('duration');
            var dateFrom, dateTo;
            if(duration=="define"){
                var dateFromStr = req.param('dateFrom');
                var dateToStr = req.param('dateTo');
                if(dateFromStr!=null)
                    dateFromStr = dateFromStr.replace(/\//g, "");
                if(dateToStr)
                    dateToStr = dateToStr.replace(/\//g, "");
                dateFrom = moment(dateFromStr, "MMDDYYYY").startOf('day');
                console.log("date from"+dateFrom);
                dateTo = moment(dateToStr, "MMDDYYYY").endOf('day');
            }else{
                var dateTo = moment(new Date());
                duration = parseInt(duration);
                console.log("dru"+duration);
                var dateFrom = moment(dateTo).subtract(duration, "days");
                console.log("datefr"+dateFrom);
            }
            
            var locationType = req.param('locationType');
            var state = req.param('state');
            var city = req.param('city');
            var region = req.param('region');
            var street = req.param('street');
            var option = {};
            var advertisementId = req.param('advertisement');
            
            if(advertisementId==""){
                var adId = [];
                for (var i=0; i<ads.length; i++){
                    adId.push(ads[i].id);
                }
                option.advertisement = adId;
            }else{
                option.advertisement = advertisementId;
            }

            if(locationType&&locationType!=""){
                option.locationType = locationType;
            }
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
            access.find(option).where({ "createdAt" : { ">" : new Date(dateFrom), "<" : new Date(dateTo) }}).populate("appUser").exec(function(err, results){
                res.view("click-statistics", {ads: ads, results: results, moment: moment});
            });
            
        })
        

    
    },
    updateCol: function(req, res){
        access.update({}, {locationType: '公交站'}).exec(function(err){
            res.end();
        })
    }
};

