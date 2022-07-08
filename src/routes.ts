import { prisma } from './prisma';
import nodemailer from 'nodemailer';
import express from 'express';
import { CreateFeedbackService } from './services/CreateFeedbackService';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repositories';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

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
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerAdapter = new NodemailerMailAdapter();
    const submitFeedback = new CreateFeedbackService(prismaFeedbacksRepository, nodemailerAdapter);
    await submitFeedback.execute({ type, comment, screenshot });
    /*await transport.sendMail({
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
    return res.status(201).json(feedback);*/
})
