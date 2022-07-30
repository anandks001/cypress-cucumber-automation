import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';

import { openApp } from './features/home-page';
import { searchProduct } from './features/search';
import {
    openProductDetails,
    selectProductSize,
} from './features/product-details';
import {
    displayProductCategory,
    openFilter,
    setColorFilter,
    setSizeFilter,
    setBrandFilter,
} from './features/product-category';
import * as homePageSelectors from '../../constants/home-page/home-page';
import * as categorySelectors from '../../constants/product-category/product-category';
import * as productSelectors from '../../constants/product-details/product-details';
import * as basketSelectors from '../../constants/basket/basket';

beforeEach(() => {
    // TODO - Product details from fixtures
    cy.fixture('product').as('productDetails');
});

When('user opens about-you mobile website', () => {
    openApp();
});

Then('landing page is displayed', () => {
    cy.getElement(homePageSelectors.homePagetopViewPort).should('be.visible');
    cy.getElement(homePageSelectors.HeaderMenu).parent().should('be.visible');
    cy.getElement(homePageSelectors.HeaderMenu).parent().matchImageSnapshot('home-page-header');
});

Given('app home page is displayed', () => {
    openApp();
    cy.getElement(homePageSelectors.homePagetopViewPort).should('be.visible');
    cy.getElement(homePageSelectors.HeaderMenu).parent().should('be.visible');
});

When('the search phrase “running shoes" is entered', () => {
    cy.get('@productDetails').then((product) => {
        searchProduct(product.searchTerm);
    });
});

Then('results for “running shoes" are shown', () => {
    displayProductCategory('Running shoes');
});

Given('the filter page is displayed', () => {
    openApp();
    cy.getElement(homePageSelectors.homePagetopViewPort).should('be.visible');
    cy.getElement(homePageSelectors.HeaderMenu).parent().should('be.visible');
    cy.get('@productDetails').then((product) => {
        openFilter(product.category,product.subCategory);
    });
});

When('the user selects color filter', () => {
    cy.get('@productDetails').then((product) => {
        setColorFilter(product.color);
    });
});

And('selects size filter', () => {
    cy.get('@productDetails').then((product) => {
        setSizeFilter(product.size);
    });
});

And('selects brand filter', () => {
    cy.get('@productDetails').then((product) => {
        setBrandFilter(product.brand);
    });
});

And('the user click on show products', () => {
    cy.getElement(categorySelectors.filterFlyoutFooterSubmit)
        .should('be.visible')
        .click();

});

Then('results for applied filters are show', () => {
    cy.getElement(categorySelectors.categoryHeader)
        .should('be.visible');
    cy.getElement(categorySelectors.productImage).its('length').should('be.gte', 2);
});

And('filter count displayed accordingly', () => {
    cy.getElement(categorySelectors.filterFlyoutToggleButton)
        .within(() => {
            cy.getElement(categorySelectors.filterFlyoutToggleButtonCount)
                .invoke('text')
                .should('eq','3');
        });
});


Given('the user searched for a product', () => {
    openApp();
    cy.get('@productDetails').then((product) => {
        searchProduct(product.searchTerm);
        displayProductCategory(product.searchTerm);
    });
});


When('the user click on the product', () => {
    cy.getElement(categorySelectors.productImage)
        .first()
        .should('be.visible')
        .click();
});

Then('product details page is shown', () => {
    cy.getElement(productSelectors.ProductSliderFullscreen)
        .should('be.visible');
    cy.getElement(categorySelectors.productImage)
        .should('be.visible');
    cy.getElement(productSelectors.addToBasket)
        .should('be.visible');
    cy.getElement(productSelectors.addToWishlist)
        .should('be.visible');
    cy.getElement(productSelectors.finalPrice)
        .should('be.visible');
    cy.getElement(productSelectors.addToBasketButton)
        .should('be.visible');
    cy.getElement(productSelectors.productDetailsHighlights)
        .should('be.visible');
});


Given('the user in the product details', () => {
    openApp();
    cy.getElement(homePageSelectors.homePagetopViewPort).should('be.visible');
    cy.getElement(homePageSelectors.HeaderMenu).parent().should('be.visible');
    cy.get('@productDetails').then((product) => {
        openProductDetails(product.category,product.subCategory);
    });
});

And('basket is empty', () => {
    cy.getElement(homePageSelectors.HeaderBasket)
        .should('be.visible')
        .matchImageSnapshot('empty-basket');
});

When('adds the first item to the basket', () => {
    cy.get('@productDetails').then((product) => {
        selectProductSize(product.size);
    });
    cy.getElement(productSelectors.addToBasketButton)
        .should('be.visible')
        .click();
    cy.contains(productSelectors.successMessage)
        .should('be.visible');

    cy.getElement(productSelectors.goToBasketButton)
        .should('be.visible')
        .click();

    cy.getElement(homePageSelectors.HeaderBasket)
        .within(() => {
            cy.contains('1').should('be.visible');
        });
});

Then('product added to the basket', () => {
    cy.url().should('contain',basketSelectors.basket);

    cy.getElement(basketSelectors.basketItemDescription)
        .should('be.visible')
        .within(() => {
            cy.getElement(basketSelectors.basketItemLabelBrand)
                .should('be.visible');
            cy.getElement(basketSelectors.basketItemLabelProductInfo)
                .should('be.visible');
        });
    cy.getElement(basketSelectors.defaultPrice)
        .should('be.visible');
    cy.getElement(basketSelectors.productDelete)
        .should('be.visible');
    cy.getElement(basketSelectors.basketTotalPrice)
        .should('be.visible');

    // TODO - find better locator
    cy.get('div select option')
        .first()
        .invoke('text')
        .should('eq', '1');

    // TODO - add a different scenario
    cy.getElement(basketSelectors.CheckoutButton)
        .should('be.visible')
        .first()
        .click();

    cy.url().should('contain',basketSelectors.account);
    cy.getElement(basketSelectors.loginPage)
        .should('be.visible')
        .matchImageSnapshot('login-page');

    cy.getElement(basketSelectors.CloseIcon)
        .should('be.visible')
        .click();
});

And('basket product count shown in header', () => {
    cy.getElement(homePageSelectors.HeaderBasket)
        .should('be.visible')
        .matchImageSnapshot('basket-with-product')
});


And('whish list is empty', () => {
    cy.getElement(homePageSelectors.HeaderWishlist_empty)
        .should('be.visible')
        .matchImageSnapshot('empty-whishlist');
});


When('adds the first item to the wish list', () => {
    cy.getElement(productSelectors.addToWishlist)
        .should('be.visible')
        .click();
    cy.getElement(homePageSelectors.HeaderWishlist_filled)
        .should('be.visible')
        .click();
});

Then('product added to the wish list', () => {
    // TODO add more product validation
    cy.url().should('include','wishlist');
});

And('whish list product count shown in header', () => {
    cy.getElement(homePageSelectors.HeaderWishlist_filled)
        .should('be.visible')
        .matchImageSnapshot('whishlist-with-product')
});