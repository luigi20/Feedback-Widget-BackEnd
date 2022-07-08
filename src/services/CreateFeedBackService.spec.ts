import { CreateFeedbackService } from "./CreateFeedbackService";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe('Create feedback', () => {
    it('should be able to submit Feedback', async () => {
        const submitFeedback = new CreateFeedbackService(
            { create: createFeedbackSpy },
            { sendMail: sendMailSpy }
        );
        await expect(submitFeedback.execute({
            type: 'bug',
            comment: 'example comment',
            screenshot: 'data:image/png;base64, test.jpg'
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })
});