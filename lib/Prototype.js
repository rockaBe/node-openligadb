/**
 * @module node-openligadb
 * @submodule Entities
 * @main node-openligadb
 * @author Daniel Wetzel <daniel@keksbox.com>
 */

'use strict';

/**
 * EntityPrototype is the prototype for all entity objects.
 *
 * It provides a common access to the connection which was used to load the data.
 *
 * @class EntityPrototype
 * @constructor
 */
var EntityPrototype = function () {

  this.connection = null;

};

module.exports = EntityPrototype;
