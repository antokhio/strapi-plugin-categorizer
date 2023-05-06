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
                  defaultMessage: "Target filed name",
                },
                description: {
                  id: "categorizer.taget.label.description",
                  defaultMessage:
                    "The filed that contains hasMany realtion to target collection.",
                },
                name: "options.target",
                type: "text",
                value: "",
              },
              {
                intlLabel: {
                  id: "categorizer.tagetName.label",
                  defaultMessage:
                    "Content attribute to display (name, slug, etc.)",
                },
                description: {
                  id: "categorizer.taget.tagetName.description",
                  defaultMessage:
                    "The filed in taget collection that is going to be displayed in dropdown.",
                },
                name: "options.targetName",
                type: "text",
                value: "title",
              },
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
                value: true,
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
            /* webpackChunkName: "input-component" */ "./components/Categorizer"
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
