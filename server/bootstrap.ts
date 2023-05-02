import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
  // bootstrap phase

  Object.entries(strapi.contentTypes).forEach(
    ([key, value]: [key: string, value: any]) => {
      const { attributes } = value;
      if (typeof attributes === "object") {
        Object.entries(attributes).forEach(
          ([attribute, options]: [attribute: string, options: any]) => {
            const { customField } = options;
            if (customField === "plugin::categorizer.categorizer") {
              console.log(attribute, options);
            }
          }
        );
      }
    }
  );
};
