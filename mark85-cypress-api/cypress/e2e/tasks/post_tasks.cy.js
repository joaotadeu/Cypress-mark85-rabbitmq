/// <reference types= "cypress" />

describe('POST /tasks', function () {

    beforeEach(function () {
        cy.fixture('tasks/post_tasks').then(function (tasks) {
            this.tasks = tasks
        })
    })

    context('Quando crio uma tarefa', function () {

        it('Então crio uma tarefa com sucesso', function () {

            const { user, task } = this.tasks.create

            cy.task('deleteUser', user.email, user.email)
            cy.postUser(user)

            cy.postSession(user)
                .then(userResponse => {
                    cy.log(userResponse.body.token)

                    cy.task('deleteTask', task.name)
                    cy.postTask(task, userResponse.body.token)
                        .then(response => {
                            expect(response.status).to.eq(200)
                            expect(response.body.name).to.eq(task.name)
                            expect(response.body.tags).to.eql(task.tags)
                            expect(response.body.is_done).to.be.false
                            expect(response.body.user).to.eq(userResponse.body.user._id)
                        })
                })
        })

        it('Então crio uma tarefa sem sucesso duplicada', function () {

            const { user, task, message } = this.tasks.tarefa_duplicada

            cy.task('deleteUser', user.email, user.email)
            cy.postUser(user)

            cy.postSession(user)
                .then(userResponse => {
                    cy.log(userResponse.body.token)

                    cy.task('deleteTask', task.name)
                    cy.postTask(task, userResponse.body.token)
                    cy.postTask(task, userResponse.body.token)
                        .then(response => {
                            expect(response.status).to.eq(409)
                            expect(response.body.message).to.eql(message.error)
                        })
                })
        })
    })
})