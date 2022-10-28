const express = require('express')
const data = require('./data.json')
const cors = require('cors');
const Joi = require('joi');

const app = express()
app.use(express.json())
app.use(cors());

const port = process.env.PORT || 5000

app.listen(port, ()=>console.log(`listening on port ${port}`));

app.get('/', (req, res) => {
    res.send('hello world')
    res.end()
})

app.get('/contacts', (req, res) => {
    res.send(data);
})

app.get('/contactById/:id', (req, res) => {
    const contact = data.find(c => parseInt(req.params.id) === c.id);
    if(!contact){
        res.end('not found')
    }else{
        res.end(contact)
    }
})

app.post('/new_contact', async (req, res) => {
    const schema = Joi.object({
        full_name: Joi.string().min(3).required()
    }) 

    schema.validate({
        full_name: req.body.full_name
    })

    try {
        await schema.validateAsync({
            full_name: req.body.full_name
        }) 
        const contact = {
            id: (data.length > 0) ? (data[data.length - 1].id + 1) : 1,
            full_name: req.body.full_name,
            nick_name: req.body.nick_name,
            job: req.body.job,
            sex: req.body.sex,
            phone_number: req.body.phone_number,
            email: req.body.email,
            telegram: req.body.telegram,
            linked_in: req.body.linked_in,
            github: req.body.github,
            twitter: req.body.twitter,
            address: {
                Street: req.body.Street,
                City: req.body.City,
                State: req.body.State,
                Country: req.body.Country
            }
        }
        data.push(contact)
        res.send(contact)
    } catch (error) {
        res.status(400).end(error.details[0].message)
        
    }

        


})