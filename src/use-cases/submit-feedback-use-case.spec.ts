import { SubimitFeedbackUseCase } from "./submit-feedback-use-case"

const creteFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

describe('Submit feedback', () => {

    it('should be able to submit a feedback', async () => {
        const submitFeedback = new SubimitFeedbackUseCase(
            { create: creteFeedbackSpy },
            { sendMail: sendMailSpy }
        )

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'commnet',
            screenshot: "data:image/png;base64tests"
        })).resolves.not.toThrow();


        expect(creteFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()

    })

})