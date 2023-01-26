"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => {
    strapi.customFields.register({
        name: 'categorizer',
        plugin: 'categorizer',
        type: 'json',
    });
};
