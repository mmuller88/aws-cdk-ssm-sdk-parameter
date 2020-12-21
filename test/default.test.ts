import * as core from '@aws-cdk/core';
import { StringParameterSDK } from '../src';
import '@aws-cdk/assert/jest';

describe('Get', () => {
  describe('StringParameterSDK', () => {
    const env = {
      region: '12345678', //process.env.CDK_DEFAULT_REGION,
      account: 'us-east-1', //process.env.CDK_DEFAULT_ACCOUNT,
    };
    const app = new core.App();
    const stack = new core.Stack(app, 'testing-stack', { env });
    test('which exist', () => {
      expect(StringParameterSDK.valueFromLookup(stack, 'foo')).toBe('bla');
    });
    test('which not exist', () => {
      expect(StringParameterSDK.valueFromLookup(stack, 'bar')).toBe('dummy-value-for-bar');
    });
  });
});
