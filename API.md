# API Reference

**Classes**

Name|Description
----|-----------
[SSMParameter](#aws-cdk-ssm-sdk-parameter-ssmparameter)|*No description*


**Structs**

Name|Description
----|-----------
[SSMParameterProps](#aws-cdk-ssm-sdk-parameter-ssmparameterprops)|*No description*


**Enums**

Name|Description
----|-----------
[SSMParameterType](#aws-cdk-ssm-sdk-parameter-ssmparametertype)|The SSM Parameter type.



## class SSMParameter  <a id="aws-cdk-ssm-sdk-parameter-ssmparameter"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new SSMParameter(parent: Stack, name: string, props: SSMParameterProps)
```

* **parent** (<code>[Stack](#aws-cdk-core-stack)</code>)  *No description*
* **name** (<code>string</code>)  *No description*
* **props** (<code>[SSMParameterProps](#aws-cdk-ssm-sdk-parameter-ssmparameterprops)</code>)  *No description*
  * **parameterName** (<code>string</code>)  *No description* 
  * **defaultValue** (<code>string</code>)  if the parameter couldn't be found that will be the default value. __*Optional*__
  * **delete** (<code>boolean</code>)  Optional parameter for deleting the SSM Parameter if the stack gets deleted. __*Default*__: false
  * **type** (<code>[SSMParameterType](#aws-cdk-ssm-sdk-parameter-ssmparametertype)</code>)  The SSM Parameter type. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**parameterName** | <code>string</code> | <span></span>
**parameterValue** | <code>string</code> | the returned parameter for the SSM Parameter.



## struct SSMParameterProps  <a id="aws-cdk-ssm-sdk-parameter-ssmparameterprops"></a>






Name | Type | Description 
-----|------|-------------
**parameterName** | <code>string</code> | <span></span>
**defaultValue**? | <code>string</code> | if the parameter couldn't be found that will be the default value.<br/>__*Optional*__
**delete**? | <code>boolean</code> | Optional parameter for deleting the SSM Parameter if the stack gets deleted.<br/>__*Default*__: false
**type**? | <code>[SSMParameterType](#aws-cdk-ssm-sdk-parameter-ssmparametertype)</code> | The SSM Parameter type.<br/>__*Optional*__



## enum SSMParameterType  <a id="aws-cdk-ssm-sdk-parameter-ssmparametertype"></a>

The SSM Parameter type.

SecureString is atm not supported

Name | Description
-----|-----
**STRING** |
**STRING_LIST** |


