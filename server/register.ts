import { Strapi } from "@strapi/strapi";
import pluginId from "../admin/src/pluginId";

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: "categorizer",
    plugin: pluginId,
    type: "json",
  });
};
