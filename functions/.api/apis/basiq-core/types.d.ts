import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';
export type CreateUserBodyParam = FromSchema<typeof schemas.CreateUser.body>;
export type CreateUserResponse201 = FromSchema<(typeof schemas.CreateUser.response)['201']>;
export type CreateUserResponse400 = FromSchema<(typeof schemas.CreateUser.response)['400']>;
export type CreateUserResponse403 = FromSchema<(typeof schemas.CreateUser.response)['403']>;
export type CreateUserResponse404 = FromSchema<(typeof schemas.CreateUser.response)['404']>;
export type CreateUserResponse500 = FromSchema<(typeof schemas.CreateUser.response)['500']>;
export type DeleteAuthLinkMetadataParam = FromSchema<typeof schemas.DeleteAuthLink.metadata>;
export type DeleteAuthLinkResponse400 = FromSchema<(typeof schemas.DeleteAuthLink.response)['400']>;
export type DeleteAuthLinkResponse404 = FromSchema<(typeof schemas.DeleteAuthLink.response)['404']>;
export type DeleteAuthLinkResponse500 = FromSchema<(typeof schemas.DeleteAuthLink.response)['500']>;
export type DeleteAuthLinkResponse503 = FromSchema<(typeof schemas.DeleteAuthLink.response)['503']>;
export type DeleteConsentMetadataParam = FromSchema<typeof schemas.DeleteConsent.metadata>;
export type DeleteConsentResponse400 = FromSchema<(typeof schemas.DeleteConsent.response)['400']>;
export type DeleteConsentResponse403 = FromSchema<(typeof schemas.DeleteConsent.response)['403']>;
export type DeleteConsentResponse404 = FromSchema<(typeof schemas.DeleteConsent.response)['404']>;
export type DeleteConsentResponse500 = FromSchema<(typeof schemas.DeleteConsent.response)['500']>;
export type DeleteConsentResponse503 = FromSchema<(typeof schemas.DeleteConsent.response)['503']>;
export type DeleteUserMetadataParam = FromSchema<typeof schemas.DeleteUser.metadata>;
export type DeleteUserResponse400 = FromSchema<(typeof schemas.DeleteUser.response)['400']>;
export type DeleteUserResponse403 = FromSchema<(typeof schemas.DeleteUser.response)['403']>;
export type DeleteUserResponse404 = FromSchema<(typeof schemas.DeleteUser.response)['404']>;
export type DeleteUserResponse500 = FromSchema<(typeof schemas.DeleteUser.response)['500']>;
export type DeleteUserResponse503 = FromSchema<(typeof schemas.DeleteUser.response)['503']>;
export type GetAuthLinkMetadataParam = FromSchema<typeof schemas.GetAuthLink.metadata>;
export type GetAuthLinkResponse200 = FromSchema<(typeof schemas.GetAuthLink.response)['200']>;
export type GetAuthLinkResponse400 = FromSchema<(typeof schemas.GetAuthLink.response)['400']>;
export type GetAuthLinkResponse403 = FromSchema<(typeof schemas.GetAuthLink.response)['403']>;
export type GetAuthLinkResponse404 = FromSchema<(typeof schemas.GetAuthLink.response)['404']>;
export type GetAuthLinkResponse410 = FromSchema<(typeof schemas.GetAuthLink.response)['410']>;
export type GetAuthLinkResponse500 = FromSchema<(typeof schemas.GetAuthLink.response)['500']>;
export type GetAuthLinkResponse503 = FromSchema<(typeof schemas.GetAuthLink.response)['503']>;
export type GetConsentsMetadataParam = FromSchema<typeof schemas.GetConsents.metadata>;
export type GetConsentsResponse200 = FromSchema<(typeof schemas.GetConsents.response)['200']>;
export type GetConsentsResponse400 = FromSchema<(typeof schemas.GetConsents.response)['400']>;
export type GetConsentsResponse401 = FromSchema<(typeof schemas.GetConsents.response)['401']>;
export type GetConsentsResponse403 = FromSchema<(typeof schemas.GetConsents.response)['403']>;
export type GetConsentsResponse404 = FromSchema<(typeof schemas.GetConsents.response)['404']>;
export type GetConsentsResponse500 = FromSchema<(typeof schemas.GetConsents.response)['500']>;
export type GetEventsMetadataParam = FromSchema<typeof schemas.GetEvents.metadata>;
export type GetEventsResponse200 = FromSchema<(typeof schemas.GetEvents.response)['200']>;
export type GetEventsResponse400 = FromSchema<(typeof schemas.GetEvents.response)['400']>;
export type GetEventsResponse403 = FromSchema<(typeof schemas.GetEvents.response)['403']>;
export type GetEventsResponse404 = FromSchema<(typeof schemas.GetEvents.response)['404']>;
export type GetEventsResponse500 = FromSchema<(typeof schemas.GetEvents.response)['500']>;
export type GetEventsResponse503 = FromSchema<(typeof schemas.GetEvents.response)['503']>;
export type GetJobsMetadataParam = FromSchema<typeof schemas.GetJobs.metadata>;
export type GetJobsResponse200 = FromSchema<(typeof schemas.GetJobs.response)['200']>;
export type GetJobsResponse400 = FromSchema<(typeof schemas.GetJobs.response)['400']>;
export type GetJobsResponse403 = FromSchema<(typeof schemas.GetJobs.response)['403']>;
export type GetJobsResponse404 = FromSchema<(typeof schemas.GetJobs.response)['404']>;
export type GetJobsResponse500 = FromSchema<(typeof schemas.GetJobs.response)['500']>;
export type GetUserJobsMetadataParam = FromSchema<typeof schemas.GetUserJobs.metadata>;
export type GetUserJobsResponse200 = FromSchema<(typeof schemas.GetUserJobs.response)['200']>;
export type GetUserJobsResponse400 = FromSchema<(typeof schemas.GetUserJobs.response)['400']>;
export type GetUserJobsResponse403 = FromSchema<(typeof schemas.GetUserJobs.response)['403']>;
export type GetUserJobsResponse404 = FromSchema<(typeof schemas.GetUserJobs.response)['404']>;
export type GetUserJobsResponse500 = FromSchema<(typeof schemas.GetUserJobs.response)['500']>;
export type GetUserMetadataParam = FromSchema<typeof schemas.GetUser.metadata>;
export type GetUserResponse200 = FromSchema<(typeof schemas.GetUser.response)['200']>;
export type GetUserResponse400 = FromSchema<(typeof schemas.GetUser.response)['400']>;
export type GetUserResponse401 = FromSchema<(typeof schemas.GetUser.response)['401']>;
export type GetUserResponse403 = FromSchema<(typeof schemas.GetUser.response)['403']>;
export type GetUserResponse404 = FromSchema<(typeof schemas.GetUser.response)['404']>;
export type GetUserResponse500 = FromSchema<(typeof schemas.GetUser.response)['500']>;
export type PostAuthLinkBodyParam = FromSchema<typeof schemas.PostAuthLink.body>;
export type PostAuthLinkMetadataParam = FromSchema<typeof schemas.PostAuthLink.metadata>;
export type PostAuthLinkResponse201 = FromSchema<(typeof schemas.PostAuthLink.response)['201']>;
export type PostAuthLinkResponse400 = FromSchema<(typeof schemas.PostAuthLink.response)['400']>;
export type PostAuthLinkResponse403 = FromSchema<(typeof schemas.PostAuthLink.response)['403']>;
export type PostAuthLinkResponse404 = FromSchema<(typeof schemas.PostAuthLink.response)['404']>;
export type PostAuthLinkResponse500 = FromSchema<(typeof schemas.PostAuthLink.response)['500']>;
export type PostJobMfaBodyParam = FromSchema<typeof schemas.PostJobMfa.body>;
export type PostJobMfaMetadataParam = FromSchema<typeof schemas.PostJobMfa.metadata>;
export type PostJobMfaResponse202 = FromSchema<(typeof schemas.PostJobMfa.response)['202']>;
export type PostJobMfaResponse400 = FromSchema<(typeof schemas.PostJobMfa.response)['400']>;
export type PostJobMfaResponse403 = FromSchema<(typeof schemas.PostJobMfa.response)['403']>;
export type PostJobMfaResponse404 = FromSchema<(typeof schemas.PostJobMfa.response)['404']>;
export type PostJobMfaResponse500 = FromSchema<(typeof schemas.PostJobMfa.response)['500']>;
export type PostTokenFormDataParam = FromSchema<typeof schemas.PostToken.formData>;
export type PostTokenMetadataParam = FromSchema<typeof schemas.PostToken.metadata>;
export type PostTokenResponse200 = FromSchema<(typeof schemas.PostToken.response)['200']>;
export type PostTokenResponse400 = FromSchema<(typeof schemas.PostToken.response)['400']>;
export type PostTokenResponse404 = FromSchema<(typeof schemas.PostToken.response)['404']>;
export type PostTokenResponse500 = FromSchema<(typeof schemas.PostToken.response)['500']>;
export type UpdateUserBodyParam = FromSchema<typeof schemas.UpdateUser.body>;
export type UpdateUserMetadataParam = FromSchema<typeof schemas.UpdateUser.metadata>;
export type UpdateUserResponse200 = FromSchema<(typeof schemas.UpdateUser.response)['200']>;
export type UpdateUserResponse400 = FromSchema<(typeof schemas.UpdateUser.response)['400']>;
export type UpdateUserResponse403 = FromSchema<(typeof schemas.UpdateUser.response)['403']>;
export type UpdateUserResponse404 = FromSchema<(typeof schemas.UpdateUser.response)['404']>;
export type UpdateUserResponse500 = FromSchema<(typeof schemas.UpdateUser.response)['500']>;
