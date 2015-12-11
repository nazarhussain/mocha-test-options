var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Scenario block must have testOptions', function (){
  it('test case must have testOptions attribute', function(){
    this.test.should.have.property('testOptions');
  });
  it('test case option must be an object', function(){
    this.test.testOptions.should.be.an('object');
  });
});

describe('Scenario block with blank options', function(){
  it('test case with blank options must have blank test options', function(){
    this.test.testOptions.should.be.empty;
  });

  it('test case with option must have only that options', {option1: true}, function(){
    this.test.testOptions.should.deep.equal({option1: true});
  });
});

describe('Scenario block with options', {soption: true}, function(){
  it('test case with blank options must have only scenario options', function(){
    this.test.testOptions.should.deep.equal({soption: true});
  });

  it('test case with option must have mix of scenario and its own option', {option1: true}, function(){
    this.test.testOptions.should.deep.equal({soption: true, option1: true});
  });
});
