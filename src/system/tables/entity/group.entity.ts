import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./account.entity";

@Entity("data_group")
export class Group {
    @PrimaryGeneratedColumn()
    gid: number

    @ManyToOne(() => Account, type => type.groups)
    account: Account

    @Column({
        comment: "组名称",
    })
    name: string

    @Column({
        comment: "Date格式"
    })
    format: string

    @Column({
        comment: "组介绍"
    })
    info: string

    @CreateDateColumn({
        type: "timestamp"
    })
    create_time: Date
}