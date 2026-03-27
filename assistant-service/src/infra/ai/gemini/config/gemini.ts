import { GoogleGenAI } from "@google/genai";

export class GeminiConnector {
    public static instance: GeminiConnector;
    private agent: GoogleGenAI;

    public static getInstance(){
        if(!this.instance){
            this.instance = new GeminiConnector();
        }
        return this.instance;
    }

    public getAgent(){
        if(!this.agent){
            this.agent = new GoogleGenAI({});
        }
        return this.agent;
    }
 
}