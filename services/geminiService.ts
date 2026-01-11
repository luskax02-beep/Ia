import { GoogleGenAI } from "@google/genai";
import { ToneType } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateNudgeMessage = async (
  clientName: string,
  amount: string,
  daysOverdue: string,
  tone: ToneType
): Promise<string> => {
  try {
    const prompt = `
      You are an AI assistant for a SaaS called "SwiftCollect". 
      Your goal is to write a payment reminder message (a "nudge").
      
      Details:
      - Client Name: ${clientName}
      - Amount Due: ${amount}
      - Days Overdue: ${daysOverdue}
      - Tone: ${tone}

      Guidelines:
      - If the tone is 'Friendly', be casual, warm, and understanding.
      - If the tone is 'Professional', be polite, formal, and objective.
      - If the tone is 'Direct', be firm but respectful, emphasizing the urgency.
      - Keep it short (suitable for WhatsApp or SMS).
      - Do not include subject lines, just the message body.
      - Language: Portuguese (Brazil).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Não foi possível gerar a mensagem. Tente novamente.";
  } catch (error) {
    console.error("Error generating nudge:", error);
    return "Erro ao conectar com a IA. Verifique sua chave de API.";
  }
};