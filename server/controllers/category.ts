/**
 *  controller
 */

import { factories } from '@strapi/strapi';

const normalizeMany = (categories: any[]) => categories.map((category) => normalize(category));
const normalize = ({ id, title, slug, parent }: any) => ({
    id,
    title,
    slug,
    parent: parent ? parent.id : null,
});

export default factories.createCoreController('plugin::categorizer.category', ({ strapi }) => ({
    async findAll(ctx) {
        const categories = await strapi.db
            .query('plugin::categorizer.category')
            .findMany({ populate: ['parent'] });

        return normalizeMany(categories);
    },
}));
