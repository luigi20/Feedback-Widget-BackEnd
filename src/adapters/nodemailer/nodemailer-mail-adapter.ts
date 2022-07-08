import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "d9317783cf2dc2",
        pass: "e3dc5e763a5e43"
    }
});
export class NodemailerMailAdapter implements MailAdapter {

    async sendMail({ subject, body }: SendMailData): Promise<void> {

        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Luis Antonio <luisopentec@gmail.com>',
            subject: subject,
            html: body
        });
    }
}