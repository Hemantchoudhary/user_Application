"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const userService_1 = require("../services/userService");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const existingUser = yield (0, userService_1.findUserByEmail)(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const user = yield (0, userService_1.registerUser)(name, email, password);
        res.status(201).json({ id: user.id, name: user.name, email: user.email });
    }
    catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
});
exports.register = register;
