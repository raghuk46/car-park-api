import NodeEnvironment from 'jest-environment-node';

module.exports = class TestEnvironment extends NodeEnvironment {
  /* eslint-disable no-useless-constructor */
  constructor(config) {
    super(config);
  }

  async setup() {
    console.log('Setup Test Environment');

    await super.setup();
  }

  async teardown() {
    console.log('Teardown Test Environment');

    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
};
