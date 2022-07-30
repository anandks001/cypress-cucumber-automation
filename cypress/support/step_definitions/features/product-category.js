import * as categorySelectors from '../../../constants/product-category/product-category';

/**
 * @param {string} searchTerm
 * @returns {void}
 */
export const displayProductCategory = (searchTerm) => {
    cy.getElement(categorySelectors.categoryHeader)
        .should('be.visible');

    cy.getElement(categorySelectors.categoryHeaderTitle)
        .invoke('text')
        .should('eq',`${searchTerm}`);

    cy.getElement(categorySelectors.productImage).its('length').should('be.gte', 2);
}

/**
 * @param {string} category
 * @param {string} subCategory
 * @returns {void}
 */
export const openFilter = (category, subCategory) => {
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

    cy.getElement(categorySelectors.filterFlyoutToggleButton)
        .should('be.visible')
        .click();

    cy.getElement(categorySelectors.bottomSheetHeader)
        .should('be.visible')
        .and('have.attr','role','button');
}

/**
 * @param {string} searchTerm
 * @returns {void}
 */
const selectColor = (productColor) => {
    cy.getElement(categorySelectors.filterFlyoutColorLabelText).each((item) => {
        cy.log(item.text());
        if(item.text() === productColor) {
            cy.wrap(item).parent()
                .should('be.visible')
                .click();
            return false;
        }
    });
    return undefined;
}

/**
 * @param {string} productColor
 * @returns {void}
 */
export const setColorFilter = (productColor) => {
    cy.getElement(categorySelectors.filtersPlaceholder)
        .invoke('text')
        .should('eq','No filter selected');

    selectColor(productColor);

    cy.getElement(categorySelectors.filterFlyoutSectionColor)
        .within(() => {
            cy.getElement(categorySelectors.filterFlyoutSectionCount)
                .invoke('text')
                .should('eq','1');
        });

    cy.getElement(categorySelectors.filterFlyoutSection)
        .within(() => {
            cy.contains(productColor).should('be.visible');
        });

}

/**
 * @param {string} prodcutSize
 * @returns {void}
 */
export const setSizeFilter = (prodcutSize) => {
    cy.getElement(categorySelectors.filterFlyoutSectionSizeGrouped)
        .scrollIntoView()
        .should('be.visible')
        .click();

    cy.getElement(categorySelectors.sizeRunCluster)
        .should('be.visible');
    cy.contains(prodcutSize)
        .should('be.visible')
        .click();

    cy.getElement(categorySelectors.filterPrimaryButton)
        .should('be.visible')
        .click();

    cy.getElement(categorySelectors.filterFlyoutSectionSizeGrouped)
        .scrollIntoView()
        .within(() => {
            cy.getElement(categorySelectors.filterFlyoutSectionCount)
                .invoke('text')
                .should('eq','1');
        });

    cy.getElement(categorySelectors.filterFlyoutSection)
        .first()
        .scrollIntoView()
        .within(() => {
            cy.contains(prodcutSize).should('be.visible');
        });
}

/**
 * @param {string} productBrand
 * @returns {void}
 */
const selectBrand = (productBrand) => {
    cy.getElement(categorySelectors.customerBrandTileLogo).each((item) => {
        if(item.attr('alt')
            .includes(productBrand)) {
            cy.wrap(item).parent()
                .should('be.visible')
                .click();
            return false;
        }
    });
    return undefined;
}


/**
 * @param {string} productBrand
 * @returns {void}
 */
export const setBrandFilter = (productBrand) => {
    cy.getElement(categorySelectors.highlightedBrands)
        .scrollIntoView()
        .should('be.visible')

    selectBrand(productBrand);

    cy.getElement(categorySelectors.filterFlyoutSectionBrand)
        .scrollIntoView()
        .within(() => {
            cy.getElement(categorySelectors.filterFlyoutSectionCount)
                .invoke('text')
                .should('eq','1');
        });

    cy.getElement(categorySelectors.filterFlyoutSection)
        .first()
        .scrollIntoView()
        .within(() => {
            cy.contains(productBrand).should('be.visible');
        });

}