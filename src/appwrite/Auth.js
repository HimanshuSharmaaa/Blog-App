import { Account, Client, ID } from "appwrite";
import conf from "../Conf/Conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject('66c5a2a1001100a537cc');
    // .setEndpoint(projectURL)
    // .setProject(projectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, name, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("AppWrite Error :: logout", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("AppWrite Error :: getCurrentUser", error);
    }
    return null;
  }
}

const authService = new AuthService();
export default authService;