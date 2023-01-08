import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type DeleteConnectionMetadataParam = FromSchema<typeof schemas.DeleteConnection.metadata>;
export type DeleteConnectionResponse400 = FromSchema<
  (typeof schemas.DeleteConnection.response)['400']
>;
export type DeleteConnectionResponse403 = FromSchema<
  (typeof schemas.DeleteConnection.response)['403']
>;
export type DeleteConnectionResponse404 = FromSchema<
  (typeof schemas.DeleteConnection.response)['404']
>;
export type DeleteConnectionResponse500 = FromSchema<
  (typeof schemas.DeleteConnection.response)['500']
>;
export type DeleteConnectionResponse503 = FromSchema<
  (typeof schemas.DeleteConnection.response)['503']
>;
export type GetAccountMetadataParam = FromSchema<typeof schemas.GetAccount.metadata>;
export type GetAccountResponse200 = FromSchema<(typeof schemas.GetAccount.response)['200']>;
export type GetAccountResponse400 = FromSchema<(typeof schemas.GetAccount.response)['400']>;
export type GetAccountResponse403 = FromSchema<(typeof schemas.GetAccount.response)['403']>;
export type GetAccountResponse404 = FromSchema<(typeof schemas.GetAccount.response)['404']>;
export type GetAccountResponse500 = FromSchema<(typeof schemas.GetAccount.response)['500']>;
export type GetAccountsMetadataParam = FromSchema<typeof schemas.GetAccounts.metadata>;
export type GetAccountsResponse200 = FromSchema<(typeof schemas.GetAccounts.response)['200']>;
export type GetAccountsResponse400 = FromSchema<(typeof schemas.GetAccounts.response)['400']>;
export type GetAccountsResponse403 = FromSchema<(typeof schemas.GetAccounts.response)['403']>;
export type GetAccountsResponse404 = FromSchema<(typeof schemas.GetAccounts.response)['404']>;
export type GetAccountsResponse500 = FromSchema<(typeof schemas.GetAccounts.response)['500']>;
export type GetConnectionMetadataParam = FromSchema<typeof schemas.GetConnection.metadata>;
export type GetConnectionResponse200 = FromSchema<(typeof schemas.GetConnection.response)['200']>;
export type GetConnectionResponse400 = FromSchema<(typeof schemas.GetConnection.response)['400']>;
export type GetConnectionResponse401 = FromSchema<(typeof schemas.GetConnection.response)['401']>;
export type GetConnectionResponse403 = FromSchema<(typeof schemas.GetConnection.response)['403']>;
export type GetConnectionResponse404 = FromSchema<(typeof schemas.GetConnection.response)['404']>;
export type GetConnectionResponse500 = FromSchema<(typeof schemas.GetConnection.response)['500']>;
export type GetConnectionResponse503 = FromSchema<(typeof schemas.GetConnection.response)['503']>;
export type GetConnectionsMetadataParam = FromSchema<typeof schemas.GetConnections.metadata>;
export type GetConnectionsResponse200 = FromSchema<(typeof schemas.GetConnections.response)['200']>;
export type GetConnectionsResponse400 = FromSchema<(typeof schemas.GetConnections.response)['400']>;
export type GetConnectionsResponse403 = FromSchema<(typeof schemas.GetConnections.response)['403']>;
export type GetConnectionsResponse404 = FromSchema<(typeof schemas.GetConnections.response)['404']>;
export type GetConnectionsResponse500 = FromSchema<(typeof schemas.GetConnections.response)['500']>;
export type GetConnectionsResponse503 = FromSchema<(typeof schemas.GetConnections.response)['503']>;
export type GetConnectorMetadataParam = FromSchema<typeof schemas.GetConnector.metadata>;
export type GetConnectorResponse200 = FromSchema<(typeof schemas.GetConnector.response)['200']>;
export type GetConnectorResponse400 = FromSchema<(typeof schemas.GetConnector.response)['400']>;
export type GetConnectorResponse401 = FromSchema<(typeof schemas.GetConnector.response)['401']>;
export type GetConnectorResponse404 = FromSchema<(typeof schemas.GetConnector.response)['404']>;
export type GetConnectorResponse500 = FromSchema<(typeof schemas.GetConnector.response)['500']>;
export type GetConnectorsMetadataParam = FromSchema<typeof schemas.GetConnectors.metadata>;
export type GetConnectorsResponse200 = FromSchema<(typeof schemas.GetConnectors.response)['200']>;
export type GetConnectorsResponse400 = FromSchema<(typeof schemas.GetConnectors.response)['400']>;
export type GetConnectorsResponse401 = FromSchema<(typeof schemas.GetConnectors.response)['401']>;
export type GetConnectorsResponse500 = FromSchema<(typeof schemas.GetConnectors.response)['500']>;
export type GetTransactionMetadataParam = FromSchema<typeof schemas.GetTransaction.metadata>;
export type GetTransactionResponse200 = FromSchema<(typeof schemas.GetTransaction.response)['200']>;
export type GetTransactionResponse400 = FromSchema<(typeof schemas.GetTransaction.response)['400']>;
export type GetTransactionResponse403 = FromSchema<(typeof schemas.GetTransaction.response)['403']>;
export type GetTransactionResponse404 = FromSchema<(typeof schemas.GetTransaction.response)['404']>;
export type GetTransactionResponse500 = FromSchema<(typeof schemas.GetTransaction.response)['500']>;
export type GetTransactionResponse503 = FromSchema<(typeof schemas.GetTransaction.response)['503']>;
export type GetTransactionsMetadataParam = FromSchema<typeof schemas.GetTransactions.metadata>;
export type GetTransactionsResponse200 = FromSchema<
  (typeof schemas.GetTransactions.response)['200']
>;
export type GetTransactionsResponse400 = FromSchema<
  (typeof schemas.GetTransactions.response)['400']
>;
export type GetTransactionsResponse403 = FromSchema<
  (typeof schemas.GetTransactions.response)['403']
>;
export type GetTransactionsResponse404 = FromSchema<
  (typeof schemas.GetTransactions.response)['404']
>;
export type GetTransactionsResponse500 = FromSchema<
  (typeof schemas.GetTransactions.response)['500']
>;
export type RefreshConnectionMetadataParam = FromSchema<typeof schemas.RefreshConnection.metadata>;
export type RefreshConnectionResponse202 = FromSchema<
  (typeof schemas.RefreshConnection.response)['202']
>;
export type RefreshConnectionResponse400 = FromSchema<
  (typeof schemas.RefreshConnection.response)['400']
>;
export type RefreshConnectionResponse403 = FromSchema<
  (typeof schemas.RefreshConnection.response)['403']
>;
export type RefreshConnectionResponse404 = FromSchema<
  (typeof schemas.RefreshConnection.response)['404']
>;
export type RefreshConnectionResponse500 = FromSchema<
  (typeof schemas.RefreshConnection.response)['500']
>;
export type RefreshConnectionResponse503 = FromSchema<
  (typeof schemas.RefreshConnection.response)['503']
>;
export type RefreshConnectionsMetadataParam = FromSchema<
  typeof schemas.RefreshConnections.metadata
>;
export type RefreshConnectionsResponse202 = FromSchema<
  (typeof schemas.RefreshConnections.response)['202']
>;
export type RefreshConnectionsResponse400 = FromSchema<
  (typeof schemas.RefreshConnections.response)['400']
>;
export type RefreshConnectionsResponse403 = FromSchema<
  (typeof schemas.RefreshConnections.response)['403']
>;
export type RefreshConnectionsResponse404 = FromSchema<
  (typeof schemas.RefreshConnections.response)['404']
>;
export type RefreshConnectionsResponse500 = FromSchema<
  (typeof schemas.RefreshConnections.response)['500']
>;
