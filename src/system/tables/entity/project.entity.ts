import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./account.entity";



export type projectStatus = "ready" | "running" | "error" | "success";
@Entity("project")
export class Project {
    @PrimaryGeneratedColumn()
    gid: number

    @ManyToOne(() => Account, type => type.groups)
    account: Account

    @Column({
        comment: "Date格式"
    })
    format: string

    @Column({
        comment: "状态",
        default: "ready"
    })
    status: projectStatus

    @Column({
        comment: "添加天数"
    })
    day: string

    @CreateDateColumn({
        type: "timestamp"
    })
    create_time: Date
}