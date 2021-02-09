const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

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

//Read dev-data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Importring dev-data into database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('File read and tours created suyccessfully.');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// delete all data from the db
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('All tours deleted suyccessfully.');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
}
if (process.argv[2] === '--delete') {
  deleteData();
}
