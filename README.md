# strigo-home-exercise

For this exercise I used [ws](https://github.com/websockets/ws) library, which is a very common and well maintained websockets library for node.js. 
For the frontend I used the browser's Websockets library.

## API Docs 
API docs for the backend (REST) can be found here: https://strigo-api.web.app/

## Design
Initial fetch is done via REST API and all of the realtime updates are managed by the websocket connection.
With mongoose hooks I managed to get the changed document (and it's associated EventId), to update all of the clients registered to the connected event - without adding extra code.

***Step 1***

Broadcast - Update all of the connected clients with all of the workspaces - with every change in any workspace.

***Step 2***

By clicking the specific event- The user will register to the event via a websocket message (websocket connections are mapped under EventId).
Upon leaving the event / closing the connection - the user will unregister from the event.

***Step 3***

We can further reduce the amount of data going through our websocket connection by:  
• Update specific changed workspaces - and not the whole workspaces for every event.

• Separate between realtime data and large amounts of data that does not require realtime  updates. For instance - we can upload attachment files to cloud storage and realtime-update only the link to those files, providing a way for downloading. 

## Running instructions
Developed under:
```
ubuntu v21.04
node v14.12.0
mongodb v4.4.6
```
Prerequisites
---
[node.js](https://github.com/nodesource/distributions/blob/master/README.md)
[nvm](https://github.com/nvm-sh/nvm)
mongodb

Backend
---
```bash
cd back 
nvm install
npm install
cp .env.example .env (and edit per your environment settings)
```

```bash
[optional - fake data seed]
npm run seed
```
```bash
npm start
```

Frontend
---
```bash
cd front
nvm install
yarn
cp .env.example .env (and edit per your environment settings)
yarn start
```

## Websockets implementations comparison
Felix did a pretty comprehensive analysis in during recent websocket exercise - you can find it here :
https://github.com/guzzur/client-server-ws/blob/main/docs/ws-comparison.md

I'll just add to one comment to the RT DBs section. This section refer to ***Firebase realtime database*** and not ***Firestore*** - which can be scaled up to 1 million concurrent connections.
Deeper comparison can be found here:
https://firebase.google.com/docs/database/rtdb-vs-firestore
 

## Real world solution using firestore - Suggestion
We can use RT DBs to maintain a fairly scalable solution, while benefiting from a managed service and improving time to market.
My suggestion, as described in this chart - is to only send the update timestamp for each field via this service (which implement websockets under the hood) and thus requiring the server to fetch only the needed data via our Rest API.

***Pros:***
* Easier implementation and lower time-to-market.
* Well maintained and documented service.
* We'll only use it for updates- so we aren't relying on it for our main data source, and also reducing the pricing (and performance) significantly.
* Very powerful when coupled with other firebase services, like authentication, storage, etc.

***Cons***
* Google is known to be kind of [self-cannibalistic](https://killedbygoogle.com/) 
* Can be pricy at scale.

![enter image description here](https://firebasestorage.googleapis.com/v0/b/strigo-live-exercise.appspot.com/o/Microservices%20Diagram%20-%20strigo.png?alt=media&token=6344cd58-a2e2-4754-b649-bae72255493e)
