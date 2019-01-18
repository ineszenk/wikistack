const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const layout = require('./views/layout')
const { db } = require('./models');
const index = require('./models/index')
const models = require('./models')
const userRouter = require('./routes/user')
const wikiRouter = require('./routes/wiki')

const app = express()
const port = 3000

app.use(express.urlencoded({extended :false}))
app.use('/wiki', wikiRouter)
// app.use('/user', userRouter)
app.use(morgan('dev'))
app.use(express.static('public'))

app.get('/', function(req, res){
    res.redirect('/wiki')
})


db.authenticate().
then(() => {
  console.log('connected to the database');
})

const init = async () => {
    try{
 await models.db.sync({force: true})
    } catch (error){
console.error(error.message)
    }
    app.listen(port, ()=> console.log(`Wikistack listen port ${port}`))
}

init()