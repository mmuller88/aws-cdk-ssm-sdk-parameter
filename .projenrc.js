const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  authorAddress: 'm.mueller@unimed.de',
  authorName: 'martin.mueller',
  cdkVersion: '1.79.0',
  releaseBranches: ['main'],
  name: 'aws-cdk-ssm-parameter',
  repository: 'https://github.com/mmuller88/aws-cdk-ssm-parameter',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/cloud-assembly-schema',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-cloudformation',
    '@aws-cdk/aws-lambda',
  ],
});

project.synth();
