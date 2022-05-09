import { Injectable } from "@nestjs/common";
import nodemailer from 'nodemailer'

@Injectable()
export class EmailUtilService {
    private readonly nodeMail = nodemailer.createTransport({
        service: 'qq', //类型qq邮箱
        port: 465,//上文获取的port
        secure: true,//上文获取的secure
        auth: {
            user: '1295786542@qq.com', // 发送方的邮箱，可以选择你自己的qq邮箱
            pass: 'xoilbezkqandhhga' // 上文获取的stmp授权码
        }
    });
    public sendEmail(to: string, subject: string, html: string) {
        return new Promise((resolve, rejects) => {
            this.nodeMail.sendMail({
                from: "1295786542@qq.com",
                to,
                subject,
                html
            }, (err, result) => {
                if (err) return rejects(err);
                resolve(result)
            })
        })
    }
}