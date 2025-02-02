"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const output_parsers_1 = require("@langchain/core/output_parsers");
const prompts_1 = require("@langchain/core/prompts");
const runnables_1 = require("@langchain/core/runnables");
const ollama_1 = require("@langchain/ollama");
const fs = __importStar(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const zod_1 = require("zod");
class OllamaLLaVaImageToEmotionGenerator {
    relate(imageToEmotion) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('ollama relator');
            const imageData = yield this.readFileAsBase64(node_path_1.default.resolve('image-uploads', imageToEmotion.getFilename()));
            const fromZodParser = output_parsers_1.StructuredOutputParser.fromZodSchema(zod_1.z.object({
                emotion: zod_1.z.string().describe('Emotion name')
            }));
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
            const llava = new ollama_1.Ollama({
                model: 'llava:7b',
                temperature: 0
            }).bind({
                images: [imageData]
            });
            const chain = runnables_1.RunnableSequence.from([
                prompts_1.PromptTemplate.fromTemplate(`
        {base_prompt}
        {format_instructions}
      `),
                llava,
                fromZodParser
            ]);
            return yield chain.invoke({
                base_prompt: prompt,
                format_instructions: fromZodParser.getFormatInstructions()
            });
        });
    }
    readFileAsBase64(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const chunks = [];
                const stream = fs.createReadStream(filePath);
                stream.on('data', (chunk) => {
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
        });
    }
}
exports.default = OllamaLLaVaImageToEmotionGenerator;
