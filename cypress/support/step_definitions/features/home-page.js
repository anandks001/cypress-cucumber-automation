export const openApp = () => {
    cy.skipAppInstall();
    cy.acceptCookies();

    // TODO - find better way to choose app locale
    cy.visit('/', {
        onBeforeLoad(win) {
            Object.defineProperty(win.navigator, 'language', { value: 'en-DE' });
            Object.defineProperty(win.navigator, 'languages', { value: ['en'] });
            Object.defineProperty(win.navigator, 'accept_languages', { value: ['en'] });
        },
        headers: {
            'Accept-Language': 'en',
        },
    });
}