"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const my_service_1 = __importDefault(require("./my-service"));
const category_1 = __importDefault(require("./category"));
exports.default = {
    category: category_1.default,
    myService: my_service_1.default,
};
