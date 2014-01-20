/**
 * Wraps all interaction with the openligadb API.
 *
 *     var oldb = require('node-openligadb')()
 *
 * Supported options:
 *  - baseURL: the URL of the API without "?WDSL". Defaults to the currently valid URL.
 *  - verbose: true or false, indicates if you want some verbose console logs. Defaults to false.
 *  - useCache: true or false, wether the internal cache should be used. Defaults to true.
 *
 * @module node-openligadb
 * @main node-openligadb
 * @author Daniel Wetzel <daniel@keksbox.com>
 * @uses soap
 */

'use strict';

var util = require('util');
var _ = require('underscore');
var soap = require('soap');

var SportsManager = require('./Manager/Sports');
var LeaguesManager = require(('./Manager/Leagues'));
/**
 * Returns the default options object.
 *
 * @method _defaultOptions
 * @private
 * @return {Object}
 */
function _defaultOptions() {
  return {
    baseURL:  'http://www.openligadb.de/Webservices/Sportsdata.asmx',
    verbose:  false,
    useCache: true
  };
}

/**
 * Wraps all communication with the openligadb API.*
 *
 * @class Nodeopenligadb
 * @param {Object} options
 */
function Nodeopenligadb(options) {

  this.options = _.extend(_defaultOptions(), options);

  this.connection = null;

  /**
   * Checks if the module is in verbose mode.
   *
   * @method isVerbose
   * @private
   * @return {boolean|options.verbose}
   */
  this.isVerbose = function () {
    return this.options.verbose;
  };

  /**
   * Checks if the internal cache should be used.
   *
   * @method useCache
   * @private
   * @return {boolean|useCache}
   */
  this.useCache = function () {
    return this.options.useCache;
  };

  /**
   * Returns the URL used to connect to the endpoint's SOAP server.
   *
   * @method WSDLURL
   * @return {string}
   * @private
   */
  this.WSDLURL = function () {
    return this.options.baseURL + '?WSDL';
  };

  /**
   * Checks if the connection has been established.
   *
   * @method isConnected
   * @return {boolean}
   */
  this.isConnected = function () {
    return (this.connection !== null);
  };

  /**
   * Opens the SOAP connection to the server.
   *
   * @method openConnection
   * @param {Function}[callback] The callback function called after opening the connection.
   * @param {String}[callback.err] The error if one occurred.
   * @param {Object}[callback.sports] The created client.
   */
  this.openConnection = function (callback) {
    if (!this.connection) {
      var url = this.WSDLURL();

      if (this.isVerbose()) {
        console.log('Opening connection to ' + this.options.baseURL);
      }

      var that = this;
      soap.createClient(url, function onCreation(err, client) {
        if (client) {
          that.connection = client;

          if (that.isVerbose()) {
            console.log('Connection established');
          }

          if (err) {
            console.log('Error establishing connection: ' + err);
          }
        }

        if (_.isFunction(callback)) {
          callback(err, client);
        }
      });
    } else {
      if (_.isFunction(callback)) {
        callback(null, this.connection);
      }
    }
  };

  /**
   * Creates a connection callback function.
   *
   * It is used to create the manager objects which call the function to obtain a valid connection.
   *
   * @method _createConnectionCallback
   * @return {callbackFunction}
   * @private
   */
  this._createConnectionCallback = function () {

    // scoping this
    var that = this;
    // creating a function which opens the connection if not connected
    var callbackFunction = function (callback) {
      if (that.isConnected()) {
        callback(that.connection);
      } else {
        that.openConnection(function (err, client) {
          if (client) {
            callback(that.connection);
          }
        });
      }
    };

    // returning the function
    return callbackFunction;

  };

  /**
   * The sports manager.
   *
   * @property sports
   * @type {Sports}
   */
  this.sports = new SportsManager({
    connectionCallback: this._createConnectionCallback(),
    verbose:            this.isVerbose(),
    useCache:           this.useCache()
  });

  /**
   * The leagues manager.
   *
   * This instance is not tied to a sport so it will contain all leagues. If you want to deal with sports-related
   * leagues, use the leagues function of the sport object.
   *
   * @property leagues
   * @type {Leagues}
   */
  this.leagues = new LeaguesManager({
    connectionCallback: this._createConnectionCallback(),
    verbose:            this.isVerbose(),
    useCache:           this.useCache()
  });
}

module.exports = function (options) {
  return new Nodeopenligadb(options);
};