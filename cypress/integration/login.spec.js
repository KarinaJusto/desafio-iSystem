
import signinPage from '../pages/SigninPage' 
import signinFactory from '../factories/SigninFactory'

describe('Acesso sistema Swag Labs', () => {

    it('App deve estar online', () => {
        signinPage.acessPage() //acessa a pagina do app
        cy.title().should('eq', 'Swag Labs') //verifica se esta dentro da página
    })

    it('UserName não informado',() =>{
        signinPage.acessPage() //acessa a pagina do app
        signinPage.submit() //clica em login
        signinPage.alertMessageShouldBe('Epic sadface: Username is required') //valida mensagem de erro do usuário não informado
    })

    it('UserName incorreto', () => {
        var login = signinFactory.dados()
        login.userName = 'teste' // preenche o campo de userName da pagina do app
        signinPage.acessPage() //acessa a pagina do app
        signinPage.fillForm(login) //preenche o campo password da pagina do app 
        signinPage.submit() //clica em login
        signinPage.alertMessageShouldBe('Epic sadface: Username and password do not match any user in this service') //valida mensagem de erro do usuário incorreto

    })

    it('UserName e password incompativeis',() =>{    
        var login = signinFactory.dados()
        login.password = 'teste' // preenche o campo de password da pagina do app
        signinPage.acessPage() //acessa a pagina do app
        signinPage.fillForm(login) //preenche os campos username e password da pagina do app 
        signinPage.submit() //clica em login
        //valida mensagem de erro dos dados não compativeis
        signinPage.alertMessageShouldBe('Epic sadface: Username and password do not match any user in this service') //valida mensagem de erro dos dados incompativeis
    })

    it('Preencher os campos e fazer login com sucesso', function () {
        var login = signinFactory.dados()
        signinPage.acessPage() //acessa a pagina do app
        signinPage.fillForm(login) //preenche os campos username e password da pagina do app 
        signinPage.submit() //clica em login
        cy.get('[class="shopping_cart_link"]').should('be.visible') //valida que esta dentro da página de produtos 

    })

    it('Adicionar Backpack ao carrinho de compras após login no aplicativo', () => {
        var login = signinFactory.dados()
        signinPage.acessPage() //acessa a pagina do app
        signinPage.fillForm(login) //preenche os campos username e password da pagina do app 
        signinPage.submit() //clica em login
        cy.get('[id="add-to-cart-sauce-labs-backpack"]') //valida produto adicionado no carrinho
            .should('be.visible')
            .click()
    })

    it('Logoff, após login aplicativo', () => {
        var login = signinFactory.dados()
        signinPage.acessPage() //acessa a pagina do app
        signinPage.fillForm(login) //preenche os campos username e password da pagina do app 
        signinPage.submit() //clica em login
        cy.get('button[id="react-burger-menu-btn"]').click()
        signinPage.logoff() // efetua logoff da pagina do app
            
    })
       
})