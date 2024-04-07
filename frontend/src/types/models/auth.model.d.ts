declare interface SignInModel {
  access: string;
  refresh: string;
  access_expires_at: string;
  refresh_expires_at: string;
  detail?: string;
}

declare interface SignUpModel {
  email: string;
}

declare interface RefreshTokenModel {
  access: string;
  expires_at: string;
  detail?: string;
}
