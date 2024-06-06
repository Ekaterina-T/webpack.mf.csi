const shared = require('../shared/mf.config.shared.js');

module.exports = {
    name: 'shell',
    remotes: {
        remoteNumbers: 'remoteNumbers@http://localhost:2001/mf-manifest.json',
        remoteSign: 'remoteSign@http://localhost:2002/mf-manifest.json',
    },
    exposes: {
        './App': './src/components/App/App.vue',
    },
    shared,
    dts: {
        generateTypes: {
            compilerInstance: 'vue-tsc'
        }
    }
  }
