"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = __importDefault(require("./category"));
const categorizer_1 = __importDefault(require("./categorizer"));
exports.default = {
    category: category_1.default,
    categorizer: categorizer_1.default,
};
// export default [
//   {
//     method: "GET",
//     path: "/",
//     handler: "myController.index",
//     config: {
//       policies: [],
//     },
//   },
// ];
