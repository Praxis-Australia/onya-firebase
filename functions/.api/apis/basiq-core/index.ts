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
   * Use this endpoint to retrieve a token that will be passed as authorization header for
   * Basiq API
   *
   * @summary Generate an auth token
   */
  postToken(
    body: types.PostTokenFormDataParam,
    metadata: types.PostTokenMetadataParam
  ): Promise<
    | FetchResponse<200, types.PostTokenResponse200>
    | FetchResponse<400, types.PostTokenResponse400>
    | FetchResponse<404, types.PostTokenResponse404>
    | FetchResponse<500, types.PostTokenResponse500>
  >;
  /**
   * Use this endpoint to retrieve a token that will be passed as authorization header for
   * Basiq API
   *
   * @summary Generate an auth token
   */
  postToken(
    metadata: types.PostTokenMetadataParam
  ): Promise<
    | FetchResponse<200, types.PostTokenResponse200>
    | FetchResponse<400, types.PostTokenResponse400>
    | FetchResponse<404, types.PostTokenResponse404>
    | FetchResponse<500, types.PostTokenResponse500>
  >;
  /**
   * Use this endpoint to retrieve a token that will be passed as authorization header for
   * Basiq API
   *
   * @summary Generate an auth token
   */
  postToken(
    body?: types.PostTokenFormDataParam | types.PostTokenMetadataParam,
    metadata?: types.PostTokenMetadataParam
  ): Promise<
    | FetchResponse<200, types.PostTokenResponse200>
    | FetchResponse<400, types.PostTokenResponse400>
    | FetchResponse<404, types.PostTokenResponse404>
    | FetchResponse<500, types.PostTokenResponse500>
  > {
    return this.core.fetch('/token', 'post', body, metadata);
  }

  /**
   * Creates a new Basiq user object
   *
   * @summary Create a user
   */
  createUser(
    body: types.CreateUserBodyParam
  ): Promise<
    | FetchResponse<201, types.CreateUserResponse201>
    | FetchResponse<400, types.CreateUserResponse400>
    | FetchResponse<403, types.CreateUserResponse403>
    | FetchResponse<404, types.CreateUserResponse404>
    | FetchResponse<500, types.CreateUserResponse500>
  > {
    return this.core.fetch('/users', 'post', body);
  }

  /**
   * Retrieves the details of an existing user. You need only supply the unique user
   * identifier that was returned upon user creation.
   *
   * @summary Retrieve a user
   */
  getUser(
    metadata: types.GetUserMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetUserResponse200>
    | FetchResponse<400, types.GetUserResponse400>
    | FetchResponse<401, types.GetUserResponse401>
    | FetchResponse<403, types.GetUserResponse403>
    | FetchResponse<404, types.GetUserResponse404>
    | FetchResponse<500, types.GetUserResponse500>
  > {
    return this.core.fetch('/users/{userId}', 'get', metadata);
  }

  /**
   * Updates the specified user by setting the values of the parameters passed. Any
   * parameters not provided will be left unchanged.
   *
   * @summary Update a user
   */
  updateUser(
    body: types.UpdateUserBodyParam,
    metadata: types.UpdateUserMetadataParam
  ): Promise<
    | FetchResponse<200, types.UpdateUserResponse200>
    | FetchResponse<400, types.UpdateUserResponse400>
    | FetchResponse<403, types.UpdateUserResponse403>
    | FetchResponse<404, types.UpdateUserResponse404>
    | FetchResponse<500, types.UpdateUserResponse500>
  > {
    return this.core.fetch('/users/{userId}', 'post', body, metadata);
  }

  /**
   * Permanently deletes a user along with all of their associated connection details. All
   * data associated with this user will deleted. You need only supply the unique user
   * identifier that was returned upon user creation.
   *
   * @summary Delete a user
   */
  deleteUser(
    metadata: types.DeleteUserMetadataParam
  ): Promise<
    | FetchResponse<400, types.DeleteUserResponse400>
    | FetchResponse<403, types.DeleteUserResponse403>
    | FetchResponse<404, types.DeleteUserResponse404>
    | FetchResponse<500, types.DeleteUserResponse500>
    | FetchResponse<503, types.DeleteUserResponse503>
  > {
    return this.core.fetch('/users/{userId}', 'delete', metadata);
  }

  /**
   * Retrieves a list of the user consents
   *
   * @summary Retrieve consents
   */
  getConsents(
    metadata: types.GetConsentsMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetConsentsResponse200>
    | FetchResponse<400, types.GetConsentsResponse400>
    | FetchResponse<401, types.GetConsentsResponse401>
    | FetchResponse<403, types.GetConsentsResponse403>
    | FetchResponse<404, types.GetConsentsResponse404>
    | FetchResponse<500, types.GetConsentsResponse500>
  > {
    return this.core.fetch('/users/{userId}/consents', 'get', metadata);
  }

  /**
   * Permanently deletes a users consent, this action cannot be undone.
   *
   * @summary Delete a consent
   */
  deleteConsent(
    metadata: types.DeleteConsentMetadataParam
  ): Promise<
    | FetchResponse<400, types.DeleteConsentResponse400>
    | FetchResponse<403, types.DeleteConsentResponse403>
    | FetchResponse<404, types.DeleteConsentResponse404>
    | FetchResponse<500, types.DeleteConsentResponse500>
    | FetchResponse<503, types.DeleteConsentResponse503>
  > {
    return this.core.fetch('/users/{userId}/consents/{consentId}', 'delete', metadata);
  }

  /**
   * Create a new auth_link object by making a POST request to the auth_link endpoint. The
   * new auth_link will effectively delete previous auth-links for that User/applicant,
   * rendering the previous URL(s) invalid. The 'mobile' attribute is optional. If it is
   * specified this number will take preference over the User object mobile number for 2FA
   * SMS verification.
   *
   * Returns a created auth_link resource, if the operation succeeded. Returns an error if
   * the post failed (e.g. not supplying required properties).
   *
   * @summary Create an auth_link
   */
  postAuthLink(
    body: types.PostAuthLinkBodyParam,
    metadata: types.PostAuthLinkMetadataParam
  ): Promise<
    | FetchResponse<201, types.PostAuthLinkResponse201>
    | FetchResponse<400, types.PostAuthLinkResponse400>
    | FetchResponse<403, types.PostAuthLinkResponse403>
    | FetchResponse<404, types.PostAuthLinkResponse404>
    | FetchResponse<500, types.PostAuthLinkResponse500>
  >;
  /**
   * Create a new auth_link object by making a POST request to the auth_link endpoint. The
   * new auth_link will effectively delete previous auth-links for that User/applicant,
   * rendering the previous URL(s) invalid. The 'mobile' attribute is optional. If it is
   * specified this number will take preference over the User object mobile number for 2FA
   * SMS verification.
   *
   * Returns a created auth_link resource, if the operation succeeded. Returns an error if
   * the post failed (e.g. not supplying required properties).
   *
   * @summary Create an auth_link
   */
  postAuthLink(
    metadata: types.PostAuthLinkMetadataParam
  ): Promise<
    | FetchResponse<201, types.PostAuthLinkResponse201>
    | FetchResponse<400, types.PostAuthLinkResponse400>
    | FetchResponse<403, types.PostAuthLinkResponse403>
    | FetchResponse<404, types.PostAuthLinkResponse404>
    | FetchResponse<500, types.PostAuthLinkResponse500>
  >;
  /**
   * Create a new auth_link object by making a POST request to the auth_link endpoint. The
   * new auth_link will effectively delete previous auth-links for that User/applicant,
   * rendering the previous URL(s) invalid. The 'mobile' attribute is optional. If it is
   * specified this number will take preference over the User object mobile number for 2FA
   * SMS verification.
   *
   * Returns a created auth_link resource, if the operation succeeded. Returns an error if
   * the post failed (e.g. not supplying required properties).
   *
   * @summary Create an auth_link
   */
  postAuthLink(
    body?: types.PostAuthLinkBodyParam | types.PostAuthLinkMetadataParam,
    metadata?: types.PostAuthLinkMetadataParam
  ): Promise<
    | FetchResponse<201, types.PostAuthLinkResponse201>
    | FetchResponse<400, types.PostAuthLinkResponse400>
    | FetchResponse<403, types.PostAuthLinkResponse403>
    | FetchResponse<404, types.PostAuthLinkResponse404>
    | FetchResponse<500, types.PostAuthLinkResponse500>
  > {
    return this.core.fetch('/users/{userId}/auth_link', 'post', body, metadata);
  }

  /**
   * Returns the latest/last auth_link generated for the specified user. Returns an error
   * otherwise.
   *
   * @summary Retrieve an auth_link
   */
  getAuthLink(
    metadata: types.GetAuthLinkMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetAuthLinkResponse200>
    | FetchResponse<400, types.GetAuthLinkResponse400>
    | FetchResponse<403, types.GetAuthLinkResponse403>
    | FetchResponse<404, types.GetAuthLinkResponse404>
    | FetchResponse<410, types.GetAuthLinkResponse410>
    | FetchResponse<500, types.GetAuthLinkResponse500>
    | FetchResponse<503, types.GetAuthLinkResponse503>
  > {
    return this.core.fetch('/users/{userId}/auth_link', 'get', metadata);
  }

  /**
   * <blockquote>Note that this action cannot be undone.</blockquote>
   *
   * <blockquote>The auth_link is a URL that directs a User to Basiq's hosted consent
   * workflow to link banks and securely share data. When the user selects 'I have disclosed
   * all my accounts' the auth_link is automatically deleted.</blockquote>
   *
   * Returns an empty body if the delete succeeded. Otherwise, this call returns an error in
   * the event of a failure.
   *
   * @summary Delete an auth_link
   */
  deleteAuthLink(
    metadata: types.DeleteAuthLinkMetadataParam
  ): Promise<
    | FetchResponse<400, types.DeleteAuthLinkResponse400>
    | FetchResponse<404, types.DeleteAuthLinkResponse404>
    | FetchResponse<500, types.DeleteAuthLinkResponse500>
    | FetchResponse<503, types.DeleteAuthLinkResponse503>
  > {
    return this.core.fetch('/users/{userId}/auth_link', 'delete', metadata);
  }

  /**
   * Returns a list of all events that have taken place.
   *
   * @summary List all events
   */
  getEvents(
    metadata?: types.GetEventsMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetEventsResponse200>
    | FetchResponse<400, types.GetEventsResponse400>
    | FetchResponse<403, types.GetEventsResponse403>
    | FetchResponse<404, types.GetEventsResponse404>
    | FetchResponse<500, types.GetEventsResponse500>
    | FetchResponse<503, types.GetEventsResponse503>
  > {
    return this.core.fetch('/events', 'get', metadata);
  }

  /**
   * Retrieves the details of all existing and previous jobs associated with a user.
   *
   * @summary Get user jobs
   */
  getUserJobs(
    metadata: types.GetUserJobsMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetUserJobsResponse200>
    | FetchResponse<400, types.GetUserJobsResponse400>
    | FetchResponse<403, types.GetUserJobsResponse403>
    | FetchResponse<404, types.GetUserJobsResponse404>
    | FetchResponse<500, types.GetUserJobsResponse500>
  > {
    return this.core.fetch('/users/{userId}/jobs', 'get', metadata);
  }

  /**
   * Retrieves the details of an existing job. You need only supply the unique job identifier
   * that was returned upon job creation.
   *
   * @summary Retrieve a job
   */
  getJobs(
    metadata: types.GetJobsMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetJobsResponse200>
    | FetchResponse<400, types.GetJobsResponse400>
    | FetchResponse<403, types.GetJobsResponse403>
    | FetchResponse<404, types.GetJobsResponse404>
    | FetchResponse<500, types.GetJobsResponse500>
  > {
    return this.core.fetch('/jobs/{jobId}', 'get', metadata);
  }

  /**
   * Ensure that you generate an authentication token with
   * scope = CLIENT_ACCESS and basiq-version = 3.0 to create this resource
   *
   * @summary Create MFA response
   */
  postJobMfa(
    body: types.PostJobMfaBodyParam,
    metadata: types.PostJobMfaMetadataParam
  ): Promise<
    | FetchResponse<202, types.PostJobMfaResponse202>
    | FetchResponse<400, types.PostJobMfaResponse400>
    | FetchResponse<403, types.PostJobMfaResponse403>
    | FetchResponse<404, types.PostJobMfaResponse404>
    | FetchResponse<500, types.PostJobMfaResponse500>
  > {
    return this.core.fetch('/jobs/{jobId}/mfa', 'post', body, metadata);
  }
}

const createSDK = (() => {
  return new SDK();
})();
export default createSDK;

export type {
  CreateUserBodyParam,
  CreateUserResponse201,
  CreateUserResponse400,
  CreateUserResponse403,
  CreateUserResponse404,
  CreateUserResponse500,
  DeleteAuthLinkMetadataParam,
  DeleteAuthLinkResponse400,
  DeleteAuthLinkResponse404,
  DeleteAuthLinkResponse500,
  DeleteAuthLinkResponse503,
  DeleteConsentMetadataParam,
  DeleteConsentResponse400,
  DeleteConsentResponse403,
  DeleteConsentResponse404,
  DeleteConsentResponse500,
  DeleteConsentResponse503,
  DeleteUserMetadataParam,
  DeleteUserResponse400,
  DeleteUserResponse403,
  DeleteUserResponse404,
  DeleteUserResponse500,
  DeleteUserResponse503,
  GetAuthLinkMetadataParam,
  GetAuthLinkResponse200,
  GetAuthLinkResponse400,
  GetAuthLinkResponse403,
  GetAuthLinkResponse404,
  GetAuthLinkResponse410,
  GetAuthLinkResponse500,
  GetAuthLinkResponse503,
  GetConsentsMetadataParam,
  GetConsentsResponse200,
  GetConsentsResponse400,
  GetConsentsResponse401,
  GetConsentsResponse403,
  GetConsentsResponse404,
  GetConsentsResponse500,
  GetEventsMetadataParam,
  GetEventsResponse200,
  GetEventsResponse400,
  GetEventsResponse403,
  GetEventsResponse404,
  GetEventsResponse500,
  GetEventsResponse503,
  GetJobsMetadataParam,
  GetJobsResponse200,
  GetJobsResponse400,
  GetJobsResponse403,
  GetJobsResponse404,
  GetJobsResponse500,
  GetUserJobsMetadataParam,
  GetUserJobsResponse200,
  GetUserJobsResponse400,
  GetUserJobsResponse403,
  GetUserJobsResponse404,
  GetUserJobsResponse500,
  GetUserMetadataParam,
  GetUserResponse200,
  GetUserResponse400,
  GetUserResponse401,
  GetUserResponse403,
  GetUserResponse404,
  GetUserResponse500,
  PostAuthLinkBodyParam,
  PostAuthLinkMetadataParam,
  PostAuthLinkResponse201,
  PostAuthLinkResponse400,
  PostAuthLinkResponse403,
  PostAuthLinkResponse404,
  PostAuthLinkResponse500,
  PostJobMfaBodyParam,
  PostJobMfaMetadataParam,
  PostJobMfaResponse202,
  PostJobMfaResponse400,
  PostJobMfaResponse403,
  PostJobMfaResponse404,
  PostJobMfaResponse500,
  PostTokenFormDataParam,
  PostTokenMetadataParam,
  PostTokenResponse200,
  PostTokenResponse400,
  PostTokenResponse404,
  PostTokenResponse500,
  UpdateUserBodyParam,
  UpdateUserMetadataParam,
  UpdateUserResponse200,
  UpdateUserResponse400,
  UpdateUserResponse403,
  UpdateUserResponse404,
  UpdateUserResponse500,
} from './types';
