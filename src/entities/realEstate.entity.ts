import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Address } from "./address.entity";
import { Category } from "./category.entity";
import { Schedule } from "./shedule.entity";

@Entity("real_estate")
class RealEstate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "boolean", default: false, nullable: true })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  values: number | string;

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn()
  createdAt: Date | string;

  @UpdateDateColumn()
  updatedAt: Date | string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Category, (categories) => categories.realEstates)
  category: Category;

  @OneToMany(() => Schedule, (shedules_users_properties) => shedules_users_properties.realEstate)
  schedules: Schedule[]

}

export { RealEstate };
