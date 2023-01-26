import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
  let models = [];
  Object.entries(strapi.contentTypes).forEach(([key, value]) => {
    if (
      "categorizer" in (value as any).attributes &&
      "categories" in (value as any).attributes
    ) {
      models.push(key);
    }
  });

  strapi.log.info("categorizer: ", models);

  strapi.db.lifecycles.subscribe({
    // @ts-ignore
    models,
    async beforeCreate(event) {
      let { params } = event;
      let { data } = params;
      const { categorizer } = data;
      if (categorizer) {
        event.params.data.categories = categorizer.map((id, i) => ({
          id,
          order: i,
        }));
      }
    },
    async beforeUpdate(event) {
      const { data } = event.params;
      const { categorizer } = data;
      if (categorizer) {
        event.params.data.categories = categorizer.map((id, i) => ({
          id,
          order: i,
        }));
      }
    },
  });
};
