import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import dbConfig from './config/database';
import application from './config/application';
import { ItemsRouter } from './router/itemsRouter';

const itemRouter = new ItemsRouter();
class Server {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.initializMongoDb();
        this.config();
        this.routes();
    }
    /**
     * config
     */
    public config = () => {
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.intializeCors();
        this.globalError();
    }
    public intializeCors = () => {
        // cors
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Methods',
                'GET, POST, PUT, DELETE, OPTIONS',
            );
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials',
            );
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }
    /**
     * initializMongoDb 
     */
    public initializMongoDb() {
        const mongo_url = dbConfig.url;
        mongoose.connect(mongo_url);
    }
    /**
     * routes
     */
    public routes = () => {
        const router: express.Router = express.Router();
        this.app.use('/', router);
        this.app.use('/api/v1/items', itemRouter.router);
    }
    public globalError = () => {
        process.on('uncaughtException', (err) => {
            console.log('Caught exception: ' + err);
        });

        process.on('unhandledRejection', (err) => {
            console.log('Caught Rejecction: ' + err);
        })
    }
}

export default new Server().app;