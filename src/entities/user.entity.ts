import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity("users")
class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 45})
    name: string
    
    @Column({length: 45, unique: true})
    email: string

    @Column({type: "boolean", default: false})
    admin: boolean

    @Column({length: 120})
    password: string

    @CreateDateColumn()
    createdAt: Date | string

    @UpdateDateColumn()
    updatedAt: Date | string 

    @DeleteDateColumn()
    deletedAt: Date | string
}

export { User }