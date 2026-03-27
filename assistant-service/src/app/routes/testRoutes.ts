import { FileSystemFindPromptByNameRepository } from "@db/fileSystem/repositories/fileSystemFindPromptByNameRepository";
import { Router } from "express";

const router = Router();

router
    .get("/how", (req, res) => res.status(200).send({ message: "Hellow World" }) )
    .get("/test/:name", async (req, res) => {
        const { name } = req.params;

        const findPrompt = new FileSystemFindPromptByNameRepository();

        const findedPrompt = await findPrompt.findByName(name);

        res.status(200).send(findedPrompt);
    
    });

export default router;