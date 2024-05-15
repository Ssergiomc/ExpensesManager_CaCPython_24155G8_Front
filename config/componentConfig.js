// Separate configurations for different components
export const componentConfigs = {
  'Test': {
    setup() {
      const count = Vue.ref(0);
      const handleClick = () => {
        count.value++;
      };
      return { count, handleClick };
    }
  },
  'Contacto': {
    setup() {
      // Possibly some other reactive data or methods
      const message = Vue.ref("Welcome to the Contacto page!");
      return { message };
    }
  },
  'Home': {
    // A simple home component might not need any reactive state
    message: `<div>Welcome Home!</div>`
  }
};