"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => {
    // bootstrap phase
    const categorizers = {};
    Object.entries(strapi.contentTypes).forEach(([key, value]) => {
        const { attributes } = value;
        if (typeof attributes === "object") {
            Object.entries(attributes).forEach(([source, config]) => {
                const { customField, options } = config;
                if (customField === "plugin::categorizer.categorizer") {
                    const { target } = options;
                    const model = attributes[target];
                    // --------------------------
                    // TODO: add model vliadation
                    // --------------------------
                    const categorizer = { target, model, source };
                    //console.log({ target, customField, model, options });
                    categorizers[key] = categorizers[key]
                        ? [...categorizers[key], categorizer]
                        : [categorizer];
                }
            });
        }
    });
    console.log(categorizers);
    strapi.db.lifecycles.subscribe({
        // @ts-expect-error strapi misstype
        models: Object.keys(categorizers),
        beforeCreate(event) {
            const configs = categorizers[event.model.uid];
            configs.forEach(({ target, source }) => {
                var _a;
                event.params.data[target] = Array.isArray(event.params.data[target])
                    ? [...event.params.data[target], ...event.params.data[source]]
                    : (_a = event.params.data[source]) !== null && _a !== void 0 ? _a : [];
            });
        },
        beforeUpdate(event) {
            const configs = categorizers[event.model.uid];
            configs.forEach(({ target, source }) => {
                var _a;
                event.params.data[target] = Array.isArray(event.params.data[target])
                    ? [...event.params.data[target], ...event.params.data[source]]
                    : (_a = event.params.data[source]) !== null && _a !== void 0 ? _a : [];
            });
        },
    });
};
