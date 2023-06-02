const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

//Get all
app.get('/api/persons',(request,response)=>{
  response.json(persons)
})

app.get('/api/persons/:id',(request,response)=>{
  const id = Number(request.params.id);
  const person = persons.find(p=> p.id === id);
  if(person){
  response.json(person)
  }else{
    response.status(404).end()
  }

})

app.delete('/api/persons/:id',(request,response)=>{
  const id = Number(request.params.id);
  persons = persons.filter(p => p.id !== id);
  response.status(204).end()
})

app.post('/api/persons',(request,response)=>{
  const {name,number} = request.body;
  const maxId = persons.length>0 ? Math.max(...persons.map(p=>p.id)):0;
  const entry = { id:maxId+1,name:name, number:number}
  console.log(entry)
  persons.push(entry)
  response.send(`${entry.name} added to the database`)


})

app.put('/api/persons/:id',(request,response)=>{
  const id = Number(request.params.id);
  const{name,number} = request.body;
  console.log(id,name,number)
  const tempPerson = persons.find(p=> p.id === id);
  if(name){
    tempPerson.name = name;
  }
  if(number){
    tempPerson.number = number
  }
  persons = persons.map(p=> p.id !== id ? p : tempPerson);
  response.status(204).end();

})

app.get('/info',(request,response)=>{
  const now = new Date();
  const str = `Phonebook has info for ${persons.length} people <br> ${now}`
  response.send(str)
 
})

const PORT= 3001;
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})