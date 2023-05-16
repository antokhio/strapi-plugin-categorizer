"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: "admin",
    routes: [
        {
            method: "POST",
            path: "/",
            handler: "categorizer.find",
        },
    ],
};
