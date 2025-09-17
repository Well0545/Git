// cypress/support/e2e.js
import './commands'

// Evita que erros não tratados da aplicação quebrem os testes
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
