import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer'

@Injectable()
export class EmailUtilService {
    private readonly nodeMail = nodemailer.createTransport({
        service: 'qq', //类型qq邮箱
        port: 465,//上文获取的port
        secure: true,//上文获取的secure
        auth: {
            user: process.env.email, // 发送方的邮箱，可以选择你自己的qq邮箱
            pass: process.env.pass // 上文获取的stmp授权码
        }
    });
    public sendEmail(to: string, subject: string, html: string) {
        return new Promise((resolve, rejects) => {
            this.nodeMail.sendMail({
                from: process.env.email,
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