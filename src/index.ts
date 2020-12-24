import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';
import * as custom from '@aws-cdk/custom-resources';

export interface SSMParameterProps {
  parameterName: string;
  /**
   * if the parameter couldn't be found that will be the default value
   */
  defaultValue?: string;
  /**
   * The SSM Parameter type. SecureString is atm not supported
   */
  type?: SSMParameterType;
}

/**
 * The SSM Parameter type. SecureString is atm not supported
 */
export enum SSMParameterType {
  String = 'String',
  StringList = 'StringList',
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

    // if (props.type === SSMParameterType.StringList) {
    //   if ( props.defaultValue.split(',').find(str => str.indexOf(',') !== -1)) {
    //     throw new Error('Values of a StringList SSM Parameter cannot contain the \',\' character. Use a string parameter instead.');
    //   }
    // }

    this.parameterName = props.parameterName;

    new custom.AwsCustomResource(this, 'PutParameter', {
      onUpdate: {
        service: 'SSM',
        action: 'putParameter',
        parameters: {
          Name: props.parameterName,
          Value: props.defaultValue || '',
          Type: props.type || SSMParameterType.String,
        },
        // ignore if ParameterAlreadyExists as we don't override anyway
        ignoreErrorCodesMatching: '.*',
        physicalResourceId: custom.PhysicalResourceId.of(Date.now().toString()),
      },
      policy: custom.AwsCustomResourcePolicy.fromSdkCalls({ resources: custom.AwsCustomResourcePolicy.ANY_RESOURCE }),
    });

    // const status = putParameter.getResponseField('Status');

    // Use the value in another construct with
    // console.log(`getParameter: ${getParameter}`);
    // this.parameterValue = getParameter.getResponseField('Parameter.Value');
    // this.parameterValue = putParameter.getResponseField('');
    // console.log(`this.parameterValue: ${this.parameterValue}`);

    // if (this.parameterValue !== undefined && this.parameterValue !== null) {
    const getParameter = new custom.AwsCustomResource(this, 'GetParameter', {
      onUpdate: { // will also be called for a CREATE event
        service: 'SSM',
        action: 'getParameter',
        parameters: {
          Name: props.parameterName,
        },
        // ignoreErrorCodesMatching: '400',
        physicalResourceId: custom.PhysicalResourceId.of(Date.now().toString()), // Update physical id to always fetch the latest version
      },
      policy: custom.AwsCustomResourcePolicy.fromStatements([new iam.PolicyStatement({
        actions: ['*'],
        // principals: [new iam.ServicePrincipal('lambda.amazonaws.com')],
        resources: ['*'],
      })]),
      // policy: custom.AwsCustomResourcePolicy.fromSdkCalls({ resources: custom.AwsCustomResourcePolicy.ANY_RESOURCE }),
    });
    this.parameterValue = getParameter.getResponseField('Parameter.Value');
    // }

    new cdk.CfnOutput(this, 'SSMParameterValue', {
      value: this.parameterValue,
    });
    new cdk.CfnOutput(this, 'SSMParameterName', {
      value: this.parameterName,
    });
  }

}