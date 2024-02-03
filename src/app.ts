import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { CosmosClient } from '@azure/cosmos';
import * as config from './secrets.json';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Set X-Content-Type-Options header to disable strict MIME type checking
app.use((req, res, next) => {
  res.header('X-Content-Type-Options', 'nosniff');
  next();
});

// Azure Cosmos DB setup
const cosmosEndpoint = config.endpoint
const cosmosKey = config.key;
const cosmosClient = new CosmosClient({ endpoint: cosmosEndpoint, key: cosmosKey });
const databaseId = 'connections';
const containerId = 'entries';

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/index.html');
});

// Express route for handling submissions
app.post('/submit', async (req: Request, res: Response) => {
  try {
    const { userId, buttonLabel } = req.body;

    // Check if the database contains a record with this user's unique identifier
    const { container } = await cosmosClient.database(databaseId).container(containerId).items;
    const { resources } = await container.items.query({
      query: 'SELECT * FROM c WHERE c.userId = @userId',
      parameters: [{ name: '@userId', value: userId }],
    }).fetchAll();

    let userRecord = resources[0];

    // If user record exists, update it; otherwise, insert a new record
    if (userRecord) {
      userRecord.lastButtonPressed = buttonLabel;
      userRecord.timestamp = new Date().toISOString();

      await container.item(userRecord.id, userId).replace(userRecord);
    } else {
      userRecord = {
        userId,
        lastButtonPressed: buttonLabel,
        timestamp: new Date().toISOString(),
      };

      await container.items.create(userRecord);
    }

    res.status(200).send('Submission successful');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
