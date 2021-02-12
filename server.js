const mongoose = require('mongoose');
const dotenv = require('dotenv');

// All uncaught SYNC  error exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!!! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection was successful !'));

const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});

// All ASYNC unhandled promise rejectrions handler
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDALED REJECTION!!! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
