import { Insertable, Selectable, Updateable } from "kysely";
import { inject, injectable } from "tsyringe";
import { DataKyselyService, kyselyData } from "../../../client/kysely.js";
import type { GetUsersArgs } from "../../../graphql/schemas/args/userArgs.js";
import type { DataDatabase } from "../../../types/kyselySupabaseData.js";
import type { EntityService } from "./EntityServiceFactory.js";
import { createEntityService } from "./EntityServiceFactory.js";

export type UserSelect = Selectable<DataDatabase["users"]>;
export type UserInsert = Insertable<DataDatabase["users"]>;
export type UserUpdate = Updateable<DataDatabase["users"]>;

@injectable()
export class UsersService {
  private entityService: EntityService<DataDatabase["users"], GetUsersArgs>;

  constructor(@inject(DataKyselyService) private dbService: DataKyselyService) {
    this.entityService = createEntityService<
      DataDatabase,
      "users",
      GetUsersArgs
    >("users", "UsersEntityService", kyselyData);
  }

  async getUsers(args: GetUsersArgs) {
    return this.entityService.getMany(args).then((res) => ({
      ...res,
      data: res.data.map((user) => ({
        ...user,
        // TODO: Investigate why chain_id is returned as a string
        chain_id: Number(user.chain_id),
      })),
    }));
  }

  async getUser(args: GetUsersArgs) {
    return this.entityService.getSingle(args);
  }

  // Mutations
  async getOrCreateUser(user: UserInsert) {
    const _user = await this.getUser({
      where: {
        address: { eq: user.address },
        chain_id: { eq: user.chain_id },
      },
    });

    if (!_user) {
      const [createdUser] = await this.upsertUsers([user]);

      return createdUser;
    }

    return _user;
  }

  async upsertUsers(users: UserInsert[]) {
    return this.dbService
      .getConnection()
      .insertInto("users")
      .values(users)
      .onConflict((oc) =>
        oc.constraint("users_address_chain_id").doUpdateSet((eb) => ({
          avatar: eb.ref("excluded.avatar"),
          display_name: eb.ref("excluded.display_name"),
        })),
      )
      .returningAll()
      .execute();
  }
}
