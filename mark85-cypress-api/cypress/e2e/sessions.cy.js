/// <reference types= "cypress" />

describe('POST /sessions', () => {

    beforeEach(function () {
        cy.fixture('users').then(function (users) {
            this.users = users
        })
    })

    context('user /sessions', function () {
        it('sessao do usuario com sucesso', function () {

            const userDados = this.users.login

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

        it('sessao do usuario sem sucesso', function () {

            const user = this.users.senha_invalida

            cy.postSession(user)
                .then(response => {
                    expect(response.status).to.eq(401)
                })

        })

        it('sessao do usuario nao encontrado', function () {

            const user = this.users.email_404

            cy.postSession(user)
                .then(response => {
                    expect(response.status).to.eq(401)
                })

        })
    })
})