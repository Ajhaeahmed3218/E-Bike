const { MongoClient, ServerApiVersion } = require("mongodb");

let db ;

const connectDB = async () => {
    if (db) return db ; 

    try {
        const uri = process.env.NEXT_MONGODB_URI;
        const client = new MongoClient(uri, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
          });
        await client.connect()
        db = client.db('next-hero')
        console.log('connected to mongoDB', );
        return db
    } catch (error) {
        console.log(error);
    }

}

export default connectDB;