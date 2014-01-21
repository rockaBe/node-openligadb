/**
 * @submodule Manager
 * @main node-openligadb
 * @author Daniel Wetzel <daniel@keksbox.com>
 */
'use strict';

var _ = require('underscore');
var util = require('util');
var tools = require('../tools');

var ManagerPrototype = require('./Prototype');
var List = require('../List');

var EntityPrototype = require('../Prototype');
var SportEntity = require('../Sport');

var Leagues = require('./Leagues');

/**
 * Sports objects maintain a list of available sports, e.g. Football.
 *
 * @class Sports
 * @extends ManagerPrototype
 * @param {Object} options
 * @constructor
 */
var Sports = function (options) {

  Sports.super_.apply(this, arguments);
  this.readOptions(options);

  this.name = 'Sports'; // the logging name

  /**
   * @property data
   * @type {List}
   */
  this.data = new List();

  /**
   * Refreshes the sports data.
   *
   * Caching is performed internally, so any consumer does not need to care about. The callback is called asynchronously,
   * even when the data is loaded from the cache.
   * If the data is loaded from the backend, the method returns true. If the data is loaded from the cache, false is
   * returned.
   *
   * @method refresh
   * @param {Function} callback The callback function called after refreshing.
   * @param {String} callback.err The error if something went wrong while refreshing.
   * @param {Array} callback.sports An array containing all sports objects.
   * @return {Boolean}
   */
  this.refresh = function (callback) {

    if (this.shouldRefresh()) {
      this.log('Performing full refresh of sports data.');
      // we need to refresh the data
      var that = this;
      this.connectionCallback(function onConnection(connection) {

        if (connection) {
          connection.GetAvailSports(function onLoadedSports(err, result) {

            if (err) {
              that.logError(err);
            }

            if (result && result.GetAvailSportsResult) {
              if (_.isArray(result.GetAvailSportsResult.Sport)) {

                that.log('Loaded ' + result.GetAvailSportsResult.Sport.length + ' sport objects');

                result.GetAvailSportsResult.Sport.forEach(function forEach(item) {

                  if (item.sportsID) {
                    var sport = that.data.itemWithId(item.sportsID.toString());

                    if (_.isNull(sport)) {

                      // first, we create the corresponding leagues object
                      var theLeagues = new Leagues({
                        connectionCallback: that.connectionCallback,
                        verbose:            that.verbose,
                        useCache:           that.useCache,
                        sportId:            item.sportsID.toString()
                      });

                      // then the sport including the leagues
                      sport = new SportEntity({
                        leaguesManager: theLeagues
                      });


                    }

                    sport = Object.spawn(sport, item);
                    that.data.addItem(sport);
                  }
                });
              }
            }

            that.markAsFresh();

            if (callback) {
              callback(err, that.data.items());
            }
          });

        }
        else {
          // we did not get a valid connection
          if (callback) {
            process.nextTick(callback(new Error('No connection', 1), null));
          }
        }
      });

      // returning true if we're about to refresh from the backend
      return true;
    } else {
      // no need to refresh
      this.log('Using cached sports data.');
      if (callback) {
        var cThat = this;
        process.nextTick(function () {
          callback(null, cThat.data.items());
        });
      }

      // returning false if we load the data from the cache
      return false;
    }
  };
};

util.inherits(Sports, ManagerPrototype);
module.exports = Sports;