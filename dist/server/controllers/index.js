"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categorizer_1 = __importDefault(require("./categorizer"));
const category_1 = __importDefault(require("./category"));
exports.default = {
    category: category_1.default,
    categorizer: categorizer_1.default,
};
