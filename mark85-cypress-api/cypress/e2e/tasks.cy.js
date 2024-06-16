/// <reference types= "cypress" />

describe('POST /tasks', function () {

    beforeEach(function () {
        cy.fixture('tasks').then(function (tasks) {
            this.tasks = tasks
        })
    })

    context('Quando crio uma tarefa', function () {

        it('Então crio uma tarefa com sucesso', function () {

            const { user, task } = this.tasks.create

            cy.task('deleteUser', user.email)
            cy.postUser(user)

            cy.task('deleteTask', task.name)
            cy.postSession(user)
                .then(response => {
                    cy.log(response.body.token)
                    cy.api({
                        url: '/tasks',
                        method: 'POST',
                        body: task,
                        headers: {
                            authorization: response.body.token
                        },
                        failOnStatusCode: false
                    }).then(response => {
                        expect(response.status).to.eq(200)
                    })
                })
        })
    })
})