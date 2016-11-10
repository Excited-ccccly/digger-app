'use strict';
var digger;
var Server = require('home').Server;
var server = new Server();
$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }
    digger = $('#digger');
    digger.startDiggering(function(){
        console.log('start diggering');
    });
    // 对Ruff板上的 Http服务器的`/forward`访问，命令挖掘机向前行
    server.get('/start-diggering', function () {
        digger.startDiggering(function(){
            console.log('start diggering');
            return {
                message: 'start diggering'
            };
        });
    });

    server.get('/move-forward', function () {
        digger.moveForward(function() {
            console.log('move forward');
            return {
                message: 'move forward'
            };
        });
    });
    
    // 对Ruff板上的 Http服务器的`/backward`访问，命令挖掘机向后退
    server.get('/move-back', function () {
        digger.moveBack(function(){
            console.log('move Back');
            return {
                message: 'move Back'
            };
        });
    });
    
    server.get('/move-left', function () {
        digger.moveLeft(function(){
            console.log('move left');
            return {
                message: 'move left'
            };
        });
    });
    
    server.get('/move-right', function () {
        digger.moveRight(function(){
            console.log('move right');
            return {
                message: 'move right'
            };
        });
    });

    server.get('/turn-left', function () {
        digger.turnLeft(function(){
           console.log('turn left');
            return {
                message: 'turn left'
            };
        });
    });

    server.get('/turn-right', function () {
        digger.turnRight(function(){
            console.log('turn right');
            return {
                message: 'turn right'
            };
        });
    });
    
    server.get('/stop-diggering', function () {
        digger.stopDiggering(function () {
            console.log('stop diggering');
            return {
                message: 'stop diggering'
            };
        });
    });
    server.get('/stop-moving', function () {
        digger.stopMoving(function () {
            console.log('stop moving');
            return {
                message: 'stop moving'
            };
        });
    });
    server.listen(6318);
    $('#led-b').turnOn();
});

$.end(function () {
    $('#led-b').turnOff();
});
