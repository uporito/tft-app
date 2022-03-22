const express = require('express');
const mongoose = require('mongoose');
const app = express();

const name = "Clockwork";

// schemas
const Champion = require('./models/champion.js');
const Synergy = require('./models/synergy.js');

// connecting to mongodb
const dbURI = 'mongodb+srv://uporito:a9lP7URsQ8xnowhl@uporito.m6lrh.mongodb.net/tft-app?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser : true, useUnifiedTopology : true })
    .then((result) => app.listen(3000, console.log('Listening on port 3000...')))
    .catch((e) => console.log(e))

// ejs view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended : true }));

// generic routes
app.get('/', (req, res) => {
    res.render('index', { title : 'Home' });
})

app.get('/calc', (req, res) => {
    res.render('calc', { title : 'Calc' });
})

app.get('/create', (req, res) => {
    res.render('create', { title : 'Create' });
})

// champions routes
app.get('/champions', (req, res) => {
    Champion.find()
        .then((result) => res.render('champions', { title : 'Champions', champions : result }))
        .catch((e) => console.log(e))
})

app.get('/champions/:id', (req, res) => {
    const id = req.params.id;
    Champion.findById(id)
        .then((result) => res.render('champion-details', { title : 'Details', champion : result }))
        .catch((e) => console.log(e))
})

app.post('/champions', (req, res) => {
    const champion = new Champion(req.body);
    champion.save()
        .then((result) => {
            res.redirect('/champions')
        })
        .catch((e) => console.log(e))
})

app.put('/champions/:id', (req, res) => {
    console.log(JSON.parse(req.body));
    const id = req.params.id;
    Champion.findByIdAndUpdate(id, req.body)
        // .then(result => { res.json({ redirect : '/champions' })})
        .then(result => console.log(result))
        .catch((e) => console.log(e))
})

app.delete('/champions/:id', (req, res) => {
    const id = req.params.id;
    Champion.findByIdAndDelete(id)
        .then(result => { res.json({ redirect : '/champions' })})
        .catch((e) => console.log(e))
})

// comp Routes
app.get('/comp', (req, res) => {
    Synergy.find()
        .then((result) => res.render('comp', { title : 'Comp', synergies : result }))
        .catch((e) => console.log(e))
})


// mongodb sandbox routes
app.get('/new-synergy', (req, res) => {
    const synergy = new Synergy({
        name : 'Mutant', champions : ['Kaisa', 'Khazix', 'Malzahar', 'Chogath', 'Reksai', 'Kassadin']
    })

    synergy.save()
        .then((result) => res.send(result))
        .catch((e) => console.log(e))
})

app.get('/delete-synergy/:id', (req, res) => {
    const id = req.params.id;
    Synergy.findByIdAndDelete(id)
        .then(result => res.send(result))
        .catch((e) => console.log(e))
})

app.get('/new-champ', (req, res) => {
    const champion = new Champion({
        name : 'Jhin', synergies : ['Sniper', 'Clockwork'], cost : 4
    });
    
    champion.save()
        .then((result) => res.send(result))
        .catch((e) => console.log(e))
})



app.use((req, res) => res.render('404', { title : '404' }));