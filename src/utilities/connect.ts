import { Pool } from "pg";
import { currentUser } from "@clerk/nextjs/server";

let db: Pool | null = null;

export const getDB = () => {
  if (!db) {
    db = new Pool({
      connectionString: process.env.DB_URL,
    });
  }
  return db;
};

// Helper function to get current user ID
export const getCurrentUserId = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("Not authenticated");
    }
    return user.id;
  } catch (error) {
    console.error("Error getting userId:", error);
    throw error;
  }
};

// Database query wrapper with user ID
export const queryWithUser = async (
  query: string,
  params: unknown[] = [],
  requireAuth: boolean = true
) => {
  const client = getDB();

  try {
    if (requireAuth) {
      const userId = await getCurrentUserId();
      params = [...params, userId];
    }

    console.log("Executing query:", query, "params:", params);
    const result = await client.query(query, params);
    return result.rows;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};
