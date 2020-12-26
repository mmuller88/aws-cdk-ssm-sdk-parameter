# aws-cdk-ssm-sdk-parameter

Thats an AWS CDK Construct for get and set the value of an SSM parameter. It is designed to be loose coupled and be not managed through AWS CDK / Cloudformation so that the SSM parameter can exist across different stacks and be updated without causing a drift. The looseness is reached through using CFN Custom Resources.

The implementation simply leverages [AwsCustomResource](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_custom-resources.AwsCustomResource.html) as an SDK wrapper for:

- https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ssm/get-parameter.html https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_GetParameter.html
- https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ssm/put-parameter.html https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_PutParameter.html
- https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ssm/delete-parameter.html https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_DeleteParameter.html

# Features

- If the parameter doesn't exist, it will be created. Otherwise it pulls the current value of the parameter.
- optional delete when destroying the stack

# Use Case

Initialize a parameter to some value upon creation, but allow it to diverge during future CDK deployments.

SSM StringParameter APP_VERSION of an image is used across ECS deployments. New ECS deployments use that latest version value in it. APP_VERSION isn't managed / editable with CDK but if APP_VERSION wouldn't exist you can specify kind of default.

# Example

```ts
const stack = new cdk.Stack(app, 'ssm-demo-stack', { env });

// Create a loose coupled SSM Parameter from type String
new SSMParameter(stack, 'SSMParameter', {
  parameterName: 'fooString',
  defaultValue: 'fooValue',
});

// Create a loose coupled SSM Parameter from type StringList
new SSMParameter(stack, 'SSMParameterStringList', {
  parameterName: 'fooStringList',
  defaultValue: 'fooValue1,fooValue2,fooValue3',
  type: SSMParameterType.StringList,
});

// Delete the SSM Parameter if the stack gets deleted
new SSMParameter(stack, 'SSMParameterWithDelete', {
  parameterName: 'fooWithDelete',
  defaultValue: 'fooValue',
  delete: true,
});
```

# Limitation

- SSM SecureString Parameter are not supported
- default description are not supported
