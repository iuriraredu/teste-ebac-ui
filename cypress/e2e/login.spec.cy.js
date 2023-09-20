/// <reference types="cypress" />

const perfil = require("../fixtures/perfil.json");

context('Funcionalidade Login', () =>{

    beforeEach(() => {
        cy.visit('minha-conta')
    });
    
    afterEach(() =>{
        // cy.screenshot()
    });

    it('Deve fazer login com suceso', () =>{
        
        cy.get('#username').type('aluno_ebac@teste.com')
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.page-title').should('contain','Minha conta')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, aluno_ebac20')
    });

    it('Deve fazer login com suceso - Usando arquivo de dados', () =>{
        
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()

        cy.get('.page-title').should('contain','Minha conta')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, aluno_ebac20')
    });

    it.only('Deve fazer login com sucesso - Usando fixture', () => {
        cy.fixture('perfil').then(dados => { // esta função serve para carregar os dados do arquivo perfil.json em tempo de execução, não precisando criar uma variavel
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha, {log: false}) // {log: false} serve para ocultar a senha no relatório do teste
            cy.get('.woocommerce-form > .button').click()
    
            cy.get('.page-title').should('contain','Minha conta')
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, aluno_ebac20')
        })
    });

    it('Deve exibir mensagem de erro ao inserir usuário inválido', () =>{
        cy.get('#username').type('afdaf@teste.com')
        cy.get('#password').type('teste@teste')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('contain', 'Endereço de e-mail desconhecido.')
    });

    it('Deve exibir mensagem de erro ao inserir senha inválida', () =>{
        cy.get('#username').type('aluno_ebac@teste.com')
        cy.get('#password').type('teste@teste')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('contain','Erro: a senha fornecida para o e-mail aluno_ebac@teste.com está incorreta.')
    });
})

