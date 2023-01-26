import { Strapi } from '@strapi/strapi';
import pluginId from '../admin/src/pluginId';
import pluginPkg from '../package.json';

const name = pluginPkg.strapi.name;

export default ({ strapi }: { strapi: Strapi }) => {
    console.log(name);
    strapi.customFields.register({
        name: name,
        plugin: name,
        type: 'json',
    });
};
