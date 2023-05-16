import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
  // bootstrap phase

  const categorizers: Record<
    string,
    {
      model: any;
      targetName: string;
      source: string;
    }[]
  > = {};

  Object.entries(strapi.contentTypes).forEach(
    ([key, value]: [key: string, value: any]) => {
      const { attributes } = value;
      if (typeof attributes === "object") {
        Object.entries(attributes).forEach(
          ([source, config]: [source: string, config: any]) => {
            const { customField, options } = config;
            if (customField === "plugin::categorizer.categorizer") {
              const { targetName } = options;
              const model = attributes[targetName];
              // --------------------------
              // TODO: add model vliadation
              // --------------------------
              const categorizer = { targetName, model, source };

              console.log(customField, options);

              categorizers[key] = categorizers[key]
                ? [...categorizers[key], categorizer]
                : [categorizer];
            }
          }
        );
      }
    }
  );

  console.log(categorizers);
  strapi.db.lifecycles.subscribe({
    // @ts-expect-error strapi misstype
    models: Object.keys(categorizers),
    beforeCreate(event) {
      const configs = categorizers[event.model.uid];
      configs.forEach(({ targetName, source }) => {
        event.params.data[targetName] = event.params.data[source] ?? [];
      });
    },
    beforeUpdate(event) {
      const configs = categorizers[event.model.uid];
      configs.forEach(({ targetName, source }) => {
        event.params.data[targetName] = event.params.data[source] ?? [];
      });
    },
  });
};
