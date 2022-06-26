import { User } from "@models/user.model";

export interface LoginResponse  {
  access_token: string;
  user: User;
}

export interface IsAvailableResponse  {
  isAvailable: boolean;
}
