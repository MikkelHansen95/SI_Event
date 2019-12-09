const express = require('express')
const Event = require('./event.js');
var cors = require('cors')
const app = express();
var fs = require('fs');
const port = 3001;
app.use(express.json())
app.use(cors());

let events = [new Event(10,"party"),new Event(100,"LAN"),new Event(200,"Board games"),new Event(700,"Fashion show")]
app.post('/event/:name', function (req, res) {
    try {
        console.log(process.cwd())
        var data = fs.readFileSync('number.txt', { encoding: 'utf8' })
        console.log(data);
        var number = parseInt(data);
        let myEvent = new Event(number,req.params.name);
        events.push(myEvent)
        var newNumber = number+1;
        fs.writeFile("number.txt", newNumber , (err) => {
            if (err) throw err;
            console.log("succes overwriting file")
        });
        res.send({id: number});

    } catch (e) {
        console.log(e)
        res.send({ message: "Error occured" })
    }
})

app.get('/event/all', function (req, res) {
    res.send(JSON.stringify(events))
})

app.get('/event/:eventId', function (req, res) {
    let incomingID = parseInt(req.params.eventId)
    for (var i = 0; i < events.length; i++){
        console.log(events[i].id)
        if (events[i].id === incomingID){
            return res.send(JSON.stringify(events[i]))
        }

        if(i === events.length-1){
            return res.send({message: "event doesn't exists"})
        }
    }
    
})

app.listen(port, () => console.log(`Event is running!` + JSON.stringify(events)))