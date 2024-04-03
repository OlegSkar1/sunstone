declare interface SignInModel {
  access: string;
  refresh: string;
  detail?: string;
}

declare interface RefreshTokenModel {
  access: string;
  detail?: string;
}
