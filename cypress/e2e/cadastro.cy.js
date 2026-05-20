/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';
import cadastroPage from '../support/pages/cadastro.page';

describe('Funcionalidade: Cadastro no Hub de Leitura', () => {
    
    beforeEach(() => {
        cadastroPage.visitarPaginaCadastro()
    });

    it('Deve fazer o cadastro com sucesso - usando função JS', () => {
        let email = `teste${Date.now()}@email.com`
        cy.get('#name').type('Leticia Monteiro')
        cy.get('#email').type(email)
        cy.get('#phone').type('11987654321')
        cy.get('#password').type('Senha123')
        cy.get('#confirm-password').type('Senha123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        //Resultado esperado
        cy.url().should('include', 'dashboard')
    });

    it('Deve fazer o cadastro com sucesso - usando o comando', () => {
        let email = `teste${Date.now()}@email.com`
        cy.preencherCadastro(
            'Leticia Monteiro',
            email,
            '11987654321',
            'Senha123',
            'Senha123'
        )
        cy.url().should('include', 'dashboard')
    });

    it('Deve fazer o cadastro com sucesso - usando Faker', () => {
        let name = faker.person.fullName()
        let email = faker.internet.email() 
        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.get('#phone').type('11987654321')
        cy.get('#password').type('Senha123')
        cy.get('#confirm-password').type('Senha123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        //Resultado esperado
        cy.url().should('include', 'dashboard')
        cy.get('#user-name').should('contain', name)
    });

    it('Deve fazer cadastro com sucesso - usando Page Objects', () => {
        let email = faker.internet.email()
        cadastroPage.preencherCadastro('Sofia Pereira', email, '11123456789', 'senha123', 'senha123')
        cy.url().should('include', 'dashboard')
    });

    it.only('Deve validar mensagem ao tentar cadastrar sem preencher nome', () => {
        cadastroPage.preencherCadastro('', 'sofia@teste.com', '11123456789', 'senha123', 'senha123')
        cy.get(':nth-child(1) > .invalid-feedback').should('contain', 'Nome deve ter pelo menos 2 caracteres')
    });

});