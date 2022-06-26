
import signupPage from '../pages/SingupPage' 
import signupFactory from '../factories/SignupFactory'

describe('Acesso sistema Swag Labs', () => {

    it('App deve estar online', () => {
        signupPage.acessPage() //acessa a pagina do app
        cy.title().should('eq', 'Swag Labs') //verifica se esta dentro da página
    })

    it('UserName não informado',() =>{
        signupPage.acessPage() //acessa a pagina do app
        signupPage.submit() //clica em login
        signupPage.alertMessageShouldBe('Epic sadface: Username is required') //valida mensagem de erro do usuário não informado
    })

    it('UserName incorreto', () => {
        var login = signupFactory.dados()
        login.userName = 'teste' // preenche o campo de userName da pagina do app
        signupPage.acessPage() //acessa a pagina do app
        signupPage.fillForm(login) //preenche o campo password da pagina do app 
        signupPage.submit() //clica em login
        signupPage.alertMessageShouldBe('Epic sadface: Username and password do not match any user in this service') //valida mensagem de erro do usuário incorreto

    })

    it('UserName e password incompativeis',() =>{    
        var login = signupFactory.dados()
        login.password = 'teste' // preenche o campo de password da pagina do app
        signupPage.acessPage() //acessa a pagina do app
        signupPage.fillForm(login) //preenche os campos username e password da pagina do app 
        signupPage.submit() //clica em login
        //valida mensagem de erro dos dados não compativeis
        signupPage.alertMessageShouldBe('Epic sadface: Username and password do not match any user in this service') //valida mensagem de erro dos dados incompativeis
    })

    it('Preencher os campos e fazer login com sucesso', function () {
        var login = signupFactory.dados()
        signupPage.acessPage() //acessa a pagina do app
        signupPage.fillForm(login) //preenche os campos username e password da pagina do app 
        signupPage.submit() //clica em login
        cy.get('[class="shopping_cart_link"]').should('be.visible') //valida que esta dentro da página de produtos 

    })

    it('Adicionar Backpack ao carrinho de compras após login no aplicativo', () => {
        var login = signupFactory.dados()
        signupPage.acessPage() //acessa a pagina do app
        signupPage.fillForm(login) //preenche os campos username e password da pagina do app 
        signupPage.submit() //clica em login
        cy.get('[id="add-to-cart-sauce-labs-backpack"]') //valida produto adicionado no carrinho
            .should('be.visible')
            .click()
    })

    it('Logoff, após login aplicativo', () => {
        var login = signupFactory.dados()
        signupPage.acessPage() //acessa a pagina do app
        signupPage.fillForm(login) //preenche os campos username e password da pagina do app 
        signupPage.submit() //clica em login
        cy.get('button[id="react-burger-menu-btn"]').click()
        signupPage.logoff() // efetua logoff da pagina do app
            
    })
       
})