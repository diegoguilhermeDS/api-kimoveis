import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from "typeorm";

@Entity("shedules_users_properties")
class Schedule {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "date"})
    date: Date | string

    @Column({type: "datetime"})
    hour: Timestamp | string
}

export { Schedule }