import * as homePageSelectors from '../../../constants/home-page/home-page';
import * as searchSelectors from '../../../constants/search/search';

/**
 * @param {string} searchTerm
 * @returns {void}
 */
export const searchProduct = (searchTerm) => {
    cy.getElement(homePageSelectors.HeaderSearch)
        .should('be.visible')
        .click();

    cy.getElement(searchSelectors.SeachHeader)
        .should('be.visible');
    cy.getElement(searchSelectors.searchInputText)
        .should('be.visible')
        .type(`${searchTerm}{enter}`);
}