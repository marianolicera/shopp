/**
 * @jest-environment jsdom
 */

const utils = require('../../ui-utils.js');

const {
    getByText,
    getByAltText,
    getByTestId,
    TestingLibraryElementError
} = require('@testing-library/dom');
require('@testing-library/jest-dom');

function renderProduct(product) {
    return utils.renderString(
        '_product-card.html',
        `{{ productCard(product) }}`,
        { product }
    );
}

describe('Tarjeta de producto', () => {
    test('Deberia tener el nombre del producto', async () => {
        const html = renderProduct({
            name: 'Placard',
            type: 'home',
            price: 100,
        });
        document.body.innerHTML = html;

        expect(getByText(document.body, 'Placard')).toBeVisible();
    });

    test('Deberia tener el tipo del producto', async () => {
        const html = renderProduct({
            name: 'Placard',
            type: 'home',
            price: 100,
        });
        document.body.innerHTML = html;

        expect(getByText(document.body, 'home')).toBeVisible();
    });

    test('Deberia tener el precio del producto', async () => {
        const html = renderProduct({
            name: 'Placard',
            type: 'home',
            price: 100,
        });
        document.body.innerHTML = html;

        expect(getByText(document.body, '$ 100')).toBeVisible();
    });

    test('Deberia tener una imagen con el attributo alt correcto', async () => {
        const product = {
            name: 'Placard',
            type: 'home',
            price: 100,
        };
        const html = renderProduct(product);
        document.body.innerHTML = html;

        expect(
            getByAltText(document.body, `foto de un ${product.name}`)
        ).toBeVisible();
    });

    test('Deberia tener boton para agregar al carrito', async () => {
        const product = {
            name: 'Placard',
            type: 'home',
            price: 100,
        };
        const html = renderProduct(product);
        document.body.innerHTML = html;

        const btn = getByText(document.body, 'Agregar a carrito');
        expect(btn).toBeVisible();
    });

    test('Deberia mostrar la cantidad de items en carrito si el producto esta dentro de un carrito', async () => {
        const product = {
            name: 'Placard',
            type: 'home',
            price: 100,
            CartProduct: {
                quantity: 2,
            },
        };
        const html = renderProduct(product);
        document.body.innerHTML = html;

        expect(getByTestId(document.body, 'onCart')).toBeVisible()
    });

    test('Deberia mostrar el descuento si el producto tiene un descuento', async () => {
        const product = {
            name: 'Placard',
            type: 'home',
            price: 100,
            discount: 5
        };

        const html = renderProduct(product);
        document.body.innerHTML = html;

        const el = getByTestId(document.body, 'discount');
        expect(el).not.toBeNull();
        expect(el.innerHTML).toBe('5 %')
    });

    test('Deberia no mostrar el descuento si el producto no tiene un descuento', async () => {
        const product = {
            name: 'Placard',
            type: 'home',
            price: 100
        };

        const html = renderProduct(product);
        document.body.innerHTML = html;

        expect(() => {
            getByTestId(document.body, 'discount');
        }).toThrowError(TestingLibraryElementError)
    });
});
