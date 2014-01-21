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

/**
 * Leagues is a manager object for leagues information. It can be tied to a sport by calling leagues on a sport entity.
 *
 * @class Leagues
 * @extends ManagerPrototype
 * @param {Object} options
 * @constructor
 */
var Leagues = function (options) {

  Leagues.super_.apply(this, arguments);

  this.name = 'Leagues'; // the logging name

  /**
   * The id of a sport if this league object is tied to one.
   *
   * @property sportId
   * @type {String}
   */
  this.sportId = null;

  this.readOptions(options, {sportId: null});

  /**
   * @property data
   * @type {List}
   */
  this.data = new List();

  this.refresh = function (callback) {

    if (this.shouldRefresh()) {
      this.log('Performing full refresh of leagues data.');

      var that = this;
      this.connectionCallback(function onConnection(connection) {

        if (connection) {

          if (that.sportId) {
            connection.GetAvailLeaguesBySports({sportID: parseInt(that.sportId)}, that.handleRefreshResponse);
          } else {
            connection.GetAvailLeagues(that.handleRefreshResponse);
          }

        } else {
          if (callback) {
            process.nextTick(callback(new Error('No connection', 1), null));
          }
        }

      });

      return true;
    } else {
      this.log('Using cached leagues data.');

      if (callback) {
        var cThat = this;
        process.nextTick(function () {
          callback(null.data.items());
        });
      }

      return false;
    }
  };

  this.handleRefreshResponse = function (err, result) {

    if (err) {
      this.logError(err);
    }

    var loadedData = null;
    if (result) {
      if (result.GetAvailLeaguesResult && result.GetAvailLeaguesResult.League) {
        if (_.isArray(result.GetAvailLeaguesResult.League)) {
          loadedData = result.GetAvailLeaguesResult.League;
        }
      } else if (result.GetAvailLeaguesBySportsResult && result.GetAvailLeaguesBySportsResult.League) {
        if (_.isArray(result.GetAvailLeaguesBySportsResult.League)) {
          loadedData = result.GetAvailLeaguesBySportsResult.League;
        }
      }
    }

  };


};

util.inherits(Leagues, ManagerPrototype);
module.exports = Leagues;