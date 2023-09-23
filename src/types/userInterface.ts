export interface User {
  id: string;
  email?: string | null;
  password?: string;
  name: string;
  bio: string;
  phone: string;
  image: string;
  confirmed: boolean;
  confirmationToken?: string | null;
  resetToken?: string | null;
  resetTokenExpiration?: number | null;
  googleId?: string | null;
  facebookId?: string | null;
  githubId?: string | null;
}

export interface UpdateUser {
  name: string;
  bio: string;
  phone: string;
  image: Blob | string;
}
