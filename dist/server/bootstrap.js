"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => {
    // bootstrap phase
    Object.entries(strapi.contentTypes).forEach(([key, value]) => {
        const { attributes } = value;
        if (typeof attributes === "object") {
            Object.entries(attributes).forEach(([attribute, options]) => {
                const { customField } = options;
                if (customField === "plugin::categorizer.categorizer") {
                    console.log(attribute, options);
                }
            });
        }
    });
};
