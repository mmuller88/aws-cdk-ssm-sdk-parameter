import * as cxschema from '@aws-cdk/cloud-assembly-schema';
import {
  Construct as CompatConstruct, ContextProvider,
} from '@aws-cdk/core';

export class StringParameterSDK {

  /**
   * Reads the value of an SSM parameter during synthesis through an
   * environmental context provider.
   *
   * Requires that the stack this scope is defined in will have explicit
   * account/region information. Otherwise, it will fail during synthesis.
   */
  public static valueFromLookup(scope: CompatConstruct, parameterName: string): string {
    const value = ContextProvider.getValue(scope, {
      provider: cxschema.ContextProvider.SSM_PARAMETER_PROVIDER,
      props: { parameterName },
      dummyValue: `dummy-value-for-${parameterName}`,
    }).value;

    return value;
  }
}