import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { TrackedEntity } from "../common/tracked";

@Entity("Test", { schema: "tinqapi" })
export class Test extends TrackedEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar")
  name: string;

  @Column("int", { nullable: false })
  age: number;
}
