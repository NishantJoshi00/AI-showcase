import fs from 'fs'
import path from 'path'
import readline from "readline";

async function fileToObject(file) {
    const rl = readline.createInterface({
        input: file
    });
    const lines = [];
    for await (const l of rl) {
        if (l.startsWith("Human:")) {
            lines.push({
                by: "Human",
                text: l.slice(6)
            })
        } else if (l.startsWith("AI:")) {
            lines.push({
                by: "Ai",
                text: l.slice(3)
            })
        }
        // lines.push(l);
    }
    return lines
}

export default async (req, res) => {
    const { chatId } = req.query;
    const dir = path.resolve("./public/", "chats");
    const filename = path.join(dir, `${chatId}.txt`);
    if (fs.existsSync(filename)) {
        res.statusCode = 200
        const file = fs.createReadStream(filename);
        res.json(await fileToObject(file));
    }

}