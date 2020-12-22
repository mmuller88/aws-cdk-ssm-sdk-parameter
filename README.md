# aws-cdk-ssm-parameter

Thats a little AWS CDK Construct for get the value of an SSM parameter. If the parameter doesn't exist, it will be created. The implementation simply leverages [AwsCustomResource](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_custom-resources.AwsCustomResource.html) as an SDK wrapper for:

- https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ssm/get-parameter.html
- https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ssm/put-parameter.html

# Use Case

Initialize a parameter to some value upon creation, but allow it to diverge during future CDK deployments.

SSM StringParameter APP_VERSION of an image is used across ECS deployments. New ECS deployments use that latest version value in it. APP_VERSION isn't managed / editable with CDK but if APP_VERSION wouldn't exist you can specify kind of default.

# Example

```ts
const stack = new cdk.Stack(app, 'my-demo-stack', { env });

new SSMParameter(stack, 'SSMParameter', {
  parameterName: 'foo',
  defaultValue: 'fooValue',
});
```

# Limitation

- SSM SecureString Parameter are not supported
- default description are not supported
