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
exports.payCrypto = void 0;
const payWithCrypto_1 = require("../controllers/payWithCrypto");
const payCrypto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, descripcion, user_email, user_name } = req.body;
    try {
        const response = yield (0, payWithCrypto_1.payWithCrypto)(nombre, descripcion, user_email, user_name);
        res.status(200).send(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
exports.payCrypto = payCrypto;
