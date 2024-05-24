/// <reference types="Cypress"/>

describe('Teste E2E - Realizando a compra de produtos com sucesso', () => {
    it('Fluxo da compra de produtos', () => {
        cy.login_teste('standard_user','secret_sauce')
        cy.get('.title').should('contain','Products')

        //Ordenação de produtos de menor para maior:
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)')
        //Validação da Ordenação dos produtos:
        cy.get(':nth-child(1) > [data-test="inventory-item-description"]').should('contain' ,'Sauce Labs Onesie')
        cy.get(':nth-child(2) > [data-test="inventory-item-description"]').should('contain' ,'Sauce Labs Bike Light')
        cy.get(':nth-child(3) > [data-test="inventory-item-description"]').should('contain' ,'Sauce Labs Bolt T-Shirt')
        
        //Clicar no produto 1
        cy.contains('Sauce Labs Onesie').click()
        //Adicionar produto 1 no carrinho
        cy.get('.btn_primary').click()
        //voltar a pagina anterior
        cy.get('[data-test="back-to-products"]').click()

        //Clicar no produto 2
        cy.contains('Sauce Labs Bike Light').click()
        //Adicionar produto 2 no carrinho
        cy.get('.btn_primary').click()
        //voltar a pagina anterior
        cy.get('[data-test="back-to-products"]').click()

        //Clicar no produto 3
        cy.contains('Sauce Labs Bolt T-Shirt').click()
        //Adicionar produto 3 no carrinho
        cy.get('.btn_primary').click()
        //voltar a pagina anterior
        cy.get('[data-test="back-to-products"]').click()

        //validar quantidade de produtos adicionados no carrinho
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="shopping-cart-badge"]').should('contain','3')

        //conferir produtos no carrinho
        cy.verificaProdutos()
        
        //checkout click
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Teste Primeiro nome')
        cy.get('[data-test="lastName"]').type('Teste Segundo nome')
        cy.get('[data-test="postalCode"]').type('06060609')
        cy.get('[data-test="continue"]').click()

        //Conferir produtos no checkout
        cy.verificaProdutos()

        //Checar valor total- sempre que for valor exato usar o have text para pegar o valor exato do texto, no caso o valor total da compra
        cy.get('[data-test="total-label"]').should('have.text', 'Total: $36.69')
        cy.get('[data-test="finish"]').click()
        cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!')
    });
});