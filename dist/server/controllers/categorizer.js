"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalize = (category) => {
    var _a;
    return ({
        ...category,
        //parent: category.parent ? category.parent.id : null,
        parent: ((_a = category.parent) === null || _a === void 0 ? void 0 : _a.id) || null,
    });
};
const normalizeMany = (categories) => categories.map((category) => normalize(category));
exports.default = ({ strapi }) => ({
    async find(ctx) {
        let categories = await strapi.db
            .query("plugin::categorizer.category")
            .findMany({ populate: ["parent"], orderBy: ["id"] });
        return normalizeMany(categories);
    },
});
