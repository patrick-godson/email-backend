const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const Email = require("./models/emailModel");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));


dotenv.config();

mongoose.
connect(process.env.MONGODB_CONNECTION_URI)
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch (()=>{
    console.log(error);
})

app.get("/", async (req, res) => {
    try{
        const emails = await Email.find({});

        let unreadMessages = 0;

        emails.forEach(element => {
            if(element.isRead == "false") unreadMessages++;
        });

        res.status(200).json({totalMessages: emails.length, unread: unreadMessages});
    } catch {
        res.status(500).json({message: error.message});
    }
})

app.get("/inbox", async (req, res) => {
    try{
        const emails = await Email.find({});
        res.status(200).json(emails);
    } catch {
        res.status(500).json({message: error.message});
    }
})

app.get("/message/:id", async(req, res) =>{
    try{
        const {id} = req.params;
        const email = await Email.findByIdAndUpdate(id, {'isRead': 'true'});
        res.status(200).json(email);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

const port = process.env.PORT || 3500;

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
});