import { prisma } from './prisma';
import nodemailer from 'nodemailer';
import express from 'express';

export const routes = express.Router();
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "d9317783cf2dc2",
        pass: "e3dc5e763a5e43"
    }
});
routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;
    const feedback = await prisma.feedback.create({
        data: {
            type: type,
            comment: comment,
            screenshot: screenshot,
        }
    });
    await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Luis Antonio <luisopentec@gmail.com>',
        subject: 'Novo feedback',
        html: [
            `<div style:"font-family:sans-serif; font-size:16px; color: #111;">`,
            `<p>Tipo de feedback:${type}</p>`,
            `<p>Comentário:${comment}</p>`,
            `</div>`
        ].join('\n')
    });
    return res.status(201).json(feedback);
})
