/* eslint-disable @typescript-eslint/no-var-requires */
import * as utils from '../src';
import { AnySchemaObject } from 'ajv';

const {
  SCHEMA_BASE_URI,
  enterpriseSchemaRef,
  connectorSchemaRef,
  getEnterpriseSchemaValidator,
  getConnectorSchemaValidator,
} = utils;

describe('IQ Schemas Utils', () => {
  const invalidVersions = ['', '1', '1-0', '1.0.0', '1-0.2', '1-2-3-4'];

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('enterpriseSchemaRef', () => {
    it('ensures correct version format', () => {
      invalidVersions.forEach((version: string): void => {
        expect(() => enterpriseSchemaRef(version)).toThrow('Invalid schema version format');
      });
    });

    it('builds correct schema reference', () => {
      expect(enterpriseSchemaRef('1-2-3')).toEqual(`${SCHEMA_BASE_URI}/enterprise/1-2-3.json`);
    });
  });

  describe('connectorSchemaRef', () => {
    it('ensures correct version format', () => {
      invalidVersions.forEach((version: string): void => {
        expect(() => connectorSchemaRef('iq-space', version)).toThrow('Invalid schema version format');
      });
    });

    it('builds correct schema reference', () => {
      expect(connectorSchemaRef('iq-space', '1-2-3')).toEqual(`${SCHEMA_BASE_URI}/connectors/iq-space/1-2-3.json`);
    });
  });

  describe('getEnterpriseSchemaValidator', () => {
    it('returns validator for correct schema', async () => {
      const expectedSchema = require('../schemas/enterprise/1-0-0.json') as AnySchemaObject;
      jest.spyOn(utils, 'loadSchema').mockResolvedValueOnce(expectedSchema);
      const validate = await getEnterpriseSchemaValidator('1-0-0');
      expect(validate.schema).toEqual(expectedSchema);
    });
  });

  describe('getConnectorSchemaValidator', () => {
    it('returns validator for correct schema', async () => {
      const expectedSchema = require('../schemas/connectors/iq-space/1-0-0.json') as AnySchemaObject;
      jest.spyOn(utils, 'loadSchema').mockResolvedValueOnce(expectedSchema);
      const validate = await getConnectorSchemaValidator('iq-space', '1-0-0');
      expect(validate.schema).toEqual(expectedSchema);
    });
  });
});
