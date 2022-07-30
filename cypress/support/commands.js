import { addMatchImageSnapshotCommand } from '@simonsmith/cypress-image-snapshot/command';

/**
 * Returns unique Element for the given selector
 */
function getElement(selector) {
    return cy.get(`[data-testid=${selector}]`);
};

Cypress.Commands.add('getElement', getElement);

/**
 * Skip app install banner
 */
Cypress.Commands.add('skipAppInstall', () => {
    localStorage.setItem('app_install_banner_last_closed_tadarida', new Date().toISOString());
    localStorage.setItem('lang', 'en-de');
});

/**
 * Skip cookies alert
 */
Cypress.Commands.add('acceptCookies', () => {
    cy.setCookie('OptanonAlertBoxClosed', new Date().toISOString());
});

addMatchImageSnapshotCommand({
    failureThreshold: 0.03, // threshold for entire image
    failureThresholdType: 'percent', // percent of image or number of pixels
    customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
    capture: 'viewport', // capture viewport in screenshot
});
