import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { Ollama } from '@langchain/ollama';
import * as fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';

import ImageToEmotion from '../domain/ImageToEmotion';
import ImageToEmotionRelator, { GeneratorResult } from '../domain/ImageToEmotionRelator';

export default class OllamaLLaVaImageToEmotionGenerator implements ImageToEmotionRelator {
	async relate(imageToEmotion: ImageToEmotion): Promise<GeneratorResult> {
		console.log('ollama relator');
		const imageData = await this.readFileAsBase64(
			path.resolve('image-uploads', imageToEmotion.getFilename())
		);
		const fromZodParser = StructuredOutputParser.fromZodSchema(
			z.object({
				emotion: z.string().describe('Emotion name')
			})
		);
		const prompt = `
        Given an image give the the most related emotion to it. 
        IMPORTANT only give me the emotions name NO MORE.
        Example: Given an image that shows an angry person return anger
        Example: Given an image that shows a group of ecstatic people that seem to be dancing and jumpip return euphoria
        IMPORTANT for every image you should return one emotion. The one that correlates most to it.
        IMPORTANT reason every decision yo take. 
        IMPORTANT before giving the emotion reason about it.
        An ITERATION UNIT should be given the image: Reasoning for the most correlated emotion + emotion itself
        IMPORTANT before giving any kind of response repeat trhee times the ITERATION UNIT so that that emotion is the one that fits the most
        IMPORTANT only give me the emotions name NO MORE.
        Given this image give the the most related emotion to it.
      `;

		const llava = new Ollama({
			model: 'llava:7b',
			temperature: 0
		}).bind({
			images: [imageData]
		});

		const chain = RunnableSequence.from([
			PromptTemplate.fromTemplate(
				`
        {base_prompt}
        {format_instructions}
      `
			),
			llava,
			fromZodParser
		]);

		return await chain.invoke({
			base_prompt: prompt,
			format_instructions: fromZodParser.getFormatInstructions()
		});
	}

	private async readFileAsBase64(filePath: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const chunks: Buffer[] = [];
			const stream = fs.createReadStream(filePath);

			stream.on('data', (chunk: Buffer) => {
				chunks.push(chunk);
			});

			stream.on('end', () => {
				const buffer = Buffer.concat(chunks);
				resolve(buffer.toString('base64'));
			});

			stream.on('error', err => {
				reject(err);
			});
		});
	}
}
