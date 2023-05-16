"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = __importDefault(require("../package.json"));
exports.default = ({ strapi }) => {
    strapi.customFields.register({
        name: package_json_1.default.strapi.name,
        plugin: package_json_1.default.strapi.name,
        type: "json",
    });
};
