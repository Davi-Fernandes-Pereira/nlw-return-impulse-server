import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubimitFeedbackUseCaseRequest {
    type: string,
    comment: string,
    screenshot?: string
}

export class SubimitFeedbackUseCase {

    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) { }

    async execute(request: SubimitFeedbackUseCaseRequest) {

        const { type, comment, screenshot } = request;

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }

        if (!type) {
            throw new Error('type is required.')
        }

        if (!comment) {
            throw new Error('comment is required.')
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: "Novo feedback",
            body: [
                `<p>Tipo: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}"/>` : null
            ].join('\n')
        })


    }
}