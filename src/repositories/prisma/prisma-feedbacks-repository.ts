import { prisma } from "../../prisma";
import { FeedbackcreateData, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
    async create({ type, comment, screenshot }: FeedbackcreateData) {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot

            }
        })


    }
}