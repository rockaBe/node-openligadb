/**
 * The prototype of all manager objects.
 *
 * @submodule Manager
 * @main node-openligadb
 * @author Daniel Wetzel <daniel@keksbox.com>
 */

'use strict';

var _ = require('underscore');
var util = require('util');
var moment = require('moment');

var EntityPrototype = require('../Prototype');

/**
 * Manager maintain a list if data objects and a connection to the backend.
 *
 * @class ManagerPrototype
 * @param {Function} connectionCallback The callback function used to obtain a connection object.
 * @param {Object} connectionCallback.connection The connection object the manager should use to load data.
 * @param {Boolean} verbose
 * @param {Boolean} useCache
 * @constructor
 */
var ManagerPrototype = function (options) {

  ManagerPrototype.super_.apply(this, arguments);

  /**
   * The name of the manager, used for logging.
   *
   * @property name
   * @private
   * @type {string}
   */
  this.name = 'ManagerPrototype';

  /**
   * @property connectionCallback
   * @type {Function}
   */
  this.connectionCallback = null;

  /**
   * @property verbose
   * @type {boolean}
   */
  this.verbose = false;

  /**
   * @property useCache
   * @type {boolean}
   */
  this.useCache = true;

  /**
   * @property cacheTTL
   * @private
   * @type {number}
   */
  this.cacheTTL = 600;

  /**
   * @property refreshDate
   * @private
   * @type {Moment}
   */
  this.refreshDate = null;

  /**
   * Returns the age of the data in seconds.
   *
   * When calling markAsFresh the current time is saved. This method calculates the age since this moment.
   *
   * @method refreshAge
   * @return {number}
   */
  this.refreshAge = function () {

    if (_.isNull(this.refreshDate)) {
      return 10000000; // something really big
    }
    var now = moment();
    var diff = now.diff(this.refreshDate, 'seconds');

    return diff;
  };

  /**
   * Marks the current manager data as fresh.
   *
   * Every inherited object should call this method right after refreshing its data.
   *
   * @method markAsFresh
   * @chainable
   */
  this.markAsFresh = function markAsFresh() {
    if (this.useCache) {
      this.refreshDate = moment();
    }
    return this;
  };

  /**
   * Returns true if the data should be refresh from the backend.
   *
   * @method shouldRefresh
   * @return {boolean}
   */
  this.shouldRefresh = function shouldRefresh() {

    if (this.useCache) {
      var age = this.refreshAge();
      return (age > this.cacheTTL);
    } else {
      return true;
    }

  };

  /**
   * Logs an string if logging is enabled.
   *
   * @method log
   * @param {String} info
   * @chainable
   * @private
   */
  this.log = function (info) {
    if (this.verbose) {
      console.log('INFO (' + this.name + '): ' + info);
    }
    return this;
  };

  /**
   * Logs an error.
   *
   * It does not matter if logging is enabled.
   *
   * @method logError
   * @param {String} err
   * @chainable
   * @private
   */
  this.logError = function (err) {
    console.log('ERR (' + this.name + '): ' + err);
    return this;
  };

};

util.inherits(ManagerPrototype, EntityPrototype);
module.exports = ManagerPrototype;