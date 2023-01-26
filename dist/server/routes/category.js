"use strict";
/**
 *  router
 */
Object.defineProperty(exports, "__esModule", { value: true });
//import { factories } from '@strapi/strapi';
//export default factories.createCoreRouter('plugin::categorizer.category');
exports.default = {
    type: "content-api",
    routes: [
        {
            method: "GET",
            path: "/categories",
            handler: "category.find",
            config: {
                prefix: false,
            },
        },
        {
            method: "GET",
            path: "/categories/:id",
            handler: "category.findOne",
            config: {
                prefix: false,
            },
        },
        {
            method: "POST",
            path: "/categories",
            handler: "category.create",
            config: {
                prefix: false,
            },
        },
        {
            method: "PUT",
            path: "/categories/:id",
            handler: "category.update",
            config: {
                prefix: false,
            },
        },
        {
            method: "DELETE",
            path: "/categories/:id",
            handler: "category.delete",
            config: {
                prefix: false,
            },
        },
    ],
};
