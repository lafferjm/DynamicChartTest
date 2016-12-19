"use strict";
var loki = require("lokijs");
var Data = (function () {
    function Data() {
        this.database = new loki('test.db');
        this.colors = this.database.getCollection('colors');
        if (!this.colors) {
            this.colors = this.database.addCollection('colors');
            this.colors.insert({ color: "Red", count: 12 });
            this.colors.insert({ color: "Blue", count: 19 });
            this.colors.insert({ color: "Yellow", count: 3 });
            this.colors.insert({ color: "Green", count: 5 });
            this.colors.insert({ color: "Purple", count: 2 });
            this.colors.insert({ color: "Orange", count: 3 });
        }
        this.database.saveDatabase();
    }
    Data.prototype.getAllData = function () {
        return this.colors.find();
    };
    return Data;
}());
exports.Data = Data;
