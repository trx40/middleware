# middleware
Middleware coding test

Clone the project
run `cd server`
run `npm install`
run `node index.js`

`cd ..`

cd into client
run `cd client`
run `npm install`
run `npm run dev`

To add logs

Send a JSON POST request to `localhost:3000/ingest` with application/json body
Sample input

[ 
  {"time":1685426731,"log":"lorem1 ipsum"},
  {"time":1685426732,"log":"lorem1 ipsum"},
  {"time":1685426733,"log":"lorem1 ipsum"}
]

API test on hoppscotch
![api-test]([/client/api-test.png](https://github.com/trx40/middleware/blob/master/client/api_test.png)https://github.com/trx40/middleware/blob/master/client/api_test.png)

Result on the frontend
![frontend]([/client/frontend.png](https://github.com/trx40/middleware/blob/master/client/frontend.png)https://github.com/trx40/middleware/blob/master/client/frontend.png)
