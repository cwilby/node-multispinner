'use strict'

//----------------------------------------------------------
// Modules
//----------------------------------------------------------
// NPM
const assert = require('chai').assert
const sinon = require('sinon')

// Local
const Multispinner = require('../')
const genSpinners = require('./utils/genSpinners')
const states = require('lib/states')

//----------------------------------------------------------
// Tests
//----------------------------------------------------------
describe('complete method', () => {

  // setup
  const spinners = genSpinners.arr(3)
  const spinner = spinners[0]
  let multispinner
  beforeEach(() => {
    multispinner = new Multispinner(spinners)
    multispinner.start()
  })
  afterEach(() => {
    multispinner.clearState()
  })

  it('Throw if incorrect state passed', () => {
    assert.throws(() => multispinner.complete(spinner))
    assert.throws(() => multispinner.complete(spinner, 'notValidState'))
  })

  it('Call clearState method', () => {
    let spy = sinon.spy(multispinner, 'clearState')
    multispinner.complete(spinner, states.success)
    assert(spy.calledOnce)
  })

  it('Update spinner with state', () => {
    assert.equal(multispinner.spinners[spinner].state, states.incomplete)
    multispinner.complete(spinner, states.success)
    assert.equal(multispinner.spinners[spinner].state, states.success)
  })

  it('Call loop method', () => {
    let spy = sinon.spy(multispinner, 'loop')
    multispinner.complete(spinner, states.error)
    assert(spy.calledOnce)
  })
})
