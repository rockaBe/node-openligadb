/**
 * @module node-openligadb
 * @submodule Entities
 * @main node-openligadb
 * @author Daniel Wetzel <daniel@keksbox.com>
 */

'use strict';

var util = require('util');
var EntityPrototype = require('./Prototype');

/**
 * A sport object respresents a single sport, e.g. Football.
 *
 * @class Sport
 * @extends EntityPrototype
 * @constructor
 */
var Sport = function () {

  this.id = function getTheId() {
    if (this.sportsID) {
      return this.sportsID.toString();
    } else {
      return null;
    }
  };

};

util.inherits(Sport, EntityPrototype);

module.exports = Sport;