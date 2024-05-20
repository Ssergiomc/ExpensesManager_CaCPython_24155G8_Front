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
  ,
  'Dash': {
    setup() {
      const { ref, reactive, computed, onMounted } = Vue;

      const gastos = reactive([]);
      const categorias = ['Comida', 'Transporte', 'Entretenimiento', 'Hogar', 'Otros'];

      const fechaActual = new Date();
      const fechaInicio = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
      const fechaFin = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

      const diasEnMes = (fechaFin.getDate() - fechaInicio.getDate()) + 1;

      for (let i = 0; i < diasEnMes; i++) {
        const montoAleatorio = Math.floor(Math.random() * 100) + 1;
        const categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];
        const fecha = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate() + i);
        gastos.push({
          fecha: fecha.toISOString().split('T')[0],
          categoria: categoriaAleatoria,
          monto: montoAleatorio
        });
      }

      const gastosFiltrados = ref([]);
      const porcentajes = reactive({});

      const ultimosGastos = computed(() => {
        return gastosFiltrados.value.length ? gastosFiltrados.value.slice(-10).reverse() : gastos.slice(-10).reverse();
      });

      const filtrarPorCategoria = (categoria) => {
        gastosFiltrados.value = gastos.filter(gasto => gasto.categoria === categoria);
        actualizarGraficos();
      };

      const calcularPorcentajes = () => {
        const total = gastos.reduce((acumulador, gasto) => acumulador + gasto.monto, 0);
        categorias.forEach(categoria => {
          const totalCategoria = gastos
            .filter(gasto => gasto.categoria === categoria)
            .reduce((acumulador, gasto) => acumulador + gasto.monto, 0);
          porcentajes[categoria] = (totalCategoria / total) * 100;
        });
      };

      let graficoGastos;

      const actualizarGraficos = () => {
        calcularPorcentajes();

        const ctx1 = document.getElementById('expensesChart').getContext('2d');
        if (graficoGastos) {
          graficoGastos.destroy();
        }
        // graficoGastos = new Chart(ctx1, {
        //   type: 'bar',
        //   data: {
        //     labels: categorias,
        //     datasets: [{
        //       label: 'Porcentaje de Gastos por Rubro',
        //       data: categorias.map(categoria => porcentajes[categoria] || 0),
        //       backgroundColor: ['#3498db', '#9b59b6', '#e74c3c', '#2ecc71', '#f1c40f'],
        //       borderColor: '#fff',
        //       borderWidth: 1
        //     }]
        //   },
        //   options: {
        //     scales: {
        //       y: {
        //         beginAtZero: true,
        //         ticks: {
        //           callback: function (value) {
        //             return value + '%';
        //           }
        //         }
        //       }
        //     }
        //   }
        // });

        const ctx2 = document.getElementById('trendChart').getContext('2d');
        // new Chart(ctx2, {
        //   type: 'line',
        //   data: {
        //     labels: gastos.map(gasto => gasto.fecha),
        //     datasets: [{
        //       label: 'Evolución de Gastos',
        //       data: gastos.map(gasto => gasto.monto),
        //       fill: false,
        //       borderColor: '#2ecc71',
        //       tension: 0.1
        //     }]
        //   },
        //   options: {
        //     scales: {
        //       y: {
        //         beginAtZero: true
        //       }
        //     }
        //   }
        // });
      };

      onMounted(() => {
        actualizarGraficos();
      });

      return { ultimosGastos, categorias, filtrarPorCategoria };
    }
  }
};