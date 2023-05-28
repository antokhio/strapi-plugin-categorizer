import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
  // bootstrap phase

  const categorizers: Record<
    string,
    {
      model: any;
      target: string;
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
              const { target } = options;
              const model = attributes[target];

              // console.log(attributes);

              // --------------------------
              // TODO: add model vliadation
              // --------------------------
              const categorizer = { target, model, source };

              //console.log({ target, customField, model, options });

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
      configs.forEach(({ target, source }) => {
        event.params.data[target] = Array.isArray(event.params.data[target])
          ? [...event.params.data[target], ...event.params.data[source]]
          : event.params.data[source] ?? [];
      });
    },
    beforeUpdate(event) {
      const configs = categorizers[event.model.uid];
      configs.forEach(({ target, source }) => {
        event.params.data[target] = Array.isArray(event.params.data[target])
          ? [...event.params.data[target], ...event.params.data[source]]
          : event.params.data[source] ?? [];
      });
    },
  });
};
