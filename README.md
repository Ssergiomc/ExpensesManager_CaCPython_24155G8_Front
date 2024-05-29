# ExpensesManager_CaCPython_24155G8_Front

Family expenses manager

<h2>Despliegue Online Netlify</h2>
<a href="https://expensesmanagercacpython24155g8front.netlify.app/" target="_blank">Pruebame online / Click to try me online</a>

## Table of contents
- [Description](#-description)
- [Technologies](#-technologies)
- [Screenshoots](#-screenshoots)
- [Install](#-install)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)
- [Questions](#-questions)
- [Deploy](#-deploy)

## 🟦 Description

Our expense tracker family app provides a seamless solution for managing expenses effortlessly.

1. Functionality: The app enables users to track expenses, upload receipts, and monitor their financial evolution through a dashboard.

2. Styling: Bootstrap is utilized for styling, providing a visually appealing and responsive design across various devices.

3. Method Used (CDN): Vue.js, Vue Router, and Chartjs are incorporated into the app using Content Delivery Network (CDN) for efficient loading and performance.

4. Main Features:

    🔷 **Expenses - Expense Tracking**: 
    - Users can easily input and categorize expenses, keeping a detailed record of their spending habits.
  
    🔴 **Expenses - Receipt Upload**: *(TO BE ADDED)*
    - The app allows users to upload pictures of receipts, enhancing accuracy and organization.
  
    🟢 **Expenses - Form Validation**: *(ADDED)*
    - Form Validation: There is a validation for name different from empty and also number must be higher than 0. If so will display an error message.
    - Update: Form managed by built-in form detection provided by Netlify this feature simplifies the process of adding and managing forms. This eliminates the need for extra API calls or additional JavaScript. Once enabled, Netlify's build system automatically parses your HTML at deploy time, so there's no need for you to make an API call or include extra JavaScript on your site. The data provided by form is accessible on Netlify and can be exported to CSV.
    - Redirect Success: After Form submission there will be a redirect to a success page that displays a random picture on the background (there are 5).
  
    🔷 **Dashboard**: *(DISPLAY RANDOM DATA)*
    - Users can visualize their financial data through an intuitive dashboard, providing insights into spending patterns and trends.
        - `gastos`: gastos generados aleatoriamente para un mes.
        - `categorias`: contiene las categorías de gastos posibles.
        - `gastosFiltrados`:  los gastos filtrados por categoría.
        - `computed`: propiedad llamada `ultimosGastos`,  devuelve los últimos 10 gastos, ya sea por categoría o todos si no hay ningún filtro aplicado.
        - `methods`: métodos de la aplicación:
          - `filtrarPorCategoria(categoria)`: gastos por categoría seleccionada y actualizaion de los gráficos.
          - `filtrarGastosPorCategoria(gastos, categoria)`: filtrar los gastos por categoría.
          - `actualizarGraficos()`: Actualiza los gráficos con los datos actualizados.
          - `calcularGastosPorCategoria()`: gastos totales por cada categoría.
          - `mounted()`: se llama al método `actualizarGraficos()` para inicializar los gráficos, se utilizan las bibliotecas Chart.js para renderizar los gráficos en los elementos canvas correspondientes. El gráfico de barras muestra los gastos por categoría, mientras que el gráfico de líneas muestra la evolución de los gastos a lo largo del tiempo.
    
    🔶 **User Authentication**: *(FUNCTIONALITY TO BE ADDED)*
    - A registration and login system ensures secure access to personalized accounts, enhancing privacy and data protection.
  
    🔶 **Profile Management**: *(TO BE ADDED)*
    - Users can manage their personal information and preferences within the app, ensuring a tailored experience.
  
    🟢  **Contact**: *(ADDED)*
    - This section displays an iframe map from the Google Maps.
  
    🟢  **Theme Mode Control**: *(ADDED)*
    - The app offers theme mode control, allowing users to customize the appearance based on their preferences for enhanced user experience.
  
    🟢  **Responsive Design**: *(ADDED)*
    - With responsiveness built-in, the app adapts seamlessly to different screen sizes and devices, ensuring accessibility for all users.
  
    🟢  **Burger Menu**: *(ADDED)*
    - A burger menu is incorporated for iproved navigation on smaller screens, enhancing usability and convenience.
  
    🟢  **Error Route**: *(ADDED)*
    - Case the user access a route that does not exist the ErrorPage component will be displayed which background is also a random image among 5 options.

Overall, the app combines robust functionality, user-friendly design, and seamless accessibility to provide an efficient and enjoyable expense tracking experience for families.

## 🟦 Technologies

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=E34F26&labelColor=101010&color=E34F26)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=1572B6&labelColor=101010)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=F7DF1E&labelColor=101010)

![Vue](https://img.shields.io/badge/Vue-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D&labelColor=101010)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=7952B3&labelColor=101010)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=Chart.js&logoColor=FF6384&labelColor=101010)

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=F05032&labelColor=101010)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white&labelColor=101010)

![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=Netlify&logoColor=00C7B7&labelColor=101010)

## 🟦 Screenshoots
![Register](/assets/images/screenshots/register.png){:width="100px"}
![Dashboard](/assets/images/screenshots/dash.png){:width="100px"}
![Gasto_light](/assets/images/screenshots/gasto_light.png){:width="100px"}
![Gasto_dark](/assets/images/screenshots/gasto_dark.png){:width="100px"}
![SuccessForm](/assets/images/screenshots/successform.png){:width="100px"}
![ErrorPage](/assets/images/screenshots/errorpage.png){:width="100px"}
![Responsive](/assets/images/screenshots/responsive.png){:width="100px"}
![Stats](/assets/images/screenshots/stats.png){:width="100px"}

## 🟦 Install
- Download the project

## 🟦 Usage
- run app.js on Live Server 
## 🟦 Contributing
### Currently working on this project
- Clone the repository
- Create a new branch
- Commit your changes
- Push your changes
- Submit a pull request
<!-- ### Future working strategy
- Fork the repository
- Create a new branch
- Commit your changes
- Push to your fork
- Submit a pull request -->
## 🟦 License
MIT License

## 🟦 Questions
If you have any questions about the project, please contact me via [linkedin](https://www.linkedin.com/in/sergio-martinez-cuesta/) or [GitHub](https://github.com/Ssergiomc)

## 🟦 Deploy
[![Netlify Status](https://api.netlify.com/api/v1/badges/2944f649-e79f-497f-9f04-b1fcbd9775a3/deploy-status)](https://app.netlify.com/sites/expensesmanagercacpython24155g8front/deploys)
