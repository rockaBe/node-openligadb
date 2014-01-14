/**
 * Project: node-openligadb
 * User: daniel
 * Date: 14.01.14
 * Description:
 */

/* jshint expr:true */

'use strict';

var expect = require('chai').expect;

var connection = null;

describe('Connection', function testConnection() {

  it('should be null now', function testIfNull() {
    expect(connection).to.be.null;
  });

  it('should create the connection with the right options', function testCreation() {

    var testURL = 'http://www.openligadb.de/Webservices/Sportsdata.asmx';

    var options = {
      baseURL:  testURL,
      verbose:  false,
      useCache: false
    };

    connection = require('../lib/main')(options);

    expect(connection.WSDLURL()).to.be.equal(testURL + '?WSDL');
    expect(connection.isVerbose()).to.be.false;
    expect(connection.useCache()).to.be.false;

  });

  it('should not be connected', function testIfNotConnected() {
    expect(connection.isConnected()).to.be.false;
  });

  it('should load the list of sports', function testForLoadedSports(done) {

    var isFresh = connection.sports.refresh(function (err, sports) {
      if (err) {
        done(err);
      } else {
        expect(sports).to.be.array;
        expect(sports.length).to.be.above(0);
        done();
      }
    });

  });

});
