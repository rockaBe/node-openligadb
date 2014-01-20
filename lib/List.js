/**
 * @module node-openligadb
 * @submodule Manager
 * @main node-openligadb
 * @author Daniel Wetzel <daniel@keksbox.com>
 */

'use strict';

var _ = require('underscore');

/**
 * List objects maintain a list of objects providing convenient accessing methods.
 *
 * @class List
 * @param {Boolean} useCache
 * @constructor
 */
var List = function (useCache) {

  /**
   * @property useCache
   * @private
   * @type {Boolean}
   */
  this.useCache = useCache;

  /**
   * @property data
   * @private
   * @type {Array}
   */
  this.data = [];

  /**
   * Returns all items as array.
   *
   * @method items
   * @return {Array}
   */
  this.items = function getAllItems() {
    return this.data;
  };


  /**
   * Returns the item with the given id.
   *
   * This works by comparing the result of the id() function of all items with the parameter. Therefore, this only works
   * with objects with a function named id returning a "String".
   *
   * @method itemWithId
   * @param {String} id
   * @return {*}
   */
  this.itemWithId = function (id) {
    var item = null;

    if (_.isString(id)) {

      this.data.forEach(function iterate(candidate) {
        if (candidate.id && _.isFunction(candidate.id)) {
          if (candidate.id() === id) {
            item = candidate;
            return;
          }
        }
      });
    }

    return item;
  };

  /**
   * Adds an item to the list.
   *
   * Before adding the item, the method checks if the item has a function id() of type "String". If, after calling this
   * method, the item is part of this list, it return true, otherwise false.
   *
   * The list is id-unique. You cannot add multiple items with the same id.
   *
   * @method addItem
   * @param {*} item
   * @return {boolean}
   */
  this.addItem = function (item) {

    if (item.id && _.isFunction(item.id)) {
      if (_.isNull(this.itemWithId(item.id()))) {
        this.data.push(item);
      }
      return true;
    }
    return false;
  };
};

module.exports = List;

