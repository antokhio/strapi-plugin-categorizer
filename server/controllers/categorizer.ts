/**
 *  controller
 */
import { Strapi } from "@strapi/strapi";

const normalize = (category: any) => ({
  ...category,
  //parent: category.parent ? category.parent.id : null,
  parent: category.parent?.id || null,
});

const normalizeMany = (categories: any[]) =>
  categories.map((category) => normalize(category));

export default ({ strapi }: { strapi: Strapi }) => ({
  async find(ctx) {
    let categories = await strapi.db
      .query("plugin::categorizer.category")
      .findMany({ populate: ["parent"], orderBy: ["id"] });

    return normalizeMany(categories);
  },
});
