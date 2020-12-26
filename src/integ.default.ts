import * as cdk from '@aws-cdk/core';
import { SSMParameter, SSMParameterType } from './index';

export class IntegTesting {
  readonly stack: cdk.Stack[];
  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'my-demo-stack', { env });

    // Create a loose coupled SSM Parameter from type String
    new SSMParameter(stack, 'SSMParameter', {
      parameterName: 'foo',
      defaultValue: 'fooValue',
    });

    // Create a loose coupled SSM Parameter from type StringList
    new SSMParameter(stack, 'SSMParameterStringList', {
      parameterName: 'fooStringList',
      defaultValue: 'fooValue1,fooValue2,fooValue3',
      type: SSMParameterType.STRING_LIST,
    });

    // Delete the SSM Parameter if the stack gets deleted
    new SSMParameter(stack, 'SSMParameterWithDelete', {
      parameterName: 'fooWithDelete',
      defaultValue: 'fooValue',
      delete: true,
    });

    this.stack = [stack];
  }
}

new IntegTesting();
