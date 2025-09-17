/// <reference types="cypress" />

describe('Agenda de Contatos - Testes E2E', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Deve incluir um novo contato', () => {
    cy.get('input[placeholder="Nome"]').type('João Silva')
    cy.get('input[placeholder="E-mail"]').type('joao@teste.com')
    cy.get('input[placeholder="Telefone"]').type('11999999999')
    cy.contains('button', 'Adicionar').click()

    cy.contains('João Silva').should('be.visible')
    cy.contains('joao@teste.com').should('be.visible')
  })

  it('Deve editar um contato existente', () => {
    cy.contains('João Silva')
      .parent()
      .within(() => {
        cy.contains('Editar').click()
      })

    cy.get('input[placeholder="Nome"]').clear().type('João Silva Editado')
    cy.get('input[placeholder="E-mail"]').clear().type('joao.editado@teste.com')
    cy.get('input[placeholder="Telefone"]').clear().type('11888888888')
    cy.contains('button', 'Salvar').click()

    cy.contains('João Silva Editado').should('be.visible')
    cy.contains('joao.editado@teste.com').should('be.visible')
  })

  it('Deve remover um contato', () => {
    cy.contains('João Silva Editado')
      .parent()
      .within(() => {
        cy.contains('Excluir').click()
      })

    cy.contains('João Silva Editado').should('not.exist')
  })
})
