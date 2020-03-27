const command = require('commander')
const mongoose = require('mongoose')

const MongooseDataSeeder = require('mongoose-data-seeder')

const dbUrl = 'mongodb+srv://thanus:thanus123@cluster0-tiu2e.mongodb.net/test?retryWrites=true&w=majority'
const Roles=require('./Models/rolemodel');
const Users=require('./Models/UserModel');

command
  .version('1.0.0')
  .option('-d --data [jsonfile]', 'seed data in json file')
  .parse(process.argv)

const jsonDataFile = command.data ? command.data : './data.json'

// connect to MongoDB
mongoose.connect(dbUrl, {dbName: 'test', autoIndex: false}, function(err){
  if (err) {
    console.log(`Failed to connect to MongoDB at ${dbUrl}`)
    console.log(err)
    process.exit(1)
  } else {
    console.log(`Connected to MongoDB, Prepare to load seed data from ${jsonDataFile} ...`)

    const seedData = require(jsonDataFile)

    const mongoSeeder = new MongooseDataSeeder({dropCollection: true})

    mongoSeeder
      .load(seedData)
      .then(function(dbData) {
        console.log("seedData is loaded into test database!")
        console.log(dbData)

        process.exit(0)
      })
      .catch(function(err) {
        console.log("Failed to load seedData into test database")
        console.log(err)

        process.exit(1)
      })
  }
})