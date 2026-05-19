/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';

describe('Funcionalidade: Cadastro no Hub de Leitura', () => {
    
    beforeEach(() => {
        cy.visit('register.html')
    });

    it('Deve fazer o cadastro com sucesso, usando função JS', () => {
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

    it('Deve fazer o cadastro com sucesso, usando o comando', () => {
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

    it('Deve fazer o cadastro com sucesso, usando Faker', () => {
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

});