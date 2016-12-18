import {createConnection, ConnectionOptions} from 'typeorm';
import {Color} from './color';

export class Data {
    
    private connectionOptions: ConnectionOptions;

    constructor() {
        this.connectionOptions = {
            driver: {
                type: 'sqlite',
                host: 'localhost',
                username: 'username',
                password: 'password',
                database: 'colors',
                storage: './test.db'
            },
            entities: [
                Color
            ],
            autoSchemaSync: true
        };
    }

    public insertData(name: string, amount: number) {

    }

    public getAllData() {
        
    }

}