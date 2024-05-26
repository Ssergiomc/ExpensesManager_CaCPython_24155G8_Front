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
        component: route.component ? route.component() : undefined,
      }))
    ),
  });

  // // Add a global navigation guard
  // router.beforeEach((to, from, next) => {
  //   const matchedRoute = router.resolve(to).matched.length > 0;
  //   console.log(`Route matched: ${matchedRoute}`);
  //   if (!matchedRoute) {
  //     console.log('Error 404: Route not found');
  //   }
  //   next();
  // });

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
        const manifest = document.getElementById('theme-manifest')
        manifest.href = !this.isDarkMode
          ? '../manifest.json'
          : '../manifestdark.json'
        if (typeof Storage !== 'undefined') {
          this.isDarkMode = !this.isDarkMode
          localStorage.setItem('isDarkMode', this.isDarkMode.toString())
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
    props: ['isDarkMode', 'toggleDarkMode', 'closeNabvar'],
    mounted() {
      const navbarRef = this.$refs.navbarRef
      if (!navbarRef) {
        console.error(
          'Navbar element not found! Ensure "ref="navbarRef"" is added to the navbar component.'
        )
        return
      }
      const clickOutside = (element, callback) => {
        const outsideClickListener = (event) => {
          if (!element.contains(event.target)) {
            callback()
          }
        }

        document.addEventListener('click', outsideClickListener)

        return () => {
          document.removeEventListener('click', outsideClickListener)
        }
      }

      clickOutside(navbarRef, () => {
        if (window.innerWidth < 768) {
          const navTogglerButton = document.querySelector('.navbar-toggler');
          const navbarMenu = document.querySelector('.show');
          if (navTogglerButton && navbarMenu) {
            navTogglerButton.classList.add('collapsed');
            navTogglerButton.setAttribute('aria-expanded', 'false');
            navbarMenu.classList.remove('show');
          } 
          // else {
          //   console.error('Navbar toggler button not found!');
          // }
        }
      })
    },
  })
  app.component('appfooter', footerContent)
  app.mount('#app')
  // console.log('Mounted app:', app._container);
})()
