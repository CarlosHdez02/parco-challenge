"use strict";
/*  eslint-disable  */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3000; //|| process.env.PORT;
app.get('/ping', (req, res) => {
    res.send('pong');
});
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
