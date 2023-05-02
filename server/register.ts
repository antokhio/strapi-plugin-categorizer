import { Strapi } from "@strapi/strapi";
import pluginPkg from "../package.json";

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: pluginPkg.strapi.name,
    plugin: pluginPkg.strapi.name,
    type: "json",
  });
};
