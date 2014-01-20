/**
 * @module node-openligadb
 * @submodule Entities
 * @main node-openligadb
 * @author Daniel Wetzel <daniel@keksbox.com>
 */

'use strict';

var util = require('util');
var EntityPrototype = require('./Prototype');

var Leagues = require('./Manager/Leagues');

/**
 * A sport object respresents a single sport, e.g. Football.
 *
 * @class Sport
 * @extends EntityPrototype
 * @constructor
 */
var Sport = function (options) {

  Sport.super_.apply(this, arguments);

  /**
   * Holds an instance to a leagues manager instance which is tied to this sport.
   *
   * @property leagues
   * @private
   * @type {Leagues}
   */
  this.leagues = null;

  this.readOptions(options);

  /**
   * Returns the id of the sport.
   *
   * The method is a proxy for the internal name defined by the API.
   *
   * @method id
   * @return {String}
   */
  this.id = function getTheId() {
    if (this.sportsID) {
      return this.sportsID.toString();
    } else {
      return null;
    }
  };

  /**
   * Returns the name of the sport.
   *
   * The method is a proxy for the internal name defined by the API.
   *
   * @method name
   * @return {*}
   */
  this.name = function getTheName() {
    if (this.sportsName) {
      return this.sportsName;
    } else {
      return null;
    }
  };

  /**
   * Returns a leagues manager object.
   *
   * @method leagues
   * @return {Leagues}
   */
  this.leagues = function getTheLeague() {
    return this.leagues;
  };
};

util.inherits(Sport, EntityPrototype);
module.exports = Sport;