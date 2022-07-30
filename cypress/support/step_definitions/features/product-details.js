import * as categorySelectors from '../../../constants/product-category/product-category';
import * as productSelectors from '../../../constants/product-details/product-details';

/**
 * @param {string} category
 * @param {string} subCategory
 * @returns {void}
 */
export const openProductDetails = (category, subCategory) => {
    // TODO - Need to fix flakiness due to page load time
    cy.getElement(categorySelectors.shoes)
        .contains(category)
        .scrollIntoView({ duration: 2000 })
        .should('be.visible')
        .click();

    cy.contains(subCategory)
        .should('be.visible')
        .click();

    cy.getElement(categorySelectors.categoryHeader)
        .should('be.visible');
    cy.getElement(categorySelectors.productImage).its('length').should('be.gte', 2);

    cy.getElement(categorySelectors.productImage)
        .first()
        .should('be.visible')
        .click();

    cy.getElement(productSelectors.ProductSliderFullscreen)
        .should('be.visible');
};

export const selectProductSize = (size) => {
    cy.getElement(productSelectors.sizeFlyoutOpener)
        .should('be.visible')
        .and('have.attr','role','button')
        .click();

    cy.contains('EU size')
        .should('be.visible')
        .click();

    cy.getElement(productSelectors.optionContentLabel)
        .should('be.visible');

    cy.getElement(productSelectors.EUSizeSelected)
        .should('be.visible');

    cy.getElement(productSelectors.sizeList)
        .within(() => {
            cy.contains(size)
                .should('be.visible')
                .click();
        });

    cy.getElement(productSelectors.addToBasketButton)
        .within(() => {
            cy.contains(size).should('be.visible');
        });

};