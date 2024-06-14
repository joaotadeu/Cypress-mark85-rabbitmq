/// <reference types= "cypress" />

describe('Criação de Usuario', () => {

  context('Dado que vou criar um Usuario', () => {

    it('Quando crio um usuario com sucesso', () => {

      const user = {
        name: 'João Tadeu',
        email: 'joaotadeu@gmail.com',
        password: '123qwe'
      }

      cy.task('deleteUser', user.email)

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(200)
        })

    })

    it('Quando crio um usuario com duplicidade', () => {

      const user = {
        name: 'Diana anjos',
        email: 'DianaAnjos@gmail.com',
        password: '123qwe'
      }

      cy.task('deleteUser', user.email)

      cy.postUser(user)

      cy.postUser(user)
        .then(response => {
          const { message } = response.body
          expect(response.status).to.eq(409)
          expect(message).to.eq('Duplicated email!')
        })

    })

    context('Dado que vou criar um usuario sem campo obrigatorio' , () => {

      it('Quando crio um usuario sem name campo obrigatorio', () => {

        const user = {
          name: 'Maria José Soares Pereira',
          email: 'mariajose@gmail.com',
          password: '123qwe'
        }
  
        cy.task('deleteUser', user.email)
  
        delete user.name
  
        cy.postUser(user)
          .then(response => {
            const { message } = response.body
            expect(response.status).to.eq(400)
            expect(message).to.eq('ValidationError: \"name\" is required')
          })
      })
  
      it('Quando crio um usuario sem email campo obrigatorio', () => {
  
        const user = {
          name: 'João Pereira de Alencar',
          email: 'JoaoP@gmail.com',
          password: '123qwe'
        }
        
        cy.task('deleteUser', user.email)
  
        delete user.email
  
        cy.postUser(user)
          .then(response => {
            const { message } = response.body
            expect(response.status).to.eq(400)
            expect(message).to.eq('ValidationError: \"email\" is required')
          })
      })
  
      it('Quando crio um usuario sem password campo obrigatorio', () => {
  
        const user = {
          name: 'Maria adiliane anjos',
          email: 'maria@gmail.com',
          password: '123qwe'
        }
        
        cy.task('deleteUser', user.email)
  
        delete user.password
  
        cy.postUser(user)
          .then(response => {
            const { message } = response.body
            expect(response.status).to.eq(400)
            expect(message).to.eq('ValidationError: \"password\" is required')
          })
      })

    })

  })
})