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
   * @property leaguesManager
   * @private
   * @type {Leagues}
   */
  this.leaguesManager = null;

  this.readOptions(options);

  /**
   * The id of the sport.
   *
   * @property id
   * @type {String|null}
   */
  this.id = null;

  /**
   * The name of the sport.
   *
   * @property name
   * @type {String|null}
   */
  this.name = null;


  /**
   * Returns a leagues manager object.
   *
   * @method leagues
   * @return {Leagues}
   */
  this.leagues = function getTheLeague() {
    return this.leaguesManager;
  };
};

util.inherits(Sport, EntityPrototype);
module.exports = Sport;