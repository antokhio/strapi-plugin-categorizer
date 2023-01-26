# Strapi plugin categorizer

A plugin that let's you categorize content quickly.
The plugin will create `Content Type` `Categories`.

`Categories` is a collection that should have following structure:

```
 _______________________         _______________________         _______________________
|                       |       |                       |       |                       |
|     Main category     | ____\ |       Category        | ____\ |      Sub Category     |
|     parent: null      |     / | parent: Main Category |     / |    parent: Category   |
|_______________________|       |_______________________|       |_______________________|
```

## Installation

`npm i @antokhio/strapi-plugin-categorizer`
`yarn add @antokhio/strapi-plugin-categorizer`

`/config/plugins.ts`
```
export default ({ env }) => ({
    categorizer: {
        enabled: true,
        resolve: './src/plugins/categorizer',
    },
});
```


## Setting up

Add your category structure, to Categories Content Type.

#### NOTICE:

1. Only three levels of depth supported.
2. Categories order is by id.
3. All categories would be fetched at once.

You can access 'categories` as regular content type:

```
http://localhost:1337/api/categories
```

Add custom field `categorizer` and relation `hasMany` to your content type like so:
src/api/contentType/content-types/contentType/schema.json

```json
{
  ...
  "attributes": {
    ...
    "categorizer": {
      "type": "customField",
      "customField": "plugin::categorizer.categorizer",
      "private": true,
    },
    "categories": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "plugin::categorizer.category"
    }
    ...
  }
}
```

### Known issues

1. [Relations are not updated in Content Editor View if updated from lifecycle hook.](https://github.com/strapi/strapi/issues/15571)
