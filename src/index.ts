import 'reflect-metadata';
import { createKoaServer } from 'routing-controllers';
import setupDb from './db';
import Controller from './controller';

const port = process.env.PORT;

const app = createKoaServer({
    controllers: [Controller],
});

setupDb()
    .then(_ => app.listen(port, () => console.log(`Listening on port ${port}`)))
    .catch(err => console.error(err));
