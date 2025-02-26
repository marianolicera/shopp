describe('Home Test', () => {
    // Limpio la db antes de cada test
    beforeEach(() => {
        cy.task('seed');
    });

    it('Deberia tener de titulo Shopp', () => {
        cy.visit('/');
        cy.title().should('eq', 'Shopp');
    });

    it('Deberia mostrar 10 productos', () => {
        cy.visit('/');

        cy.get('.product').should('have.length', 10);
    });

    it('El primer producto deberia ser "Barra de sonido"', () => {
        cy.visit('/');

        cy.get('.product:first-child .card-title').should(
            'have.text',
            'Barra de sonido'
        );
    });

    it('Deberia mostrarse el páginador si es necesario', () => {
        cy.visit('/');

        cy.get('.pagination').should('be.visible')
    });

    it('Deberia poder paginar', () => {
        cy.visit('/');

        cy.get('.pagination__next').click()
        cy.get('.product').should('have.length', 2);
    });

    it('Deberia mostrar el primer producto con descuento', () => {
        cy.visit('/');

        cy.get('.discount').first().should('contain.text', '10 %');
    });

    it('Deberia tener el footer', () => {
        cy.visit('/');
        cy.get('footer').should('be.visible');
    });

    it('Deberia estar oculto el boton de SIGUIENTE en la ultima pagina', () => {
        cy.visit('/?page=2');

        cy.get('.pagination__next').should('not.exist')
    });

    it('Deberia existir el boton de ELIMINAR DEL CARRITO', () => {

        cy.visit('/')
        cy.get('.agregar').first().click()

        cy.visit('/cart');

        cy.get('.eliminarCarrito').should('exist')
    });

    it('Los productos deberian estar "Ordenados alfabeticamente"', () => {
        cy.visit('/');

        cy.get('.product:first-child .card-title').should(
            'have.text',
            'Barra de sonido',
        );

        cy.get('.product:nth-of-type(2) .card-title').should(
            'have.text',
            'Cama',
        );

        cy.get('.product:nth-of-type(3) .card-title').should(
            'have.text',
            'Laptop',
        );

    });
});
