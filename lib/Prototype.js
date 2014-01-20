/**
 * @module node-openligadb
 * @submodule Entities
 * @main node-openligadb
 * @author Daniel Wetzel <daniel@keksbox.com>
 */
'use strict';

var _ = require('underscore');
var util = require('util');

/**
 * EntityPrototype is the prototype for all entity objects.
 *
 * It provides a common access to the connection which was used to load the data.
 *
 * @class EntityPrototype
 * @constructor
 */
var EntityPrototype = function (options) {

  /**
   * Reads to construction options.
   *
   * You can pass a defaultOptions object, if you want to default to other values than the objects uses.
   * The method sets the value of member variables depending on the options though the resulting options object is
   * returned.
   *
   * @method readOptions
   * @param options
   * @param defaultOptions
   * @return {Object}
   */
  this.readOptions = function (options, defaultOptions) {

    var effectiveDefaultOptions = _.extend({verbose: false, useCache: true}, defaultOptions);
    if (defaultOptions) {
      effectiveDefaultOptions = _.extend(effectiveDefaultOptions, defaultOptions);
    }

    var effectiveOptions = _.extend(effectiveDefaultOptions, options);

    if (effectiveOptions.connectionCallback) {
      this.connectionCallback = effectiveOptions.connectionCallback;
    }

    var that = this;
    Object.keys(effectiveDefaultOptions).forEach(function (property) {
      that[property] = effectiveDefaultOptions[property];
    });


    return effectiveOptions;
  };

};

module.exports = EntityPrototype;
