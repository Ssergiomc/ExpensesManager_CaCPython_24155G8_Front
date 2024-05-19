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
  'Gasto': {
    setup() {      
      const formData = Vue.reactive({
          name: '',
          description: '',
          cost: '',
          date: '',
          category: '0',
          paymentType: '1',
          ticket: null,
        });

        const errors = Vue.reactive({
          name: '',
          cost: ''
        });
  
        const validateForm = () => {
          console.log("%cValidating form...", "color: orange");
          errors.name = formData.name ? '' : 'El nombre es requerido.';
          errors.cost = formData.cost > 0 ? '' : 'El coste debe ser mayor que cero.';
          return !errors.name && !errors.cost;
        };
  
        const submitForm = () => {
          if (validateForm()) {
            console.log("%cForm Data: ","color: green", formData);
          }
        };

        return { formData, errors, submitForm };
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