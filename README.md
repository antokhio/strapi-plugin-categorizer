# Strapi plugin categorizer

A plugin that let's you categorize content quickly.
The plugin will create `Content Type` `Categories`.
The plugin would inject lifecycle hooks if contentType includes fields `categories` and `categorizer`.

The plugin check the content types, when it found target fields it injects lifecycles to that content type. Custom field would generate json value of the selected categories, and `onCreate` or `onUpdate`, the relations for the `categories` field would be created.

`Categories` is a collection that should have following structure:

```
 _______________________         _______________________         _______________________
|                       |       |                       |       |                       |
|     Main category     | ____\ |       Category        | ____\ |      Sub Category     |
|     parent: null      |     / | parent: Main Category |     / |    parent: Category   |
|_______________________|       |_______________________|       |_______________________|

```

## Installation

```py
npm i @antokhio/strapi-plugin-categorizer
or
yarn add @antokhio/strapi-plugin-categorizer
```

```py
npm run build
yarn run build
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
`src/api/contentType/content-types/contentType/schema.json`

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

### Recommendations

It's recommended to hide `categories`, or disable editing, since on every

### Known issues

1. [Relations are not updated in Content Editor View if updated from lifecycle hook.](https://github.com/strapi/strapi/issues/15571)
2. [Route prefix: Route prefix false does not remove the plugin name but prepend 'false' at the route](https://github.com/strapi/strapi/issues/9232)

#### P.S.

This developed in free time.
