'use strict';
const

    fs = require('fs'),
    net = require('net'),

    filename = process.argv[2],

    server = net.createServer(function(connection) {
        // reporting
        console.log("Subscriber connected!!!");
        connection.write("no watching" + filename + "for changes... \n");
        //watcher setup
        let watcher = fs.watch(filename, function() {
            connection.write("file '" + filename + "' changed: " + Date.now() + "\n");
        });
        //cleanup
        connection.on('close', function() {
            console.log('subscriber disconnected.');
            watcher.close();
        });
    });

    if (!filename) {
        throw Error('No target filename was specified.');
    }

    server.listen('tmp/watcher.sock', function(){
        console.log('Listening for subscribers');
    });