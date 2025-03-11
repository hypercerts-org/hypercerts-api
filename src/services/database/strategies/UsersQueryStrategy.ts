import { Kysely } from "kysely";
import { DataDatabase } from "../../../types/kyselySupabaseData.js";
import { QueryStrategy } from "./QueryStrategy.js";

/**
 * Strategy for building queries related to user data.
 * Implements the QueryStrategy interface for the users table.
 *
 * This strategy extends the base QueryStrategy to provide user-specific query building.
 * It handles:
 * - Basic data retrieval from the users table
 * - Counting operations with appropriate joins
 *
 * @template DataDatabase - The database type containing the users table
 */
export class UsersQueryStrategy extends QueryStrategy<DataDatabase, "users"> {
  protected readonly tableName = "users" as const;

  /**
   * Builds a query to select all user data.
   * @param db - Database connection
   * @returns Query builder for selecting user data
   */
  buildDataQuery(db: Kysely<DataDatabase>) {
    return db.selectFrom(this.tableName).selectAll();
  }

  /**
   * Builds a query to count total number of users.
   * @param db - Database connection
   * @returns Query builder for counting users
   */
  buildCountQuery(db: Kysely<DataDatabase>) {
    return db.selectFrom(this.tableName).select((eb) => {
      return eb.fn.countAll().as("count");
    });
  }
}
