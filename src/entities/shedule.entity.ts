import { Entity, PrimaryGeneratedColumn, Column, Timestamp, ManyToOne, JoinColumn } from "typeorm";
import { RealEstate } from "./realEstate.entity";
import { User } from "./user.entity";

@Entity("shedules_users_properties")
class Schedule {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "date"})
    date: Date | string

    @Column({type: "time"})
    hour: Date | string

    @ManyToOne(() => RealEstate, (real_estate) => real_estate.schedules)
    realEstate: RealEstate

    @ManyToOne(() => User)
    user: User
}

export { Schedule }