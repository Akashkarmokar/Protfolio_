import { initDBConnection } from '../../graphql/core/db.js'
import * as chai from 'chai'


before(async ()=> {
    await initDBConnection()
})


/** 
 *  Code for global Configuration Example Code 
 * 
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

before(async function() {
  // Increase the timeout for database connection if needed
  this.timeout(10000);

  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
});

after(async function() {
  try {
    await mongoose.disconnect();
    console.log('Database disconnected successfully.');
  } catch (error) {
    console.error('Error disconnecting from the database:', error);
  }
});

module.exports = { expect };

 */