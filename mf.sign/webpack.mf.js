const shared = require('../shared/mf.config.shared.js');

module.exports = {
    name: 'remoteSign',
    exposes: {
      './Sign': './src/components/Sign/Sign.vue',
    },
    shared,
    dts: {
        generateTypes: {
            compilerInstance: 'vue-tsc'
        }
    }
}
