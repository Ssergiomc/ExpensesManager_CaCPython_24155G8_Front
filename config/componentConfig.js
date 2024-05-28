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
            console.log("%cForm Data: ","color: green", Vue.toRaw(formData));
            const hiddenForm = document.querySelector('#hidden-form');
            // const hiddenNameInput = hiddenForm.querySelector('input[name="name"]');
            // hiddenNameInput.value = formData.name;
            for (const key in formData) {
              if (formData.hasOwnProperty(key)) {
                const hiddenInput = hiddenForm.querySelector(`input[name="${key}"]`);
                const hiddenSelect = hiddenForm.querySelector(`select[name="${key}"]`);
        
                if (hiddenInput) {
                  hiddenInput.value = formData[key];
                  console.log("hiddenInput", hiddenInput);
                } else if (hiddenSelect) {
                  hiddenSelect.value = formData[key];
                  log("hiddenSelect", hiddenSelect);
                } else {
                  console.warn(`Couldn't find hidden field for key: ${key}`);
                }
              }
            }
            console.log("hiddenForm", hiddenForm);
            hiddenForm.submit();
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
  },
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
        graficoGastos = new Chart(ctx1, {
          type: 'bar',
          data: {
            labels: categorias,
            datasets: [{
              label: 'Porcentaje de Gastos por Rubro',
              data: categorias.map(categoria => porcentajes[categoria] || 0),
              backgroundColor: ['#3498db', '#9b59b6', '#e74c3c', '#2ecc71', '#f1c40f'],
              borderColor: '#fff',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function (value) {
                    return value + '%';
                  }
                }
              }
            }
          }
        });

        const ctx2 = document.getElementById('trendChart').getContext('2d');
        new Chart(ctx2, {
          type: 'line',
          data: {
            labels: gastos.map(gasto => gasto.fecha),
            datasets: [{
              label: 'Evolución de Gastos',
              data: gastos.map(gasto => gasto.monto),
              fill: false,
              borderColor: '#2ecc71',
              tension: 0.1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      };

      onMounted(() => {
        actualizarGraficos();
      });

      return { ultimosGastos, categorias, filtrarPorCategoria };
    }
  },
  'Registro': {
    setup() {
      const registerFormData = Vue.reactive({
        nombre: '',
        apellido: '',
        mail: '',
        clave: '',
        repetirClave: '',
        aceptarTerminos: '',
      });

      const displayErrorAlert = (keyObject, valueObject) => {

        switch (keyObject) {
          case 'nombre':
          case 'apellido':
          case 'clave':
          case 'repetirClave':
            if (valueObject === '') {
              alert(`Campo: ${keyObject.toUpperCase()} - vacío. Todos los campos son obligatorios.`);
              return false;
            }
            break;
          case 'mail':
            if (!valueObject.includes('@') || !valueObject.includes('.com')) {
              alert(`El correo electrónico, debe contener '@' y '.com'`);
              return false;
            }
            break;
          case 'aceptarTerminos':
            if (!valueObject) {
              alert(`Debe aceptar los términos y condiciones`);
              return false;
            }
            break;
          default:
            break;
        }
        return true;
      }

      const validarRegistroForm = () => {

        const valuesArray = Object.values(registerFormData);
        console.log("valuesArray", valuesArray);
        if (valuesArray.every(value => value.trim() === '')) {
          alert('Todos los campos son obligatorios.');
          return false;
        }

        if (registerFormData.clave.length < 6) {
          alert("La contraseña debe tener al menos 6 caracteres");
          return false;
        }

        if (registerFormData.clave !== registerFormData.repetirClave) {
          alert("Las contraseñas no coinciden");
          return false;
        }
        
        for (const keyForm in registerFormData) {
          if (Object.hasOwnProperty.call(registerFormData, keyForm)) {
            const fieldValue = registerFormData[keyForm];
            if (!displayErrorAlert(keyForm, fieldValue)) {
              return false;
            }
          }
        }
        return true;
      }

      const submitRegisterForm = () => {
        if (validarRegistroForm()) {
          console.log("%cForm Data Register: ","color: green", Vue.toRaw(registerFormData));
        }
      };

      function mostrarModal() {
        const modal = document.querySelectorAll(".modal")[0];
        modal.classList.add('show');
        const body = document.body;
        body.style.overflow = 'hidden';
      }
      
      function cerrarModal() {
        const modal = document.querySelectorAll(".modal")[0];
        modal.classList.remove('show');
        const body = document.body;
        body.style.overflow = 'auto';
      }
      
      window.onclick = function(event) {
        const modal = document.getElementById("myModal");
        const body = document.body;
        if (event.target == modal) {
          modal.style.display = "none";
          body.style.overflow = 'auto';
        }
      }

      return { registerFormData, submitRegisterForm, mostrarModal, cerrarModal };    
    }
  },
};