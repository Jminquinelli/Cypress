/// <reference types="Cypress"/>

describe('API - Teste funcional de Login', () => {
    it('Deve realizar o login com sucesso', () => {
        //criar requisição
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body:{
                
                "email": "fulano@qa.com",
                "password": "teste"
        
            }
        }).then((response)=>{
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Login realizado com sucesso')
        })
    });
    
    it('Tentar logar com senha incorreta', () => {
        //criar requisição
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body:{
                
                "email": "fulano@qa.com",
                "password": "teste1"
        
            },
            failOnStatusCode: false

        }).then((response)=>{
            expect(response.status).to.equal(401)
            expect(response.body.message).to.equal('Email e/ou senha inválidos')
        })
    });
});