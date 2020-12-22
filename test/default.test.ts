import * as core from '@aws-cdk/core';
import { SSMParameter } from '../src';
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
      const param = new SSMParameter(stack, 'SSMParameter', {
        parameterName: 'foo',
        defaultValue: 'fooValue',
      });

      test('which exist', () => {
        expect(param.parameterValue).toContain('TOKEN');
        expect(stack).toHaveResource('Custom::AWS');
      });
      test('which not exist', () => {
        expect(param.parameterValue).toContain('TOKEN');
        expect(stack).toHaveResource('Custom::AWS');
      });

      test('with a long parameterName', () => {
        const paramTmp = new SSMParameter(stack, 'SSMParameter2', {
          parameterName: 'a'.repeat(2047),
          defaultValue: 'fooValue',
        });

        expect(paramTmp.parameterValue).toContain('TOKEN');
        expect(stack).toHaveResource('Custom::AWS');
      });

      describe('fails', () => {
        test('with empty parameterName', () => {
          expect(() => {
            new SSMParameter(stack, 'SSMParameter', {
              parameterName: '',
              defaultValue: 'fooValue',
            });
          }).toThrowError();
        });
        test('with to long parameterName', () => {
          expect(() => {
            new SSMParameter(stack, 'SSMParameter', {
              parameterName: 'a'.repeat(2049),
              defaultValue: 'fooValue',
            });
          }).toThrowError();
        });
      });
    });
  });
});