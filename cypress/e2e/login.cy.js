/// <reference types="cypress"/>
import user from "../fixtures/usuario.json"

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('login.html')
    });

    it('Deve fazer o login com sucesso', () => {
        cy.get('#email').type('usuario@teste.com')
        cy.get('#password').type('user123')
        cy.get('#login-btn').click()
        cy.url().should('contain', 'dashboard')
    });
        
    it('Deve fazer login com sucesso - Usando comando customizado', () => {
        cy.login('usuario@teste.com', 'user123')
    });

    it('Deve fazer login com sucesso com a conta Admin - usando o comando customizado', () => {
        cy.login('admin@biblioteca.com', 'admin123')        
    });

    it('Deve fazer login com sucesso - usando a importação da massa de dados', () => {
        cy.login(user.email, user.senha)
    });

    });