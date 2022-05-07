import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";


@Entity("account")
export class Account {
    @PrimaryColumn()
    uid: string

    @Column({
        comment: "用户名"
    })
    user_name: string

    @Column({
        comment: "邮箱"
    })
    user_email: string

    @Column({
        comment: "密码"
    })
    user_password: string

    @Column({
        comment: "权限等级 0普通 1管理 2admin",
        default: 0
    })
    user_rule: number

    @CreateDateColumn({
        type: "timestamp"
    })
    create_time: Date
}