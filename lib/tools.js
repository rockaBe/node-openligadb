/**
 * @module node-openligadb
 * @submodule Tools
 * @main node-openligadb
 * @author Daniel Wetzel <daniel@keksbox.com>
 */

/* jshint freeze:false */
'use strict';

var fs = require('fs');
var path = require('path');


/**
 * Removes entries from an array.
 *
 * By John Resig (MIT Licensed)
 *
 * @method remove
 * @param {integer} from
 * @param {integer} to
 * @chainable
 * @return {Array}
 */
Array.prototype.remove = function (from, to) {
  if (this.length > 0) {
    if (!to) {
      to = this.length - 1;
    }
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
  } else {
    return this;
  }
};

/**
 * Removes an item form the array.
 *
 * @method removeItem
 * @param item
 * @chainable
 * @return {Array}
 */
Array.prototype.removeItem = function (item) {

  if (item) {
    var itemIndex = this.indexOf(item);
    if (itemIndex >= 0) {
      return this.remove(itemIndex, itemIndex);
    }
  }
  return this;
};

Object.spawn = function (parent, props) {
  var defs = {}, key;
  for (key in props) {
    if (props.hasOwnProperty(key)) {
      defs[key] = {value: props[key], enumerable: true};
    }
  }
  return Object.create(parent, defs);
};

Object.defineProperty(Object.prototype, 'spawn', {value: function (props) {
  var defs = {}, key;
  for (key in props) {
    if (props.hasOwnProperty(key)) {
      defs[key] = {value: props[key], enumerable: true};
    }
  }
  return Object.create(this, defs);
}});