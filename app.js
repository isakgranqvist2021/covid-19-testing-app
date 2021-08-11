import express from 'express';
import dotenv from 'dotenv';
import expressLayouts from 'express-ejs-layouts';
import { connect, disconnect } from './utils/database';
import { alerts } from './utils/database';

connect();

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/public', express.static('./public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true, 
  cookie: { 
      secure: process.env.NODE_ENV === 'production'
  },
 store: MongoStore.create({
    mongoUrl: 'mongodb://user12345:foobar@localhost/test-app?authSource=admin&w=1',
    mongoOptions: advancedOptions // See below for details
  })
}));  

import index from './routers/index';
import admin from './routers/admin';

app.use('*', alerts);
app.use('/', index);
app.use('/admin', admin);

app.listen(process.env.NODE_PORT, () => {
    console.log(`Server listening on port ${process.env.NODE_PORT}`);
}); 