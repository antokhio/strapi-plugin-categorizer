# Strapi plugin categorizer

A plugin that lets you categorise content quickly.

`categorizer` is a kind of relation builder based on json created in custom field.
The `categorizer` field would let you select filtered relations one by one, then in beforeCreate or beforeUpdate, those json would be used to build actual relations for `categories` field.

So make sure that target content type has `categorizer` and `categories` attributes.

`Categories` is a collection that should have following structure:

```
 _______________________         _______________________         _______________________
|                       |       |                       |       |                       |
|     Main category     | ____\ |       Category        | ____\ |      Sub Category     |
|     parent: null      |     / | parent: Main Category |     / |    parent: Category   |
|_______________________|       |_______________________|       |_______________________|

```

![categorizer](https://user-images.githubusercontent.com/1254168/215042671-6a87ac80-7f52-41a0-8aeb-3312b644a096.gif)

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

The plugin will add:

-   Custom Field `Categorizer`
-   Collection `Categories`.
-   Lifecycle hooks for contentType that includes fields `categories` and `categorizer`.

## Setting up

1. Create your category structure.

2. Add custom field `categorizer` and relation `hasMany` `categories` to your content type like so:
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

#### NOTICE:

1. Only three levels of depth are supported.
2. Categories order currently is by id.
3. All categories would be fetched at once, so it's not expected to work with thousands of them.
4. Categories can have only one parent.

You can access 'categories` as regular content type:

```
http://localhost:1337/api/categories
```

-   You have to add permissions in `Roles & Permissions`
-   You can access collection from code via `plugin::categorizer.categorie`
-   You can extend `Categories` for your needs but it has to have mandatory field `parent`

It's recommended to hide or disable editing for field `categories`, since on every updated the relations would regenerate from `categorizer`.

The purpose of this is to be able to do that:

```
http://localhost:1337/api/cars?filters[categories][title][$eq]=sedan
```

### TODO:

-   [ ] Cleanup unused code
-   [ ] Target plugin name instead of fields name

### Knowing issues:

1. [Relations are not updated in Content Editor View if updated from lifecycle hook.](https://github.com/strapi/strapi/issues/15571)
2. [Route prefix: Route prefix false does not remove the plugin name but prepend 'false' at the route](https://github.com/strapi/strapi/issues/9232)

##### P.S. This is developed in free time, and this is not magic, so be kind and use it wisely.
