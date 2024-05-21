// import { setImportMap } from 'systemjs'; // Assuming you're using systemjs

// const importMap = {
//   "imports": {
//     "vue": "https://play.vuejs.org/vue.runtime.esm-browser.js",
//     "vue/server-renderer": "https://play.vuejs.org/server-renderer.esm-browser.js",
//     // "vue-router": "https://unpkg.com/vue-router@4.3.0/dist/vue-router.esm-browser.js",
//     "vue-router": "https://cdnjs.cloudflare.com/ajax/libs/vue-router/4.3.2/vue-router.cjs.js",
//     "@vue/devtools-api": "https://unpkg.com/@vue/devtools-api@6.6.1/lib/esm/index.js"
//   },
//   "scopes": {}
// };

// setImportMap(importMap);
const importMap = {
  "vue": "https://cdn.jsdelivr.net/npm/vue@3",
  "vue-router": "https://unpkg.com/vue-router@4",
      // "vue-router": "https://cdnjs.cloudflare.com/ajax/libs/vue-router/4.3.2/vue-router.umd.min.js",

  // Add other dependencies here
};

export default importMap;