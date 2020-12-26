import * as core from '@aws-cdk/core';
import { SSMParameter, SSMParameterType } from '../src';
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
        const param = new SSMParameter(stack, 'SSMParameterString', {
          parameterName: 'foo',
          defaultValue: 'fooValue',
        });

        test('which exist', () => {
          expect(param.parameterValue).toContain('TOKEN');
          expect(stack).toHaveResourceLike('Custom::AWS', {
            Update: {
              action: 'putParameter',
              ignoreErrorCodesMatching: '.*',
              parameters: {
                Name: 'foo',
                Type: 'String',
                Value: 'fooValue',
              },
            },
          });
          expect(stack).toHaveResourceLike('Custom::AWS', {
            Update: {
              action: 'getParameter',
              parameters: {
                Name: 'foo',
              },
            },
          });
        });

        test('with a long parameterName', () => {
          const paramTmp = new SSMParameter(stack, 'SSMParameterString2', {
            parameterName: 'a'.repeat(2047),
            defaultValue: 'fooValue',
          });

          expect(paramTmp.parameterValue).toContain('TOKEN');
          expect(stack).toHaveResource('Custom::AWS');
        });

        test('with delete property', () => {
          const paramTmp = new SSMParameter(stack, 'SSMParameterString3', {
            parameterName: 'fooValue',
            defaultValue: 'fooValue',
            delete: true,
          });

          expect(paramTmp.parameterValue).toContain('TOKEN');
          expect(stack).toHaveResourceLike('Custom::AWS', {
            Delete: {
              action: 'deleteParameter',
              parameters: {
                Name: 'fooValue',
              },
            },
          });
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
      describe('as SSM Parameter StringList', () => {
        const param = new SSMParameter(stack, 'SSMParameterStringList', {
          parameterName: 'fooStringList',
          defaultValue: 'fooValue1,fooValue2,fooValue3',
          type: SSMParameterType.StringList,
        });

        test('which exist', () => {
          expect(param.parameterValue).toContain('TOKEN');
          expect(stack).toHaveResourceLike('Custom::AWS', {
            Update: {
              action: 'putParameter',
              ignoreErrorCodesMatching: '.*',
              parameters: {
                Name: 'fooStringList',
                Type: 'StringList',
                Value: 'fooValue1,fooValue2,fooValue3',
              },
            },
          });
          expect(stack).toHaveResourceLike('Custom::AWS', {
            Update: {
              action: 'getParameter',
              parameters: {
                Name: 'fooStringList',
              },
            },
          });
        });
      });
    });

  });
});