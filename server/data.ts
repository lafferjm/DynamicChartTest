import loki = require('lokijs');

export class Data {
    
    private database: Loki;
    private colors: LokiCollection<{}>;

    constructor() {
        this.database = new loki('test.db');
        this.colors = this.database.getCollection('colors');
        if(!this.colors) {
            this.colors = this.database.addCollection('colors');
            this.colors.insert({color: "Red", count: 12});
            this.colors.insert({color: "Blue", count: 19});
            this.colors.insert({color: "Yellow", count: 3});
            this.colors.insert({color: "Green", count: 5});
            this.colors.insert({color: "Purple", count: 2});
            this.colors.insert({color: "Orange", count: 3});
        }
        this.database.saveDatabase();
    }

    public getAllData() {
        return this.colors.find();
    }

    public insertData(name: string, amount: number) {
        this.colors.insert({color: name, count: amount})
    }
}