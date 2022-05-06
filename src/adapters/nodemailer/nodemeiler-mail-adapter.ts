import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapter";


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "d91684f75f3038",
        pass: "d674e344d2d6ef"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ body, subject }: SendMailData) {

        await transport.sendMail({
            from: 'Equipe feedget <asda@feedget.com',
            to: 'Davi Fernandes <davifernandes507@gmail.com>',
            subject,
            html: body
        }
        )

    };
}