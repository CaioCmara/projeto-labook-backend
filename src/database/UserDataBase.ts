import { BaseDatabase } from "./BaseDatabase";
import { UserDB } from "../types";
import { User } from "../models/User";

export class UserDataBase extends BaseDatabase {
  public static TABLE_USERS = "users";

  public async findUsers(q: string | undefined) {
    let usersDB;
    if (q) {
      const result: UserDB[] = await BaseDatabase.connection(
        UserDataBase.TABLE_USERS
      ).where("name", "LIKE", `%${q}`);
      usersDB = result;
    } else {
      const result: UserDB[] = await BaseDatabase.connection(
        UserDataBase.TABLE_USERS
      );

      usersDB = result;
    }
    return usersDB;
  }

  public async findUserById(id: string) {
    const [userDB]: UserDB[] | undefined[] = await BaseDatabase.connection(
      UserDataBase.TABLE_USERS
    ).where({ id });

    return userDB;
  }

  public async findUserByEmail (email: string){
    const [userDB]:UserDB[] | undefined = await BaseDatabase
    .connection(UserDataBase.TABLE_USERS)
    .select().where({email})

    return userDB
}
  public async insertUser(newUserDB: UserDB) {
    await BaseDatabase.connection(UserDataBase.TABLE_USERS).insert(newUserDB);
  }
}
