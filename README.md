# IQ Schemas

The IQ Schemas is a set of [JSON schemas](https://json-schema.org/) which should help to ensure interoperability between services within IQ Protocol ecosystem.


## Installation
```bash
yarn add @iqprotocol/schemas
```

## Usage

Validate data with enterprise schema:
```ts
import { getEnterpriseSchemaValidator } from '@iqprotocol/schemas' 

const validate = await getEnterpriseSchemaValidator('1-0-0');
const data = {/* ... */}; 
const valid = validate(data);
if (!valid) console.log(validate.errors);

```

Validate data with connector schema:
```ts
import { getConnectorSchemaValidator } from '@iqprotocol/schemas' 

const validate = await getConnectorSchemaValidator('iq-space', '1-0-0');
const data = {/* ... */}; 
const valid = validate(data);
if (!valid) console.log(validate.errors);

```
