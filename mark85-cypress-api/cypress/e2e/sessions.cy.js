/// <reference types= "cypress" />

describe('POST /sessions', () => {

    context('user /sessions', () => {

        it('sessao do usuario com sucesso', () => {

            const userDados = {
                name: 'Manu dos anjos',
                email: 'manudosanjos@gmail.com',
                password: '123qwe'
            }

            cy.task('deleteUser', userDados.email)
            cy.postUser(userDados)

            cy.postSession(userDados)
                .then(response => {
                    expect(response.status).to.eq(200)
                    const { token } = response.body
                    expect(response.body)
                    expect(token).not.to.be.empty
                    cy.log(token)
                })
        })

        it('sessao do usuario sem sucesso', () => {

            const user = {
                email: 'joaotadeu@gmail.com',
                password: '123qw1'
            }

            cy.postSession(user)
                .then(response => {
                    expect(response.status).to.eq(401)
                })

        })

        it('sessao do usuario nao encontrado', () => {

            const user = {
                email: 'joaaotadeu@gmail.com',
                password: '123qw1'
            }

            cy.postSession(user)
                .then(response => {
                    expect(response.status).to.eq(401)
                })

        })

    })
})