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





};

util.inherits(Leagues, ManagerPrototype);
module.exports = Leagues;