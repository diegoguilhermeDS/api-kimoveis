import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("addresses")
class Address {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 45})
    street: string

    @Column({length: 8})
    zipCode: string

    @Column({type: "varchar", length: 6, nullable: true})
    number: string | undefined | null

    @Column({length: 20})
    city: string

    @Column({length: 2})
    state: string
}

export { Address }