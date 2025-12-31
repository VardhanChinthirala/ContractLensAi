
import { GoogleGenAI, Type } from "@google/genai";
import { ContractAuditResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeContract = async (
  text: string, 
  plan: 'Starter' | 'Pro' | 'Business' = 'Starter',
  focusAreas?: string
): Promise<ContractAuditResult> => {
  try {
    const isPremium = plan !== 'Starter';
    const isBusiness = plan === 'Business';

    const systemPrompt = `You are a world-class legal auditor specialized in protecting freelancers and small businesses. 
      Your task is to audit the provided contract text for predatory clauses, hidden traps, and unfavorable terms.
      
      Plan Level: ${plan}
      ${isBusiness && focusAreas ? `SPECIFIC BUSINESS FOCUS: ${focusAreas}` : ''}
      
      Instructions:
      1. Calculate a Health Score (0-100).
      2. Categorize risks into: 'Payment Terms', 'Termination Clauses', 'Confidentiality', 'Intellectual Property', 'Liability', 'Governing Law', or 'Other'.
      3. ${isPremium ? 'Provide deep reasoning and specific legal counter-arguments.' : 'Provide high-level risk identification.'}
      4. Generate a professional negotiation email script.
    `;

    const response = await ai.models.generateContent({
      model: isPremium ? "gemini-3-pro-preview" : "gemini-3-flash-preview",
      contents: `Audit this contract: \n\n ${text}`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            healthScore: {
              type: Type.INTEGER,
              description: "A score from 0 to 100 where 100 is extremely safe and 0 is predatory."
            },
            verdict: {
              type: Type.STRING,
              description: "A one-word verdict based on score: 'Safe', 'Caution', or 'Danger'."
            },
            summary: {
              type: Type.STRING,
              description: "A comprehensive summary of the risk profile."
            },
            redFlags: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  risk: { type: Type.STRING },
                  category: { 
                    type: Type.STRING, 
                    description: "Category of the risk."
                  },
                  severity: { type: Type.STRING, description: "High, Medium, or Low" },
                  explanation: { type: Type.STRING, description: "Why this is a risk." },
                  alternative: { type: Type.STRING, description: "A safer version of the clause." }
                },
                required: ["risk", "category", "severity", "explanation", "alternative"]
              }
            },
            negotiationEmail: {
              type: Type.STRING,
              description: "A professional email script to negotiate these terms."
            }
          },
          required: ["healthScore", "verdict", "summary", "redFlags", "negotiationEmail"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result as ContractAuditResult;
  } catch (error) {
    console.error("Gemini Audit Error:", error);
    throw new Error("Failed to analyze the contract. Please ensure you provided valid text.");
  }
};
