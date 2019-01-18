const express = require('express')
const router = express.Router()
const layout = require('../views/layout')
const { Page } = require("../models");
const { addPage } = require("../views");

console.log(Page)

router.get('/', (req, res, next)=>{
    res.send(layout(''))
    next()
})

router.post('/', async (req, res, next)=>{
    try {
        console.log(Page)
        const page = await new Page({
            title: req.body.title,
            content: req.body.content, 
          });
        await page.save()
        res.redirect('/wiki')
    } catch (error) {
        next(error)
    }  
})

router.get('/add', (req, res,next)=>{
res.send(addPage())
})


module.exports = router
