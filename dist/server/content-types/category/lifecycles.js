"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    async beforeCreate(event) {
        event.params.data.order =
            (await strapi.db.query("plugin::categorizer.category").count(undefined)) *
                10;
    },
};
