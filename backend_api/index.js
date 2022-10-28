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
})

app.get('/contacts', (req, res) => {
    res.send(data);
})

app.get('/contactById/:id', (req, res) => {
    const contact = data.find(c => parseInt(req.params.id) === c.id);
    
    if(!contact) return res.status(404).send('contact not found')
    
    res.send(contact)
    
})

app.post('/new_contact', async (req, res) => {
    const schema = Joi.object({
        full_name: Joi.string().min(3).required()
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

app.put('/contactById/:id', async (req, res) => {
    const contact = data.find(c => parseInt(req.params.id) === c.id);
    if(!contact) return res.status(404).send('contact not found')
    
    try {
            
        contact.full_name = req.body.full_name == null ? contact.full_name : req.body.full_name
        contact.nick_name = req.body.nick_name == null ? contact.nick_name : req.body.nick_name
        contact.job = req.body.job == null ? contact.job : req.body.job
        contact.sex = req.body.sex == null ? contact.sex : req.body.sex
        contact.phone_number = req.body.phone_number == null ? contact.phone_number : req.body.phone_number
        contact.email = req.body.email == null ? contact.email : req.body.email
        contact.telegram = req.body.telegram == null ? contact.telegram : req.body.telegram
        contact.linked_in = req.body.linked_in == null ? contact.linked_in : req.body.linked_in
        contact.github = req.body.github == null ? contact.github : req.body.github
        contact.twitter = req.body.twitter == null ? contact.twitter : req.body.twitter
        contact.Street = req.body.Street == null ? contact.Street : req.body.Street
        contact.City = req.body.City == null ? contact.City : req.body.City
        contact.State = req.body.State == null ? contact.State : req.body.State
        contact.Country = req.body.Country == null ? contact.Country : req.body.Country
            
        res.send(contact)
    } catch (error) {
        res.status(400).end(error)
    }
    
})

app.delete('/contactById/:id', (req, res) => {
    const contact = data.find(c => parseInt(req.params.id) === c.id);
    
    if(!contact) return res.status(404).send('contact not found')
    
    const index = data.indexOf(contact)
    data.splice(index, 1)
        
    res.send(contact)
    
})