declare interface UserMaterial {
  id: number;
  title: string;
  author: number;
  section: number;
  created_at: string;
  updated_at: string;
}

declare interface MyProfileModel {
  user: number;
  name: string;
  last_name: string;
  user_email: string;
  avatar_display: string;
  avatar_preview: string;
  user_materials: Array<UserMaterial>;
}
