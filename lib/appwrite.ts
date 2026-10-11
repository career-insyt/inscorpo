import { Client, Account, Databases, OAuthProvider } from "appwrite";
import { APPWRITE_CONFIG } from "@/lib/config";

const endpoint = APPWRITE_CONFIG.endpoint || "https://sgp.cloud.appwrite.io/v1";
const projectId = APPWRITE_CONFIG.projectId || "6a55c66500032e142d85";

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases, OAuthProvider };
