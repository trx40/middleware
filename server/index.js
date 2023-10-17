const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const WebSocket = require('ws');
const fs = require('fs')

app.use(cors())
app.use(express.json());

// const myLogger = function (req, res, next) {
//     console.log('LOGGED')
//     next()
// }
  
// app.use(myLogger)
const wss = new WebSocket.Server({noServer: true});
const clients = new Set();

app.server.on('upgrade', (request,socket,head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

wss.on('connection', (ws) => {
    clients.add(ws);

    ws.on('close', () => {
        clients.delete(ws);
    });
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.get('/logs', (req,res) => {
//     fs.readFile('./logs.json', (err, json) => {
//         let obj = JSON.parse(json);
//         res.json(obj);
//     });
// })

app.post('/ingest', (req,res) => {
    let newlogs = req.body;

    let logsjson = fs.readFileSync("logs.json", "utf-8")
    let logs = JSON.parse(logsjson);
    
    for (let n of newlogs){
        logs.push(n);
    }
    logsjson = JSON.stringify(logs);
    fs.writeFileSync("logs.json",logsjson,"utf-8");
    broadcastLogs(logsjson);
    res.send("Logs written");
})

function broadcastLogs(logs) {
    const logData = JSON.stringify(logs);
    clients.forEach((client) =>{
        if(client.readyState === WebSocket.OPEN) {
            client.send(logData);
        }
    })
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

