import express from 'express';
import dotenv from 'dotenv';
import expressLayouts from 'express-ejs-layouts';

dotenv.config();
const app = express();

app.use('/public', express.static('./public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

import index from './routers/index';
import admin from './routers/admin';

app.use('/', index);
app.use('/admin', admin);

app.listen(process.env.NODE_PORT, () => {
    console.log(`Server listening on port ${process.env.NODE_PORT}`);
});