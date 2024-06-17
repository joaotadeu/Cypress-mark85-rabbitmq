/// <reference types= "cypress" />

describe('GET /tasks', () => {

    beforeEach(function () {
        cy.fixture('tasks/get_tasks').then(function (tasks) {
            this.tasks = tasks
        })
    })

    context('Quando quero obter minhas tasks', function () {
        it('GET tasks', function () {
            const { user, tasks } = this.tasks.list

            cy.task('deleteTaskLike', 'Pagar')
            cy.task('deleteUser', user.email)
            cy.postUser(user)

            cy.postSession(user)
                .then(responseUser => {

                    tasks.forEach(function(t) {
                        cy.postTask(t, responseUser.body.token)
                    })

                    cy.api({
                        url: '/tasks',
                        method: 'GET',
                        headers: {
                            authorization: responseUser.body.token
                        },
                        failOnStatusCode: false
                    }).then( response => {
                        expect(response.status).to.eq(200)
                    }).its('body')
                        .should('be.an','array')
                        .and('have.length', tasks.length)
                })
        })
    })
})