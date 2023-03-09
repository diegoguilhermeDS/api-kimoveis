import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RealEstate } from "./realEstate.entity";

@Entity("categories")
class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 45, unique: true})
    name: string

    @OneToMany(() => RealEstate, real_estate => real_estate.category)
    realEstate: RealEstate[]
}

export { Category }