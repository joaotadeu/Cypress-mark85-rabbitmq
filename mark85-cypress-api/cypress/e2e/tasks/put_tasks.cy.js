/// <reference types= "cypress" />

describe('PUT /tasks', () => {

    beforeEach(function () {
        cy.fixture('tasks/put_tasks').then(function (tasks) {
            this.tasks = tasks
        })
    })

    context('Quando quero atualizar minhas tasks pelo ID', function () {
        
        it('PUT /tasks/:id Unique Task', function () {
            const { user, task } = this.tasks.unique

            cy.task('deleteTask', task.email, user.email)
            cy.task('deleteUser', user.email)
            cy.postUser(user)
            cy.postSession(user)
                .then(userResponse => {

                    cy.postTask(task, userResponse.body.token)
                        .then(taskResponse => {

                            cy.putUniqueTask(taskResponse.body._id, userResponse.body.token)
                                .then(response => {
                                    expect(response.status).to.eq(204)
                                })

                            cy.getUniqueTask(taskResponse.body._id, userResponse.body.token)
                                .then(response => {
                                    expect(response.status).to.eq(200)
                                })
                        })
                })
        })

    })

    context('Quando quero atualizar minhas tarefas pelo PUT', function () {

        it('PUT /tasks/ not_found', function () {

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


                            cy.putUniqueTask(taskResponse.body._id, userResponse.body.token)
                                .then(response => {
                                    expect(response.status).to.eq(404)
                                })

                        })
                })
        })

    })
})