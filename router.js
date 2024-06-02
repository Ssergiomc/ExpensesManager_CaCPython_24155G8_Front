import { componentConfigs } from './config/componentConfig.js'

const createComponent = async (path) => {
  const response = await fetch(`../components/${path}.html`);
  if (!response.ok) {
    throw new Error(`Failed to fetch template for ${path}`);
  }
  const template = await response.text()

  // Fetch the specific component configuration
  let componentConfig = componentConfigs[path] || {};
  // console.log(`componentConfig ${path}`, componentConfig);

  // If there's no predefined setup, use a default one (or you can choose to omit this)
  if (!componentConfig.setup) {
    componentConfig = {
      ...componentConfig,
      setup() {
        return {}
      },
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
  {
    path: '/',
    component: () => createComponent('Home'),
    meta: {
      title: 'Inicio - AhorroFácil || Control de gastos',
      description: "Controla tus gastos familiares fácilmente con nuestra app. Descubre cómo gestionar tus finanzas de manera efectiva desde la comodidad de tu hogar. ¡Comienza hoy y toma el control de tus gastos!",
    },
  },
  {
    path: '/login',
    component: () => createComponent('Login'),
    meta: { 
      title: 'Login - AhorroFácil || Control de gastos',
      description: "Inicia sesión en nuestra app para controlar tus gastos familiares. Gestiona tus finanzas de manera efectiva y mantén tus gastos bajo control. ¡Empieza ahora y accede a todas tus herramientas financieras!",
    },
  },
  {
    path: '/registro',
    component: () => createComponent('Registro'),
    meta: { 
      title: 'Registro - AhorroFácil || Control de gastos',
      description: "Regístrate en nuestra app y comienza a controlar tus gastos familiares. Descubre cómo gestionar tus finanzas de manera efectiva y ahorrar dinero. ¡Únete hoy y toma el control de tus gastos!",
    },
  },
  {
    path: '/dashboard',
    component: () => createComponent('Dash'),
    meta: { 
      title: 'Dashboard - AhorroFácil || Control de gastos',
      description: "Accede a tus estadísticas de gastos familiares y visualiza tus gastos en un solo lugar. Gestiona tus finanzas de manera eficiente y ahorrar dinero. ¡Comienza hoy y toma el control de tus gastos!",
    },
  },
  {
    path: '/gasto',
    component: () => createComponent('Gasto'),
    meta: { 
      title: 'Gasto - AhorroFácil || Control de gastos',
      description: "Registra y gestiona cada gasto familiar. Gestiona tus finanzas de manera eficiente y ahorrar dinero. ¡Empieza a ahorrar y toma el control de tus gastos hoy mismo!",
    },
  },
  {
    path: '/contacto',
    component: () => createComponent('Contacto'),
    meta: { 
      title: 'Contacto - AhorroFácil || Control de gastos',
      description: "Contacta con nosotros para obtener ayuda y soporte en el control de tus gastos familiares. Aprende cómo gestionar tus finanzas de manera efectiva con nuestra app. ¡Estamos aquí para ayudarte!",
    },
  },
  {
    path: '/formsuccess',
    component: () => createComponent('FormSuccess'),
    meta: {
      title: 'Formulario enviado con éxito - AhorroFácil || Control de gastos',
    },
  },
  {
    path: '/404',
    component: () => createComponent('ErrorPage'),
    meta: { title: 'Error - AhorroFácil || Control de gastos' },
  },
  { path: '/test', component: () => createComponent('Test') },
  // { path: '/:pathMatch(.*)*', component: () =>  createComponent('ErrorPage')}
]

export default routes;