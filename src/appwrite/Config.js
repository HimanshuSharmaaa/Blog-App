import conf from "../Conf/Conf";
import { ID, Databases, Storage, Query, Client } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      // .setEndpoint(conf.appwriteUrl)
      // .setProject(conf.appwriteProjectId);
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('66c5a2a1001100a537cc');
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, status, userId, slug, content, featuredImage }) {
    try {
      return await this.databases.createDocument(
        // conf.appwriteDatabaseId,
        // conf.appwriteCollectionId,
        '66c5a379002f9f027f8c',
        '66c5a3b1000adf0aa964',
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, status, content, featuredImage , userId }) {
    try {
      return await this.databases.updateDocument(
        // conf.appwriteDatabaseId,
        // conf.appwriteCollectionId,
        '66c5a379002f9f027f8c',
        '66c5a3b1000adf0aa964',
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        // conf.appwriteDatabaseId,
        // conf.appwriteCollectionId,
        '66c5a379002f9f027f8c',
        '66c5a3b1000adf0aa964',
        slug
      );
      return true;
    } catch (error) {
      console.log("AppWrite services :: deletePost :: error ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        // conf.appwriteDatabaseId,
        // conf.appwriteCollectionId,
        '66c5a379002f9f027f8c',
        '66c5a3b1000adf0aa964',
        slug
      );
    } catch (error) {
      console.log("AppWrite services :: getPost :: error ", error);
      return false;
    }
  }

  async getAllPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        '66c5a379002f9f027f8c',
        '66c5a3b1000adf0aa964',
        queries
      );
    } catch (error) {
      console.log("AppWrite services :: getAllPost :: error ", error);
      return false;
    }
  }

  //file upload service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
      //  conf.appwriteBucketId,
      '66c5a5f9001086d6f3e3',
      ID.unique(),
      file
      );
    } catch (error) {
      console.log("AppWrite services :: uploadFile :: error ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        // conf.appwriteBucketId,
        '66c5a5f9001086d6f3e3',
        fileId);
      return true;
    } catch (error) {
      console.log("AppWrite services :: deletePost :: error ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(
        // conf.appwriteBucketId,
        '66c5a5f9001086d6f3e3',
        fileId);
    } catch (error) {
      throw error;
    }
  }
}

const service = new Service();
export default service;