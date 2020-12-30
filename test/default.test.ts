import * as core from '@aws-cdk/core';
import '@aws-cdk/assert/jest';

describe('Get', () => {
  describe('SSMParameter', () => {
    // const env = {
    //   region: '12345678', //process.env.CDK_DEFAULT_REGION,
    //   account: 'us-east-1', //process.env.CDK_DEFAULT_ACCOUNT,
    // };
    const app = new core.App();
    const stack = new core.Stack(app, 'testing-stack');

    describe('successful', () => {
      describe('as SSM Parameter String', () => {

        test('which exist', () => {
          expect(stack).toHaveResourceLike('Custom::AWS');
        });
      });
    });
  });
});