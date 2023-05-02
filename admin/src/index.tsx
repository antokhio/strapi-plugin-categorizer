import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    console.log(app);
    app.customFields.register({
      name: name,
      pluginId: pluginId,
      type: "json",
      icon: PluginIcon,
      intlLabel: {
        id: "categorizer.label",
        defaultMessage: "Categorizer",
      },
      intlDescription: {
        id: "categorizer.description",
        defaultMessage: "Categorize your content",
      },
      inputSize: {
        default: 6,
        isResizable: true,
      },
      options: {
        base: [
          {
            sectionTitle: {
              id: "categorizer.taget.title",
              defaultMessage: "Target",
            },
            items: [
              {
                intlLabel: {
                  id: "categorizer.taget.label",
                  defaultMessage: "Content Type",
                },
                name: "options.target",
                type: "text",
                value: "",
              },
              // {
              //   intlLabel: {
              //     id: "categorizer.taget.label",
              //     defaultMessage: "Content Type",
              //   },
              //   name: "options.target",
              //   type: "select",
              //   value: "hex",
              //   options: [
              //     {
              //       key: "hex",
              //       value: "hex",
              //       metadatas: {
              //         intlLabel: {
              //           id: "categorizer.taget.format.hex",
              //           defaultMessage: "Hexadecimal",
              //         },
              //       },
              //     },
              //     {
              //       key: "rgba",
              //       value: "rgba",
              //       metadatas: {
              //         intlLabel: {
              //           id: "color-picker.color.format.rgba",
              //           defaultMessage: "RGBA",
              //         },
              //       },
              //     },
              //   ],
              // },
            ],
          },
          {
            sectionTitle: {
              id: "categorizer.options.title",
              defaultMessage: "Options",
            },
            items: [
              {
                intlLabel: {
                  id: "form.attribute.item.privateField",
                  defaultMessage: "Private field",
                },
                description: {
                  id: "form.attribute.item.privateField.description",
                  defaultMessage:
                    "This field will not show up in the API response",
                },
                name: "private",
                type: "checkbox",
                value: false,
              },
            ],
          },
        ],
        // advanced: [
        //   {
        //     sectionTitle: {
        //       id: "categorizer.taget.title",
        //       defaultMessage: "Target",
        //     },
        //     items: [],
        //   },
        // ],
      },
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "input-component" */ "./components/CategorizerInput"
          ),
      },
    });
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
