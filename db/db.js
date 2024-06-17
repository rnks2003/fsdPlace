/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'fsdPlace';
const collection = 'users';

// Create a new database.
use(database);

// Create a new collection.
db.createCollection(collection, {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["userName", "password", "email", "description", "isAdmin", "isActive"],
            properties: {
                userName: {
                    bsonType: "string",
                    description: "Username is required"
                },
                password: {
                    bsonType: "string",
                    description: "Password is required"
                },
                email: {
                    bsonType: "string",
                    description: "Email is required"
                },
                description: {
                    bsonType: "string",
                    description: "Description is required"
                },
                isAdmin: {
                    bsonType: "bool",
                    description: "isAdmin is required"
                },
                isActive: {
                    bsonType: "bool",
                    description: "isActive is required"
                }
            }
        }
    }
});

// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
