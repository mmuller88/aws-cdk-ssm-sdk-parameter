import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';
import * as custom from '@aws-cdk/custom-resources';

export interface SSMParameterProps {
  readonly parameterName: string;
  /**
   * if the parameter couldn't be found that will be the default value
   */
  readonly defaultValue?: string;
  /**
   * The SSM Parameter type. SecureString is atm not supported
   */
  readonly type?: SSMParameterType;
}

/**
 * The SSM Parameter type. SecureString is atm not supported
 */
export enum SSMParameterType {
  STRING = 'String',
  STRING_LIST = 'StringList',
}

export class SSMParameter extends cdk.Construct {

  /**
   * the returned parameter for the SSM Parameter
   */
  readonly parameterValue: string;
  readonly parameterName: string;

  constructor(parent: cdk.Stack, name: string, props: SSMParameterProps) {
    super(parent, name);

    if (!props.parameterName) {
      throw new Error('parameterName cannot be an empty string');
    }

    if (props.parameterName.length > 2048) {
      throw new Error('Name cannot be longer than 2048 characters.');
    }

    this.parameterName = props.parameterName;

    const putParameter = new custom.AwsCustomResource(this, 'PutParameter', {
      onUpdate: {
        service: 'SSM',
        action: 'putParameter',
        parameters: {
          Name: props.parameterName,
          Value: props.defaultValue || '',
          Type: props.type || SSMParameterType.STRING,
        },
        // ignore if ParameterAlreadyExists as we don't override anyway
        ignoreErrorCodesMatching: '.*',
        physicalResourceId: custom.PhysicalResourceId.of(Date.now().toString()),
      },
      role: new iam.Role(this, 'putParameterRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
          iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMFullAccess'),
        ],
      }),
      policy: custom.AwsCustomResourcePolicy.fromSdkCalls({ resources: custom.AwsCustomResourcePolicy.ANY_RESOURCE }),
    });

    const getParameter = new custom.AwsCustomResource(this, 'GetParameter', {
      onUpdate: { // will also be called for a CREATE event
        service: 'SSM',
        action: 'getParameter',
        parameters: {
          Name: props.parameterName,
        },
        physicalResourceId: custom.PhysicalResourceId.of(Date.now().toString()), // Update physical id to always fetch the latest version
      },
      role: new iam.Role(this, 'getParameterRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
          iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMReadOnlyAccess'),
        ],
      }),
      policy: custom.AwsCustomResourcePolicy.fromSdkCalls({ resources: custom.AwsCustomResourcePolicy.ANY_RESOURCE }),
    });
    this.parameterValue = getParameter.getResponseField('Parameter.Value');
    // Run the get ssm parameter after put parameter
    getParameter.node.addDependency(putParameter);

    new cdk.CfnOutput(this, 'SSMParameterValue', {
      value: this.parameterValue,
    });
    new cdk.CfnOutput(this, 'SSMParameterName', {
      value: this.parameterName,
    });
  }

}