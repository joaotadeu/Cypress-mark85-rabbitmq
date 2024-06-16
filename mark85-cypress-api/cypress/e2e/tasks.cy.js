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

            cy.task('deleteUser', user.email, user.email)
            cy.postUser(user)

            cy.postSession(user)
                .then(response => {
                    cy.log(response.body.token)
                    
                    cy.task('deleteTask', task.name)
                    cy.postTask(task, response.body.token)
                        .then(response => {
                            expect(response.status).to.eq(200)
                        })
                })
        })

    })
})