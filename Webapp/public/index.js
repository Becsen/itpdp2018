// source: https://www.youtube.com/watch?v=LOeioOKUKI8
// const functions = require('firebase-functions')
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')

/* Opsæt view-engine */
const app = express()
const port = 5004

app.engine('.hbs', exphbs({
  defaultLayout: 'index',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, '/views/layouts')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (request, response, next) => {
  response.redirect('/uge')
})

app.get('/uge', (request, response, next) => {
  response.render('uge')
})

app.get('/opret', (request, response, next) => {
  response.render('opret')
})

// exports.app = functions.https.onRequest(app)
app.listen(port, (err) => {
  if (err) return console.error(`An error occurred: ${err}`)
  console.log(`Listening on http://localhost:${port}/`)
})
/*
1) Bestem ID til aftaler
2) Tilføj oplæst tekst til
 Læs antal aftaler op for en dag: https://firebase.google.com/docs/database/admin/retrieve-data
 ref.once("value", function(snap) {
  console.log("initial data loaded!", snap.numChildren() === count);

  .on() dokumentation: https://firebase.google.com/docs/reference/js/firebase.database.Query.html#on
}); */
