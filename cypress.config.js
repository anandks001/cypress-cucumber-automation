import { defineConfig } from 'cypress';
import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
import cypressEslint from 'cypress-eslint-preprocessor';

async function setupNodeEvents(on, config) {
    await addCucumberPreprocessorPlugin(on, config);

    on(
        'file:preprocessor',
        createBundler({
            plugins: [createEsbuildPlugin(config)],
        }),
        cypressEslint(),
    );
    require('cypress-mochawesome-reporter/plugin')(on);
    addMatchImageSnapshotPlugin(on, config);
    return config;
}

export default defineConfig({
    e2e: {
        setupNodeEvents,
        specPattern: '**/*.feature',
        baseUrl: 'https://m.aboutyou.com',
        // 'defaultCommandTimeout': 6000,
        // 'pageLoadTimeout': 20000,
        video: true,
        // 'videoUploadOnPasses': false,
        chromeWebSecurity: false,
        viewportHeight: 844,
        viewportWidth: 390,
        retries: {
            runMode: 2,
            openMode: 0,
        },
        // eslint-disable-next-line max-len
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.11',
    },
    reporter: 'cypress-mochawesome-reporter',
});
