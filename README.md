# Strapi plugin categorizer v.2
A plugin that lets you categorise content quickly.

![categorizer](https://user-images.githubusercontent.com/1254168/215042671-6a87ac80-7f52-41a0-8aeb-3312b644a096.gif)

## WARNING 2.0.X is ALPHA VERSION
From version 2.0.0 categorizer changes the npm package to `strapi-plugin-categorizer`, v2 not backward compatible to v1.

### Installation

```py
npm i strapi-plugin-categorizer
-or-
yarn add strapi-plugin-categorizer
```

```py
npm run build
-or-
yarn run build
```

### Guide

1. Create your custom collection type. (`Category`)
2. Add string field `name`
3. Add relation hasOne to `Category`, name the relation field `parent`.
4. Switch to content manager view, add your categories to collection:
  - if no parent assigned, - parent is `null`, this is a root
  - if category has parent, this is a leaf - a subcategory
5. After you created your `Categories` structure, you have to add two fields to your target collection:
  - `categories` - hasMany relation to `Categories`
  - `categoriesCategorizer` - the categorizer field, that is going to be used to build relations
     - `Name` - `categoriesCategorizer`
     - `target` - `categories`
     - `targetName` - `name`
     - `maxDepth` - 4
6. After you set up, you shold be able to select relations based on your structure, when you hit save, you should get array of relations in `categories` field. 

### Current state

- [X] supports multiple categorizer fields per collection
- [X] supports user created collections
- [ ] fetaure: additional extra categories
- [ ] need validation for user entered configuration data


### About

`categorizer` is a kind of relation builder based on json created in custom field.
The `categorizer` field would let you select filtered relations one by one, then in beforeCreate or beforeUpdate, those json would be used to build actual relations for `categories` field.

Collection that should have following structure:

```
 _______________________         _______________________         _______________________
|                       |       |                       |       |                       |
|     Main category     | ____\ |       Category        | ____\ |      Sub Category     |
|     parent: null      |     / | parent: Main Category |     / |    parent: Category   |
|_______________________|       |_______________________|       |_______________________|

```

## Requirements

This plugin tested with `Strapi 4.6.0`

The plugin will add:

- Custom Field `Categorizer`
- Lifecycle hooks for contentType that are going to target `categorizer` json fields.

#### NOTICE:

1. Categories can have only one parent.
2. [Relations are not updated in Content Editor View if updated from lifecycle hook.](https://github.com/strapi/strapi/issues/15571)
3. It's recommended to hide or disable editing for field `categories`, since on every updated the relations would regenerate from `categorizer`.


The purpose of this is to be able to do that:
```
http://localhost:1337/api/cars?filters[categories][title][$eq]=sedan
```

##### P.S. This is developed in free time, and this is not magic, so be kind and use it wisely.
