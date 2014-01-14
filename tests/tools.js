/**
 * Project: node-openligadb
 * User: daniel
 * Date: 14.01.14
 * Description:
 */

'use strict';

var expect = require('chai').expect;

var Tools = require('../lib/tools.js');
describe('Tools', function () {
  describe('Array', function () {
    it('should remove from X to Y', function () {
      var data = [1, 2, 3, 4, 5];
      data.remove(2, 3);
      expect(data.indexOf(1)).to.equal(0);
      expect(data.indexOf(2)).to.equal(1);
      expect(data.indexOf(3)).to.equal(-1);
      expect(data.indexOf(4)).to.equal(-1);
      expect(data.indexOf(5)).to.equal(2);
    });

    it('should remove to the end when the boundary is invalid', function () {
      var data = [1, 2, 3, 4, 5];
      data.remove(3, 10);
      expect(data.indexOf(1)).to.equal(0);
      expect(data.indexOf(2)).to.equal(1);
      expect(data.indexOf(3)).to.equal(2);
      expect(data.indexOf(4)).to.equal(-1);
      expect(data.indexOf(5)).to.equal(-1);
    });

    it('should remove from X to the end', function () {
      var data = [1, 2, 3, 4, 5];
      data.remove(3);
      expect(data.indexOf(1)).to.equal(0);
      expect(data.indexOf(2)).to.equal(1);
      expect(data.indexOf(3)).to.equal(2);
      expect(data.indexOf(4)).to.equal(-1);
      expect(data.indexOf(5)).to.equal(-1);
    });

    it('should do nothing on an empty array', function () {
      var data = [];
      data.remove(2);
      expect(data.length).to.equal(0);
    });

    it('should remove an item', function () {
      var data = [1, 2, 3, 4, 5];
      data.removeItem(3);

      expect(data.indexOf(1)).to.equal(0);
      expect(data.indexOf(2)).to.equal(1);
      expect(data.indexOf(3)).to.equal(-1);
      expect(data.indexOf(4)).to.equal(2);
      expect(data.indexOf(5)).to.equal(3);

    });

    it('should iterate over the elements', function () {

      var data = [1, 2, 3];
      var i = 1;
      data.forEach(function (element) {
        expect(element).to.equal(i);
        i++;
      });
    });
  });
});