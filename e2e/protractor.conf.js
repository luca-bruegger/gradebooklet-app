// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter} = require('jasmine-spec-reporter');
const path = require('path');
const downloadsPath = path.resolve(__dirname, './downloads');

exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        './src/**/*.e2e-spec.ts'
    ],
    capabilities: {
        chromeOnly: false,
        browserName: 'chrome',
        chromeOptions: {
            args: ['--no-sandbox'],
            prefs: {
                'download': {
                    'prompt_for_download': false,
                    'default_directory': downloadsPath
                }
            }
        }
    },
    directConnect: true,
    baseUrl: 'http://localhost:8100/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function () {
        }
    },
    onPrepare() {
        require('ts-node').register({
            project: require('path').join(__dirname, './tsconfig.json')
        });
        jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));
    }
};
