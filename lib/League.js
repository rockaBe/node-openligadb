/**
 * @module node-openligadb
 * @submodule Entities
 * @main node-openligadb
 * @author Daniel Wetzel <daniel@keksbox.com>
 */
'use strict';

var _ = require('underscore');
var util = require('util');

var EntityPrototype = require('./Prototype');

/**
 * A league entity represents a sport league.
 *
 * @class League
 * @param options
 * @constructor
 */
var League = function (options) {

  League.super_.apply(this, arguments);

  this.readOptions(options);

  /**
   * The id of the league.
   *
   * @property id
   * @type {String|null}
   */
  this.id = null;

  /**
   * The full name of the league.
   *
   * @property name
   * @type {String|null}
   */
  this.name = null;

  /**
   * The shortname of the league.
   *
   * @property shortName
   * @type {String|null}
   */
  this.shortName = null;

  /**
   * The term of the league. Each term has its own instance of the same real-world league.
   *
   * @property term
   * @type {String|null}
   */
  this.term = null;

};

util.inherits(League, EntityPrototype);
module.exports = League;