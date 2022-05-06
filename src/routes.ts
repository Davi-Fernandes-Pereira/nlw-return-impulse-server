import express from 'express'
import nodemailer from 'nodemailer'
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemeiler-mail-adapter';
import { prisma } from './prisma';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubimitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router()



routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const subimitFeedbackUsecase = new SubimitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemailerMailAdapter
    )

    await subimitFeedbackUsecase.execute({
        type,
        comment,
        screenshot
    })


    return res.status(201).send();
});