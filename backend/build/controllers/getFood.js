"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getFood = void 0;
const foodServices = __importStar(require("../services/foodServices"));
const getFood = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let finalResponse = yield foodServices.getEntriesWithoutSensitiveInfo();
        // finalResponse = finalResponse.filter(food => food.activo === true);
        // finalResponse = finalResponse.filter(food => food.inventario > 0);
        finalResponse = finalResponse.sort((a, b) => {
            // Convertir los nombres a minúsculas para un ordenamiento sin distinción de mayúsculas/minúsculas
            const nombreA = a.nombre.toLowerCase();
            const nombreB = b.nombre.toLowerCase();
            // Comparar los nombres y devolver el resultado de la comparación
            if (nombreA < nombreB)
                return -1;
            if (nombreA > nombreB)
                return 1;
            return 0;
        });
        return res.send(finalResponse);
    }
    catch (error) {
        return res.status(500).json({ error: 'Error searching for Foods.' });
    }
});
exports.getFood = getFood;
