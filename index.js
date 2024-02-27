const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())

/*
      -Query params => meusite.com/users?nome=rodolfo&age=28  // filtros
      - Route params => /users/2        // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
      - Request Body => {"name":"Rodolfo", "age":}

      - GET           => BUSCAR UMA INFORMAÇÃO NO BACK-END
      - POST          => CRIAR INFORMAÇÕES NO BACK-END
      - PUT / PATCH   => ALTERAR OU ATUALIZAR INFORMAÇÕES NO BACK-END
      - DELETE        => DELETAR INFORMAÇÕES NO BACK-END

      - MIDDLEWARE => INTERCEPTADOR => tem o poder de parar ou alterar dados sa requisição
*/

const users = []

const checkUserId = (request, response, next)=>{
      const {id} = request.params

      const index = users.findIndex(user => user.id === id)

      if(index <0){
            return response.status(404).json({erro: "User not found"})
      }

      request.userIndex = index
      request.userId = id

next()
}

app.get('/users', (request, response) => {
      return response.json(users)
})

app.post('/users', (request, response) => {
      const { name, age } = request.body

      const user = { id: uuid.v4(), name, age }

      users.push(user)

      return response.status(201).json(user)
})

app.put('/users/:id', checkUserId , (request, response) => {
        
      const { name, age } = request.body
          const index = request.userIndex
          const id = request.userId

      const updateUser = { id, name, age }

      user[index] = updateUser

      return response.json(updateUser)
})

app.delete('/users/:id',  checkUserId , (request, response) => {   
      const index = request.userIndex
      
      users.splice(index,1)
      
      return response.status(204).json()
})












app.listen(port, () => {
      console.log(`Server Started on port ${port}`)
})