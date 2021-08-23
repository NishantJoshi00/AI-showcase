import fs from 'fs'
import path from 'path'

export default (req, res) => {
    res.statusCode = 200;
    res.json(fs.readdirSync(path.resolve("./public/", "chats")));
}