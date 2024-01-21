import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { TrackedEntity } from "../common/tracked";

@Entity("users", { schema: "dudsapi" })
export class User extends TrackedEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("uuid", { generated: "uuid", unique: true, nullable: false })
  uuid: string;

  @Column("varchar", { unique: true, nullable: false })
  name: string;

  @Column("varchar", { unique: true, nullable: false })
  email: string;

  @Column("varchar", { unique: true, nullable: false })
  phone: string;

  @Column("varchar", { nullable: false, select: false })
  password: string;
}
