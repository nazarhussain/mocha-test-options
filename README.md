# mocha-test-options

> Extend BDD Interfaces for Mocha to provide test options

[![Build Status](https://travis-ci.org/nazarhussain/mocha-test-options.svg?branch=master)](https://travis-ci.org/nazarhussain/mocha-test-options) 
[![Code Climate](https://codeclimate.com/github/nazarhussain/mocha-test-options/badges/gpa.svg)](https://codeclimate.com/github/nazarhussain/mocha-test-options)

In normal scenario you can set some variables/propertiess in `beforeEach` using `this.attribute = 'something'` and later can used it inside test cases. But in a scenario if you need to set some option in test and want to access it in `before` or `beforeEach` then this package will help you out.

### Setup

Then simply run mocha with `--ui mocha-test-options`.

### Example

```js

beforeEach(function(){
  console.log(this.currentTest.testOptions)
})

describe('scenario 1', function(){
  it('test 11', {t1: true}, function(){
    // Do something
  });
})

describe('scenario 2', {sc1: true}, function() {

  it('test 21', {t1: true}, function(){
    // Do something
  });

  it('test 22', {t2: true}, function(){
    // Do something
  });

  it('test 23', function(){
    // Do something
  })
});
```

You will get following output of console.

```
scenario 1

{t1: true}
  ✓ test 11

scenario 2

{sc1: true, t1: true}
  ✓ test 21

{sc1: true, t2: true}  
  ✓ test 22

{sc1: true}
  ✓ test 23

```

### Notes

- `describe`, `it` will accept a third parameter which you can pass for any options including objects of having functions
- The third parameter is optional, if you don't pass it will follow standard behavior
- This also applies to `only` and `skip` as well 
