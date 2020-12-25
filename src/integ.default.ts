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

    new SSMParameter(stack, 'SSMParameterString', {
      parameterName: 'foo',
      defaultValue: 'fooValue1',
    });

    new SSMParameter(stack, 'SSMParameterStringList', {
      parameterName: 'fooStringList',
      defaultValue: 'fooValue1,fooValue2,fooValue3',
      type: SSMParameterType.StringList,
    });

    this.stack = [stack];
  }
}

new IntegTesting();
