const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9pclo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('volunteer_net');
        const eventCollection = database.collection('events');

        // GET API
        app.get('/events', async (req, res) => {
            const cursor = eventCollection.find({});
            const events = await cursor.toArray();
            res.send(events);
        });

        // POST API
        app.post('/events', async (req, res) => {
            const event = req.body;
            console.log('hit the post api', event);

            const result = await servicesCollection.insertOne(event);
            console.log(result);
            res.json(result)
        });
    }
    finally {
        // await client.close()
    }

}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Volunteer network server');
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})