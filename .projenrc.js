const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  authorAddress: 'damadden88@googlemail.de',
  authorName: 'martin.mueller',
  // defaultReleaseBranch: 'main',
  cdkVersion: '1.80.0',
  // releaseBranches: ['main'],
  name: 'aws-cdk-ssm-sdk-parameter',
  repository: 'https://github.com/mmuller88/aws-cdk-ssm-sdk-parameter',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/cloud-assembly-schema',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-cloudformation',
    '@aws-cdk/aws-lambda',
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
  python: {
    distName: 'aws-cdk-ssm-sdk-parameter',
    module: 'aws_cdk_ssm_sdk_parameter',
  },
});

// workaround for https://github.com/projen/projen/issues/356
project.setScript('deploy', 'cdk deploy');

const common_exclude = ['cdk.out'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
