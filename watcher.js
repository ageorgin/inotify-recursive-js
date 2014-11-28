/* jshint node: true */
"use strict";

var watcher = require("./inotify-recursive");
var request = require('request');
var querystring = require('querystring');

var exclude = ["manuel", "a_traiter", "error"];
var Watcher = new watcher.Watcher("/share/si-video/ingestions/", exclude);

Watcher.on("newfile", function(file) {
	console.log("UOWWWWW, we have a new file: " + file);


    var url = 'http://webservices.ftv-local.fr/tools/siva/notifier?' + querystring.stringify({file: file});
    console.log("Notification SIVA sur " + url);

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    });
});