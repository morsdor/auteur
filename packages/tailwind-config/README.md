# @auteur/tailwind-config

Shared Tailwind CSS configuration for Auteur AI monorepo.

## Usage

In your `tailwind.config.js`:

```js
const baseConfig = require('@auteur/tailwind-config');

module.exports = {
  ...baseConfig,
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
};
```
