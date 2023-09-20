/// <reference types='cypress' />

describe('Funcionalidade Página de Produtos', () => {
    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('[class="product-block grid"]')
            //.first() // Pegar o primeiro item da lista
            //.last() // Pegar o ultimo item da lista
            //.eq(3) // Pegar um item pelo seu indice na lista
            .contains('Ariel Roll Sleeve Sweatshirt') // Pegar um item pelo texto que contem na lista
            .click()
        cy.url().should('contain', '/product/')
    });

    it.only('Deve adicionar um produto ao carrinho ', () => {
        var quantidade = 5;

        cy.get('[class="product-block grid"]').contains('Abominable Hoodie').click()
        cy.get('.button-variable-item-XS').click()
        cy.get('.button-variable-item-Red').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain',quantidade)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Abominable Hoodie” foram adicionados no seu carrinho.')

    });

});