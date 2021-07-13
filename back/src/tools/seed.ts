// Load the environment variables
require("dotenv").config();

import faker from "faker";
import { MongoClient } from "mongodb";
import assert from "assert";
import _ from "lodash";

// Connection URL
const url = <string>process.env.MONGODB_URI;

const WORKSPACE_STATUSES = [
  "offline",
  "preparing",
  "ready",
  "terminated",
  "deleted",
];

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);

  const db = client.db();

  // get access to the relevant collections
  const eventsCollection = db.collection("events");
  const workspacesCollection = db.collection("workspaces");
  // make a bunch of events
  let events = [];

  for (let i = 0; i < 7; i += 1) {
    const name = faker.name.title();
    let newEvent: any = {
      name,
    };
    events.push(newEvent);

    console.log(newEvent.name);
  }
  eventsCollection.insertMany(events);

  // make a bunch of workspaces
  let workspaces = [];
  for (let i = 0; i < 50; i += 1) {
    let newWorkspace = {
      owner: faker.internet.email(),
      status: _.sample(WORKSPACE_STATUSES),
      eventId: _.sample(events)?._id,
      createdAt: new Date(),
    };
    workspaces.push(newWorkspace);
    console.log(newWorkspace.owner);
  }
  workspacesCollection.insertMany(workspaces);
  console.log("Database seeded! :)");
  client.close();
});
