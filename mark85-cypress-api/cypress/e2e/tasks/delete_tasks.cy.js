/// <reference types= "cypress" />

describe('DELETE /tasks', () => {

    beforeEach(function () {
        cy.fixture('tasks/delete_tasks').then(function (tasks) {
            this.tasks = tasks
        })
    })

    context('Quando quero deletar minhas tasks pelo ID', function () {
        
        it('DELETE /tasks/:id Unique Task', function () {
            const { user, task } = this.tasks.unique

            cy.task('deleteTask', task.email, user.email)
            cy.task('deleteUser', user.email)
            cy.postUser(user)

            cy.postSession(user)
                .then(userResponse => {

                    cy.postTask(task, userResponse.body.token)
                        .then(taskResponse => {

                            cy.deleteTask(taskResponse.body._id, userResponse.body.token)
                                .then(response => {
                                    expect(response.status).to.eq(404)
                                })
                        })
                })
        })

    })

    context('Quando quero deletar minhas tarefas pelo GET', function () {

        it('DELETE /tasks/ not_found', function () {

            const { user, task } = this.tasks.not_found

            cy.task('deleteTask', task.email, user.email)
            cy.task('deleteUser', user.email)
            cy.postUser(user)

            cy.postSession(user)
                .then(userResponse => {

                    cy.postTask(task, userResponse.body.token)
                        .then(taskResponse => {

                            cy.api({
                                url: '/tasks/' + taskResponse.body._id,
                                method: 'DELETE',
                                headers: {
                                    authorization: userResponse.body.token
                                },
                                failOnStatusCode: false
                            }).then(response => {
                                expect(response.status).to.eq(204)
                            })

                            cy.api({
                                url: '/tasks/' + taskResponse.body._id,
                                method: 'DELETE',
                                headers: {
                                    authorization: userResponse.body.token
                                },
                                failOnStatusCode: false
                            }).then(response => {
                                expect(response.status).to.eq(404)
                            })

                        })
                })
        })

    })
})