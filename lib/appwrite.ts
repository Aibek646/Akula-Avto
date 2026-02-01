import "server-only";
import { Client, Account } from "appwrite";
import { APP_CONFIG } from "@/lib/app-config";

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(APP_CONFIG.APPWRITE.ENDPOINT)
    .setProject(APP_CONFIG.APPWRITE.PROJECT_ID);
}
