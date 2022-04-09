import User, { UserSchema } from "./Users";

export enum Premission {
  CREATE_USER = 1 << 0,
  DELETE_USER = 1 << 1,
  UPDATE_USER = 1 << 2,

  CREATE_CATEGORY = 1 << 3,
  DELETE_CATEGORY = 1 << 4,
  UPDATE_CATEGORY = 1 << 5,

  CREATE_PRODUCT = 1 << 6,
  UPDATE_PRODUCT = 1 << 7,
  DELETE_PRODUCT = 1 << 8,

  NORMAL_USER = 0,
  ADMIN = CREATE_USER |
    DELETE_USER |
    UPDATE_USER |
    CREATE_CATEGORY |
    DELETE_CATEGORY |
    UPDATE_CATEGORY |
    CREATE_PRODUCT |
    DELETE_PRODUCT |
    UPDATE_PRODUCT,
}

export function hasPremission(userPrem: Premission, prem: Premission): boolean {
  return (userPrem & prem) === prem;
}

export function addPremission(user: UserSchema, prem: Premission) {
  user.premissions |= prem;
}

export function remove(user: UserSchema, prem: Premission) {
  user.premissions ^= prem;
}
