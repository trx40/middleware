const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const fs = require('fs')

app.use(cors())
app.use(express.json());

// const myLogger = function (req, res, next) {
//     console.log('LOGGED')
//     next()
// }
  
// app.use(myLogger)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/logs', (req,res) => {
    fs.readFile('./logs.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
})

app.post('/ingest', (req,res) => {
    let newlogs = req.body;

    let logsjson = fs.readFileSync("logs.json", "utf-8")
    let logs = JSON.parse(logsjson);
    
    for (let n of newlogs){
        logs.push(n);
    }
    logsjson = JSON.stringify(logs);
    fs.writeFileSync("logs.json",logsjson,"utf-8");
    res.send("Logs written");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

