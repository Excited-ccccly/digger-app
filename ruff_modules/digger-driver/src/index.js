'use strict';

var Level = require('gpio').Level;
var driver = require('ruff-driver');
var invokeCallbackAsync = require('util').invokeCallbackAsync;

module.exports = driver({
    /**
     * @param {Object} inputs A map of assigned interfaces according to `driver.json`.
     * @param {Object} context Context of this instance to attach.
     * @param {string} context.id ID of the device.
     * @param {string} context.model Model of the device.
     * @param {Object} context.args A map of device arguments.
     * @param {Function} callback If the third parameter is added, it's the callback for asyncrhonous attaching.
     */
    attach: function (inputs, context/*, callback */) {
        // Get assigned GPIO interface and set property `_gpio`.
        // See https://ruff.io/zh-cn/api/gpio.html for more information about GPIO interfaces.
        this._diggerIO = inputs['diggerIO'];
        this._leftForward = inputs['leftForward'];
        this._leftBack = inputs['leftBack'];
        this._rightForward = inputs['rightForward'];
        this._rightBack = inputs['rightBack'];
        this._turnLeft = inputs['turnLeft'];
        this._turnRight = inputs['turnRight'];
    },
    exports: {

        startDiggering: function (callback) {
            this._diggerIO.write(Level.high);
            invokeCallbackAsync(callback, undefined);
        },

        stopDiggering: function (callback) {
            this._diggerIO.write(Level.low);
            invokeCallbackAsync(callback, undefined);
        },

        moveForward: function (callback) {
            this._leftForward.write(Level.high);
            this._rightForward.write(Level.high);
         
            this._leftBack.write(Level.low);
            this._rightBack.setDuty(0, function(){});
            
            invokeCallbackAsync(callback, undefined);
        },

        moveBack: function (callback) {
            this._leftForward.write(Level.low);
            this._rightForward.write(Level.low);
         
            this._leftBack.write(Level.high);
            this._rightBack.setDuty(1, function(){});
        
            invokeCallbackAsync(callback, undefined);
        },

        moveLeft: function (callback) {
            this._leftForward.write(Level.low);
            this._rightForward.write(Level.high);
         
            this._leftBack.write(Level.low);
            this._rightBack.setDuty(0, function(){});

            invokeCallbackAsync(callback, undefined);
        },

        moveRight: function (callback) {
            this._leftForward.write(Level.high);
            this._rightForward.write(Level.low);
         
            this._leftBack.write(Level.low);
            this._rightBack.setDuty(0, function(){});

            invokeCallbackAsync(callback, undefined);
        },

        stopMoving: function (callback) {
            this._leftForward.write(Level.low);
            this._rightForward.write(Level.low);
         
            this._leftBack.write(Level.low);
            this._rightBack.setDuty(0, function(){});

            invokeCallbackAsync(callback, undefined);
        },

        turnLeft: function (callback) {
            this._turnLeft.setDuty(1, function(){});
            this._turnRight.setDuty(0, function(){});
            
            invokeCallbackAsync(callback, undefined);
        },

        turnRight: function (callback) {
            this._turnLeft.setDuty(0, function(){});
            this._turnRight.setDuty(1, function(){});
            
            invokeCallbackAsync(callback, undefined);
        },

        stopTurnAround: function (callback) {
            this._turnLeft.setDuty(0, function(){});
            this._turnRight.setDuty(0, function(){});
            
            invokeCallbackAsync(callback, undefined);
        }
    }
});
