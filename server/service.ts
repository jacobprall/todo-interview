import express from 'express'
import apiV1 from './api'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import {TodoService} from "./services/TodoService";
import {ApplicationService} from "./services";
import pg from 'pg'
import { TodoDatabaseClient } from 'db/todo'

class Service {
    private readonly _express: express.Application
    private readonly _appServices: Map<string, ApplicationService>
    client: pg.Client;

    get express(): express.Application {
        return this._express;
    }

    get appServices(): Map<string, ApplicationService> {
        return this._appServices;
    }

    constructor(connectionString: string) {
        this._express = express();
        this._appServices = new Map<string, ApplicationService>();
        this.client = new pg.Client({ connectionString });
        this.setUp();
    }

    public setUp(): void {
        this.setApplicationServices()
        this.setMiddlewares()
        this.setRoutes();
    }

    protected setApplicationServices() {
        this.appServices.set(TodoService.getType(), new TodoService(new TodoDatabaseClient(this.client)))
    }

    public setRoutes(): void {
        this._express.use('', apiV1)
    }

    private setMiddlewares(): void {
        this._express.use(cors())
        this._express.use(morgan('dev'))
        this._express.use(bodyParser.json())
        this._express.use(bodyParser.urlencoded({extended: false}))
        this._express.use(helmet())
    }
}

export default new Service('postgresql://local:local@localhost:5432/interview');