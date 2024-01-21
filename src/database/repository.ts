import { Repository } from "typeorm";
import { Test } from "./entities/test";
import { User } from "./entities/user";
import { datasource } from "./datasource";

export const TestRepository: Repository<Test> = datasource.getRepository(Test);
export const UserRepository: Repository<User> = datasource.getRepository(User);
