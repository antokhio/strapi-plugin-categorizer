"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = __importDefault(require("./register"));
const bootstrap_1 = __importDefault(require("./bootstrap"));
const destroy_1 = __importDefault(require("./destroy"));
const config_1 = __importDefault(require("./config"));
const controllers_1 = __importDefault(require("./controllers"));
const routes_1 = __importDefault(require("./routes"));
exports.default = {
    register: register_1.default,
    bootstrap: bootstrap_1.default,
    destroy: destroy_1.default,
    config: config_1.default,
    controllers: controllers_1.default,
    routes: routes_1.default,
};
