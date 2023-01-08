import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'basiq/3.0.0 (api/5.0.5)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * List all accounts belonging to a user
   *
   * @summary List all accounts
   */
  getAccounts(
    metadata: types.GetAccountsMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetAccountsResponse200>
    | FetchResponse<400, types.GetAccountsResponse400>
    | FetchResponse<403, types.GetAccountsResponse403>
    | FetchResponse<404, types.GetAccountsResponse404>
    | FetchResponse<500, types.GetAccountsResponse500>
  > {
    return this.core.fetch('/users/{userId}/accounts', 'get', metadata);
  }

  /**
   * Retrieve a specific account belonging to a user
   *
   * @summary Retrieve an account
   */
  getAccount(
    metadata: types.GetAccountMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetAccountResponse200>
    | FetchResponse<400, types.GetAccountResponse400>
    | FetchResponse<403, types.GetAccountResponse403>
    | FetchResponse<404, types.GetAccountResponse404>
    | FetchResponse<500, types.GetAccountResponse500>
  > {
    return this.core.fetch('/users/{userId}/accounts/{accountId}', 'get', metadata);
  }

  /**
   * List all transactions belonging to a specified user
   *
   * @summary List all transactions
   */
  getTransactions(
    metadata: types.GetTransactionsMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetTransactionsResponse200>
    | FetchResponse<400, types.GetTransactionsResponse400>
    | FetchResponse<403, types.GetTransactionsResponse403>
    | FetchResponse<404, types.GetTransactionsResponse404>
    | FetchResponse<500, types.GetTransactionsResponse500>
  > {
    return this.core.fetch('/users/{userId}/transactions', 'get', metadata);
  }

  /**
   * Retrieve an existing transaction
   *
   * @summary Retrieve a transaction
   */
  getTransaction(
    metadata: types.GetTransactionMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetTransactionResponse200>
    | FetchResponse<400, types.GetTransactionResponse400>
    | FetchResponse<403, types.GetTransactionResponse403>
    | FetchResponse<404, types.GetTransactionResponse404>
    | FetchResponse<500, types.GetTransactionResponse500>
    | FetchResponse<503, types.GetTransactionResponse503>
  > {
    return this.core.fetch('/users/{userId}/transactions/{transactionId}', 'get', metadata);
  }

  /**
   * Returns a list of connections belonging to this user. Each entry in the array is a
   * separate object. If no data is returned, the resulting array will be empty.
   *
   * @summary List all connections
   */
  getConnections(
    metadata: types.GetConnectionsMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetConnectionsResponse200>
    | FetchResponse<400, types.GetConnectionsResponse400>
    | FetchResponse<403, types.GetConnectionsResponse403>
    | FetchResponse<404, types.GetConnectionsResponse404>
    | FetchResponse<500, types.GetConnectionsResponse500>
    | FetchResponse<503, types.GetConnectionsResponse503>
  > {
    return this.core.fetch('/users/{userId}/connections', 'get', metadata);
  }

  /**
   * Use this to refresh all connections belonging to the specified user.
   *
   * @summary Refresh all connections
   */
  refreshConnections(
    metadata: types.RefreshConnectionsMetadataParam
  ): Promise<
    | FetchResponse<202, types.RefreshConnectionsResponse202>
    | FetchResponse<400, types.RefreshConnectionsResponse400>
    | FetchResponse<403, types.RefreshConnectionsResponse403>
    | FetchResponse<404, types.RefreshConnectionsResponse404>
    | FetchResponse<500, types.RefreshConnectionsResponse500>
  > {
    return this.core.fetch('/users/{userId}/connections/refresh', 'post', metadata);
  }

  /**
   * Use this to retrieve details of a specific connection. Note that due to security the
   * loginId, password, securityCode are never returned.
   *
   * @summary Retrieve a connection
   */
  getConnection(
    metadata: types.GetConnectionMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetConnectionResponse200>
    | FetchResponse<400, types.GetConnectionResponse400>
    | FetchResponse<401, types.GetConnectionResponse401>
    | FetchResponse<403, types.GetConnectionResponse403>
    | FetchResponse<404, types.GetConnectionResponse404>
    | FetchResponse<500, types.GetConnectionResponse500>
    | FetchResponse<503, types.GetConnectionResponse503>
  > {
    return this.core.fetch('/users/{userId}/connections/{connectionId}', 'get', metadata);
  }

  /**
   * Permanently deletes a connection. This does not include the existing account and
   * transaction data associated with it. This can not be undone.
   *
   * @summary Delete a connection
   */
  deleteConnection(
    metadata: types.DeleteConnectionMetadataParam
  ): Promise<
    | FetchResponse<400, types.DeleteConnectionResponse400>
    | FetchResponse<403, types.DeleteConnectionResponse403>
    | FetchResponse<404, types.DeleteConnectionResponse404>
    | FetchResponse<500, types.DeleteConnectionResponse500>
    | FetchResponse<503, types.DeleteConnectionResponse503>
  > {
    return this.core.fetch('/users/{userId}/connections/{connectionId}', 'delete', metadata);
  }

  /**
   * Use this to refresh an existing connection. This will not return a new connection.
   * Instead will return a job resource which is resonsible for refreshing the connection and
   * fetching data asynchronously. Use this job resource to track the connections progress.
   *
   * @summary Refresh a connection
   */
  refreshConnection(
    metadata: types.RefreshConnectionMetadataParam
  ): Promise<
    | FetchResponse<202, types.RefreshConnectionResponse202>
    | FetchResponse<400, types.RefreshConnectionResponse400>
    | FetchResponse<403, types.RefreshConnectionResponse403>
    | FetchResponse<404, types.RefreshConnectionResponse404>
    | FetchResponse<500, types.RefreshConnectionResponse500>
    | FetchResponse<503, types.RefreshConnectionResponse503>
  > {
    return this.core.fetch('/users/{userId}/connections/{connectionId}/refresh', 'post', metadata);
  }

  /**
   * NOTE: This end point requires authentication.
   *
   * @summary Retrieve connectors
   */
  getConnectors(
    metadata?: types.GetConnectorsMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetConnectorsResponse200>
    | FetchResponse<400, types.GetConnectorsResponse400>
    | FetchResponse<401, types.GetConnectorsResponse401>
    | FetchResponse<500, types.GetConnectorsResponse500>
  > {
    return this.core.fetch('/connectors', 'get', metadata);
  }

  /**
   * NOTE: This end point requires authentication.
   *
   * @summary Retrieve a connector
   */
  getConnector(
    metadata: types.GetConnectorMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetConnectorResponse200>
    | FetchResponse<400, types.GetConnectorResponse400>
    | FetchResponse<401, types.GetConnectorResponse401>
    | FetchResponse<404, types.GetConnectorResponse404>
    | FetchResponse<500, types.GetConnectorResponse500>
  > {
    return this.core.fetch('/connectors/{connectorId}/{method}', 'get', metadata);
  }
}

const createSDK = (() => {
  return new SDK();
})();
export default createSDK;

export type {
  DeleteConnectionMetadataParam,
  DeleteConnectionResponse400,
  DeleteConnectionResponse403,
  DeleteConnectionResponse404,
  DeleteConnectionResponse500,
  DeleteConnectionResponse503,
  GetAccountMetadataParam,
  GetAccountResponse200,
  GetAccountResponse400,
  GetAccountResponse403,
  GetAccountResponse404,
  GetAccountResponse500,
  GetAccountsMetadataParam,
  GetAccountsResponse200,
  GetAccountsResponse400,
  GetAccountsResponse403,
  GetAccountsResponse404,
  GetAccountsResponse500,
  GetConnectionMetadataParam,
  GetConnectionResponse200,
  GetConnectionResponse400,
  GetConnectionResponse401,
  GetConnectionResponse403,
  GetConnectionResponse404,
  GetConnectionResponse500,
  GetConnectionResponse503,
  GetConnectionsMetadataParam,
  GetConnectionsResponse200,
  GetConnectionsResponse400,
  GetConnectionsResponse403,
  GetConnectionsResponse404,
  GetConnectionsResponse500,
  GetConnectionsResponse503,
  GetConnectorMetadataParam,
  GetConnectorResponse200,
  GetConnectorResponse400,
  GetConnectorResponse401,
  GetConnectorResponse404,
  GetConnectorResponse500,
  GetConnectorsMetadataParam,
  GetConnectorsResponse200,
  GetConnectorsResponse400,
  GetConnectorsResponse401,
  GetConnectorsResponse500,
  GetTransactionMetadataParam,
  GetTransactionResponse200,
  GetTransactionResponse400,
  GetTransactionResponse403,
  GetTransactionResponse404,
  GetTransactionResponse500,
  GetTransactionResponse503,
  GetTransactionsMetadataParam,
  GetTransactionsResponse200,
  GetTransactionsResponse400,
  GetTransactionsResponse403,
  GetTransactionsResponse404,
  GetTransactionsResponse500,
  RefreshConnectionMetadataParam,
  RefreshConnectionResponse202,
  RefreshConnectionResponse400,
  RefreshConnectionResponse403,
  RefreshConnectionResponse404,
  RefreshConnectionResponse500,
  RefreshConnectionResponse503,
  RefreshConnectionsMetadataParam,
  RefreshConnectionsResponse202,
  RefreshConnectionsResponse400,
  RefreshConnectionsResponse403,
  RefreshConnectionsResponse404,
  RefreshConnectionsResponse500,
} from './types';
