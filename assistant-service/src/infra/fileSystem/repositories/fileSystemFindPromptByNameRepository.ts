import { FindPromptByNameRepository } from "@domain/index";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

export class FileSystemFindPromptByNameRepository implements FindPromptByNameRepository{
    
    async findByName(name: FindPromptByNameRepository.Name): Promise<FindPromptByNameRepository.Result> {
        const basePath = "../../ai/prompts";
        const filePath = path.join(__dirname, basePath, `${name}.md` );

        const existsFile = existsSync(filePath);

        if(!existsFile) return null;

        const prompt = await readFile(filePath, "utf-8");

        return {
            prompt
        };
    }

}