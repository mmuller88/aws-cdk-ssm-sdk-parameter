const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  authorAddress: 'm.mueller@unimed.de',
  authorName: 'martin.mueller',
  cdkVersion: '1.73.0',
  releaseBranches: ['main'],
  name: 'aws-cdk-ssm-parameter',
  repository: 'https://github.com/mmuller88/aws-cdk-ssm-parameter',
});

project.synth();
