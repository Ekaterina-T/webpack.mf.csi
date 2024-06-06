const shared = require('../shared/mf.config.shared.js');

module.exports = {
    name: 'remoteNumbers',
    exposes: {
      './Numbers': './src/components/Numbers/Numbers.vue',
    },
    shared,
    dts: {
        generateTypes: {
            compilerInstance: 'vue-tsc'
        }
    }
}
