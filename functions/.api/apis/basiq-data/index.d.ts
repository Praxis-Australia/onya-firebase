import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
  spec: Oas;
  core: APICore;
  constructor();
  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions): void;
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
  auth(...values: string[] | number[]): this;
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
  server(url: string, variables?: {}): void;
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
  >;
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
  >;
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
  >;
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
  >;
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
  >;
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
  >;
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
  >;
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
  >;
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
  >;
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
  >;
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
  >;
}
declare const createSDK: SDK;
export = createSDK;
