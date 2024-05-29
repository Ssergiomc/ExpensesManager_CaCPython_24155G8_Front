import { componentConfigs } from "./config/componentConfig.js";

const  createComponent = async (path) => {
  const response = await fetch(`../components/${path}.html`);
  if (!response.ok) {
    throw new Error(`Failed to fetch template for ${path}`);
  }
  const template = await response.text();

  // Fetch the specific component configuration
  let componentConfig = componentConfigs[path] || {};
  // console.log(`componentConfig ${path}`, componentConfig);

  // If there's no predefined setup, use a default one (or you can choose to omit this)
  if (!componentConfig.setup) {
    componentConfig = {
      ...componentConfig,
      setup() {
        return {}; // Return an empty object if no setup is needed
      }
    };
  }
  // console.log(`Loaded template for -> ${path}`);
  // console.log(template);

  // Add the loaded template to the component configuration
  componentConfig.template = template;

  // console.log(`componentConfig ${path} - `, componentConfig);

  return componentConfig;
}

const routes = [
  { path: '/', component: () => createComponent('Home') },
  { path: '/login', component: () => createComponent('Login') },
  { path: '/registro', component: () => createComponent('Registro') },
  { path: '/dashboard', component: () => createComponent('Dash') },
  { path: '/gasto', component: () => createComponent('Gasto') },
  { path: '/contacto', component: () => createComponent('Contacto') },
  { path: '/form/success', component: () => createComponent('FormSuccess') },
  { path: '/test', component: () => createComponent('Test') },
  { path: '*', component: () => createComponent('ErrorPage')}
  // { path: '/:pathMatch(.*)*', component: () =>  createComponent('ErrorPage')}
];

export default routes;