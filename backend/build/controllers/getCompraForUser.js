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
exports.getCompraByUserId = void 0;
const Compra_1 = require("../models/Compra");
const getCompraByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuarioId } = req.params;
        if (!usuarioId) {
            return res.status(400).send({ error: "Falta el ID del usuario" });
        }
        const purchases = yield Compra_1.Compra.findAll({ where: { usuarioId } });
        if (!purchases || purchases.length === 0) {
            return res.status(404).send({ message: "No se encontraron compras para el usuario con el ID proporcionado" });
        }
        return res.status(200).send(purchases);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Error al procesar la solicitud", detalle: error });
    }
});
exports.getCompraByUserId = getCompraByUserId;