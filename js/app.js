// Importa las funciones y objetos necesarios de Vue Router
const { createApp } = Vue
const { createRouter, createWebHistory } = VueRouter
import routes from '../router.js'

const loadFixedAppComponents = async (componentName) => {
  const response = await fetch(`../components/${componentName}.html`)
  if (!response.ok) {
    throw new Error(`Failed to fetch template for ${componentName}`)
  }
  // console.log(`Loaded template for -> ${componentName}`, response);
  return response.text()
};

(async () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: await Promise.all(
      routes.map(async (route) => ({
        path: route.path,
        component: route.component ? await route.component() : undefined,
      }))
    ),
  })

  const navbarContent = { template: await loadFixedAppComponents('Navbar') }
  const footerContent = { template: await loadFixedAppComponents('Footer') }

  const app = createApp({
    data() {
      if (typeof Storage !== 'undefined') {
        return {
          isDarkMode:
            localStorage.getItem('isDarkMode') === 'true'
              ? true
              : localStorage.setItem('isDarkMode', 'false'),
        }
      } else {
        console.error('Storage API is not supported in this browser')
        return { isDarkMode: false }
      }
    },
    methods: {
      toggleDarkMode() {
        if (typeof Storage !== 'undefined') {
          this.isDarkMode = !this.isDarkMode
          localStorage.setItem('isDarkMode', this.isDarkMode.toString()) // Store the string representation
        } else {
          console.error('Storage API is not supported in this browser')
          this.isDarkMode = !this.isDarkMode
        }
      },
    },
  })
  app.use(router)
  app.config.devtools = true
  app.component('appnavbar', {
    template: navbarContent.template,
    props: ['isDarkMode', 'toggleDarkMode'], // Asegúrate de definir las propiedades esperadas
  })
  app.component('appfooter', footerContent)
  app.mount('#app')
  // console.log('Mounted app:', app._container);
})()
