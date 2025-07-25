import { http, Result } from "@fider/services/http"
import { UserRole, OAuthConfig, ImageUpload, EmailVerificationKind } from "@fider/models"
import { PrivacySettingsPageState } from "@fider/pages/Administration/pages/PrivacySettings.page"

export interface CheckAvailabilityResponse {
  message: string
}

export interface CreateTenantRequest {
  legalAgreement: boolean
  tenantName: string
  subdomain?: string
  name?: string
  token?: string
  email?: string
}

export interface CreateTenantResponse {
  token?: string
}

export const createTenant = async (request: CreateTenantRequest): Promise<Result<CreateTenantResponse>> => {
  return await http.post<CreateTenantResponse>("/_api/tenants", request)
}

export interface UpdateTenantSettingsRequest {
  logo?: ImageUpload
  title: string
  invitation: string
  welcomeMessage: string
  cname: string
  locale: string
}

export const updateTenantSettings = async (request: UpdateTenantSettingsRequest): Promise<Result> => {
  return await http.post("/_api/admin/settings/general", request)
}

export const updateTenantAdvancedSettings = async (customCSS: string, allowedSchemes: string): Promise<Result> => {
  return await http.post("/_api/admin/settings/advanced", { customCSS, allowedSchemes })
}

export const updateTenantPrivacy = async (request: PrivacySettingsPageState): Promise<Result> => {
  return await http.post("/_api/admin/settings/privacy", request)
}

export const updateTenantEmailAuthAllowed = async (isEmailAuthAllowed: boolean): Promise<Result> => {
  return await http.post("/_api/admin/settings/emailauth", {
    isEmailAuthAllowed,
  })
}

export const checkAvailability = async (subdomain: string): Promise<Result<CheckAvailabilityResponse>> => {
  return await http.get<CheckAvailabilityResponse>(`/_api/tenants/${subdomain}/availability`)
}

export const signIn = async (email: string, code?: string): Promise<Result> => {
  return await http.post("/_api/signin", {
    email,
    code,
  })
}

export const completeProfile = async (kind: EmailVerificationKind, key: string, name: string): Promise<Result> => {
  return await http.post("/_api/signin/complete", {
    kind,
    key,
    name,
  })
}

export const changeUserRole = async (userID: number, role: UserRole): Promise<Result> => {
  return await http.post(`/_api/admin/roles/${role}/users`, {
    userID,
  })
}

export const blockUser = async (userID: number): Promise<Result> => {
  return await http.put(`/_api/admin/users/${userID}/block`)
}

export const unblockUser = async (userID: number): Promise<Result> => {
  return await http.delete(`/_api/admin/users/${userID}/block`)
}

export const getOAuthConfig = async (provider: string): Promise<Result<OAuthConfig>> => {
  return await http.get<OAuthConfig>(`/_api/admin/oauth/${provider}`)
}

export interface CreateEditOAuthConfigRequest {
  provider: string
  status: number
  displayName: string
  clientID: string
  clientSecret: string
  authorizeURL: string
  tokenURL: string
  scope: string
  profileURL: string
  jsonUserIDPath: string
  jsonUserNamePath: string
  jsonUserEmailPath: string
  logo?: ImageUpload
  isTrusted: boolean
}

export const saveOAuthConfig = async (request: CreateEditOAuthConfigRequest): Promise<Result> => {
  return await http.post("/_api/admin/oauth", request)
}
