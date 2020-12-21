// eslint-disable-next-line @typescript-eslint/no-require-imports
import path = require('path');
import * as cfn from '@aws-cdk/aws-cloudformation';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cxschema from '@aws-cdk/cloud-assembly-schema';
import * as cdk from '@aws-cdk/core';

export interface StringParameterSDKProps {
  name: string;
  defaultValue: string;
}

export class StringParameterSDK extends cdk.Construct {

  /**
   * Reads the value of an SSM parameter during synthesis through an
   * environmental context provider.
   *
   * Requires that the stack this scope is defined in will have explicit
   * account/region information. Otherwise, it will fail during synthesis.
   */
  public static valueFromLookup(scope: cdk.Construct, parameterName: string): string {
    const value = cdk.ContextProvider.getValue(scope, {
      provider: cxschema.ContextProvider.SSM_PARAMETER_PROVIDER,
      props: { parameterName },
      dummyValue: `dummy-value-for-${parameterName}`,
    }).value;

    return value;
  }

  constructor(parent: cdk.Stack, name: string, props: StringParameterSDKProps) {
    super(parent, name);

    const putParamsLambda = new lambda.SingletonFunction(this, 'Singleton', {
      uuid: 'f7d4f730-4ee1-11e8-9c2d-fa7ae01bbebc',
      code: lambda.Code.asset(path.join(__dirname, 'lambda')),
      handler: 'index.handler',
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.NODEJS_10_X,
    });

    const putParamsLambdaPolicy = new iam.PolicyStatement({
      actions: ['ecr:GetAuthorizationToken',
        'cloudwatch:PutMetricData',
        'ds:CreateComputer',
        'ds:DescribeDirectories',
        'ec2:DescribeInstanceStatus',
        'logs:*',
        'ssm:*',
        'ec2messages:*'],
      resources: ['*'],
    },
    );

    putParamsLambda.addToRolePolicy(putParamsLambdaPolicy);

    const resource = new cfn.CustomResource(this, 'Resource', {
      provider: cfn.CustomResourceProvider.lambda(putParamsLambda),
      properties: props,
    });

    // this.response = resource.getAtt('Version').toString();
  }

}