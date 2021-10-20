import 'isomorphic-fetch';
import Ajv, { AnySchemaObject, ValidateFunction } from 'ajv/dist/2020';
import addFormats from 'ajv-formats';

const assertSchemaVersionFormat = (version: string): void => {
  if (!/^\d-\d-\d$/.test(version)) {
    throw new Error(`Invalid schema version format: "${version}"! Expected: x-y-z`);
  }
};

export const loadSchema = async (uri: string): Promise<AnySchemaObject> => {
  const response = await fetch(uri);
  if (response.status >= 400) {
    throw new Error(`Schema loading error: ${response.statusText}. Ref: "${uri}"`);
  }
  return (await response.json()) as AnySchemaObject;
};

export const SCHEMA_BASE_URI = 'https://raw.githubusercontent.com/iqlabsorg/iq-schemas/main/schemas';
const ajv = new Ajv({ allErrors: true, loadSchema });
addFormats(ajv, ['uri']);

export const getSchemaValidator = async (schemaRef: string): Promise<ValidateFunction> => {
  return ajv.getSchema(schemaRef) ?? (await ajv.compileAsync(await loadSchema(schemaRef)));
};

export const getEnterpriseSchemaValidator = async (version: string): Promise<ValidateFunction> => {
  return await getSchemaValidator(enterpriseSchemaRef(version));
};

export const getConnectorSchemaValidator = async (connector: string, version: string): Promise<ValidateFunction> => {
  return await getSchemaValidator(connectorSchemaRef(connector, version));
};

export const enterpriseSchemaRef = (version: string): string => {
  assertSchemaVersionFormat(version);
  return `${SCHEMA_BASE_URI}/enterprise/${version}.json`;
};

export const connectorSchemaRef = (connector: string, version: string): string => {
  assertSchemaVersionFormat(version);
  return `${SCHEMA_BASE_URI}/connectors/${connector.toLowerCase()}/${version}.json`;
};
