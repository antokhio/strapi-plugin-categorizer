"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    async find(ctx) {
        const { data } = ctx.request.body;
        if (typeof data === "object") {
            const { target, parent } = data;
            if (typeof target === "string" && typeof parent !== "undefined") {
                return await strapi.db
                    .query(target)
                    .findMany({ where: { parent }, populate: ["parent"] });
            }
            return ctx.badRequest("Properties target or parent invalid", {
                target,
                parent,
            });
        }
        return ctx.badRequest("No data in request");
    },
});
