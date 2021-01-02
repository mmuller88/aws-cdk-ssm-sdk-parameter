const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  authorAddress: 'damadden88@googlemail.de',
  authorName: 'martin.mueller',
  cdkVersion: '1.80.0',
  name: 'aws-cdk-ssm-sdk-parameter',
  repository: 'https://github.com/mmuller88/aws-cdk-ssm-sdk-parameter',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/custom-resources',
  ],
  keywords: [
    'cdk',
    'aws',
    'ssm',
    'parameter',
    'custom-resource',
    'sdk',
  ],
});

const common_exclude = ['cdk.out'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
