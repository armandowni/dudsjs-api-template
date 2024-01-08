import { Repository } from "typeorm";
import database from ".";
import { Test } from "./entities/test";
import { User } from "./entities/user";

export const TestRepository: Repository<Test> = database.getRepository(Test);
export const UserRepository: Repository<User> = database.getRepository(User);
