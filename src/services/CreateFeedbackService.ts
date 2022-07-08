import { PrismaFeedbacksRepository } from "../repositories/prisma/prisma-feedbacks-repositories";
import { FeedbacksRepository } from "../repositories/feedbacks-repositories";
import { MailAdapter } from "../adapters/mail-adapter";

interface CreateFeedbackDTO {
    type: string;
    comment: string;
    screenshot?: string;
}
export class CreateFeedbackService {
    constructor(
        private feedBackRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) { }
    async execute(request: CreateFeedbackDTO) {
        const { type, comment, screenshot } = request;
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.');
        }
        this.feedBackRepository.create({
            type,
            comment,
            screenshot
        })
        this.mailAdapter.sendMail({
            subject: 'Create Feedback',
            body: [
                `<div style:"font-family:sans-serif; font-size:16px; color: #111;">`,
                `<p>Tipo de feedback:${type}</p>`,
                `<p>Comentário:${comment}</p>`,
                `</div>`
            ].join('\n')
        })
    }
}