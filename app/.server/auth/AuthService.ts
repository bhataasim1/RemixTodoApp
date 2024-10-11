import { User } from "../../types/types";
import { BaseService } from "../todos/BaseService.server";
import { createUser, logout, readMe } from "@directus/sdk";


export class AuthService extends BaseService {
  private readonly userRole = process.env.USER_ROLE_ID!;
  constructor() {
    super();
    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.readMe = this.readMe.bind(this);
  }

  async registerUser(user: Omit<User, "id" | "role">) {
    return await this.directusClient.request(createUser({
      ...user,
      role: this.userRole
    }));
  }

  async loginUser(user: Pick<User, "email" | "password">) {
    return await this.directusClient.login(user.email, user.password);
  }

  async logoutUser(refresh_token: string) {
    return await this.directusClient.request(logout(refresh_token));
  }

  async readMe(access_token: string) {
    await this.directusClient.setToken(access_token);
    return await this.directusClient.request(readMe());
  }
}