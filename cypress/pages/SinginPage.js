class SigninPage {

    //acessa a pagina inicial
    acessPage() {
        cy.visit('/')
    }

    //preenche os dados de login
    fillForm(login) {
        //Dados de login
        cy.get('input[name="user-name"]').type(login.userName),
            cy.get('input[name="password"]').type(login.password)
    }

    //envia informações do formulário, clica no login
    submit() {
        cy.get('input[type="submit"]').click()
    }

    // logoff do app
    logoff() {
        cy.get('a[id="logout_sidebar_link"]')
            .should('be.visible')
            .click()
    }

    //valida mensagens de erros
    alertMessageShouldBe(expectedMessage) {
        cy.contains('form h3', expectedMessage).should('be.visible')
    }
}

export default new SigninPage;