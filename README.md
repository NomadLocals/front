![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)

# **NOMAD LOCALS** | Proyecto Final

## **📌 OBJETIVOS**

-  Construir una Single Page Application utlizando las tecnologías: **React**, **Redux**, **Node**, **Express** y **Sequelize**.
-  Poner en práctica recursos básicos de estilos y diseño (UX : UI).
-  Afirmar y conectar los conceptos aprendidos en la carrera.
-  Aprender mejores prácticas.
-  Aprender y practicar el workflow de GIT.
-  Utilizar y practicar testing.

<br />

---

## **⏱ HORARIOS Y FECHAS**

El proyecto final tiene una duración máxima de tres semanas. En la primera semana, se llevará a cabo un Kick-Off y se programarán Dailys para demostrar el progreso, hacer sugerencias y notificar nuevos requerimientos.

Cada semana habrá una demostración (DEMO) donde se recibirá el feedback de Henrys.

En caso de completar todas las tareas antes del tiempo asignado, se puede coordinar una fecha de presentación del trabajo (DEMO) con el instructor.

<br />

---

## **⚠️ IMPORTANTE**

Es necesario contar minimamente con la última versión estable de NodeJS y NPM. Asegúrate de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto. Actualmente las versiónes necesarias son:

-  **Node**: 12.18.3 o mayor
-  **NPM**: 6.14.16 o mayor

Para verificar que versión tienes instalada:

```bash
node -v
npm -v
```


Está permitido, **bajo tu responsabilidad**, actualizar las dependencias a versiones más actuales si lo deseas. Versiones mas actuales podrían presentar configuraciones diferentes respecto a las versiones en las que venimos trabajando durante el bootcamp.

### **⛔️ En esta ocasión, se les permite utilizar librerías externas como Bootstrap, Material-UI o Tailwind CSS para aplicar estilos a la SPA.**

<br />

---
## **📋 SOBRE LA API**

En este proyecto la API de NomadLocals **correrá localmente desde tu computadora**. De esta manera, siempre tendrás disponible los datos de forma local para poder realizar tu proyecto.

Para lograr que esta API funcione desde tu computadora deberás dirigirte, desde tu terminal, a la carpeta **`server`** y ejecutar el comando:

```bash
   npm start
```

Podrás ver el siguiente mensaje en tu terminal.

![Alt text](image.png)

```

Esto significa que la API ya está corriendo en tu computadora en el puerto 5000. Es decir que podrás acceder a ella desde la URL **`http://localhost:5000`**. Para poder comunicarte con esta API deberás dejar la terminal levantada.

**IMPORTANTE**
No debes modificar **NINGÚN** archivo dentro de la carpeta **`/server/api`**. Cualquier modificación en estos archivos puede alterar el funcionamiento normal de la API y de tu proyecto.

<br />

---


## **📋 PARA COMENZAR...**

1. Deberás forkear este repositorio para tener una copia del mismo en tu cuenta personal de GitHub.

2. Clona el repositorio en tu computadora para comenzar a trabajar.
 Este repositorio contiene un **`BoilerPlate`** 
con la estructura general del proyecto, tanto del servidor como del cliente. 
El boilerplate cuenta con dos carpetas: **`server`** y **`client`**.
 En estas carpetas estará el código del back-end y el front-end respectivamente.

3. En la carpeta **`server`** deberás crear un archivo llamado: **`.env`** que tenga la siguiente forma:
```
  ![Alt text](image-2.png)
```
4. Reemplazar **`usuariodepostgres`** y **`passwordDePostgres`** con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

5. Adicionalmente será necesario que crees, **desde psql (shell o PGAdmin)**, una base de datos llamada **`nomadlocals`**. Si no realizas este paso de manera manual no podrás avanzar con el proyecto.

<br />

---

## **📖 ENUNCIADO GENERAL**

La idea de este proyecto es construir una aplicación web en la que se pueda:

-  Buscar eventos deportivos, entretenimiento, culturales, etc.
-  Visualizar la información de los eventos y usuarios.
-  Crear actividades con informacion de localizacion, cantidad de usuarios, costos y demas.
-  Filtrarlos.
-  Ordenarlos.
 

⚠️ Para las funcionalidades de filtrado y ordenamiento NO se puede utilizar los endpoints de la API externa que ya devuelven los resultados filtrados u ordenados.

### **Único end-point que se puede utilizar**

-  [**http://localhost:5000/countries**]

<br />

---

<div align="center">

## **📁 INSTRUCCIONES**

</div>

<br />

### **🖱 BASE DE DATOS**

Deberás crear los modelos necesarios para tu base de datos.  A continuación te dejamos las propiedades que debe tener cada modelo. 

**📍 MODELO 1 | Chat**

-  ID. \*
-  senderId. \*
-  receiverId. \*
-  eventId. \*


<br />

**📍 MODELO 2 | Events**

- ID. \*
- Name. \*
- ActivityType. \*
- Description.
- eventDate. \*
- duration. \*
- minSizePeople. \*
- image. \*
- location. \*
- minCost. \*
- active. \*

**📍 MODELO 3 | ReportEvent**

- id. \*
- type. \*
- description. \*
- userNameUserReporter. \*
    
**📍 MODELO 4 | ReportUser**

- id. \*
- type. \*
- description. \*
- idUserReporter. \*

**📍 MODELO 5| ReviewEvent**

- id. \*
- type. \*
- description. \*
- UserNameUserReview. \*

**📍 MODELO 6| ReviewUser**

- id. \*
- type. \*
- description. \*
- UserNameUserReview. \*

*📍 MODELO 7| User**

- id. \*
- firstName. \*
- lastName. \*
- userName. \*
- email. \*
- password. \*
- googleAccount. \*
- verifiedEmail. \*
- interests. \*
- age. \*
- geolocation. \*
- gender. \*
- admin. \*
<br />

---

<br />

### **🖱 BACK-END**

Para esta parte deberás construir un servidor utilizando **NodeJS** y **Express**. Tendrás que conectarlo con tu base de datos mediante **Sequelize**.

En una primera instancia, al levantar tu servidor se deberá hacer una petición a la base de datos, donde ya deben estar guardados todos la informacion necesaria. Una vez guardados, toda tu aplicación utilizará la información sólo de tu base de datos.

Tu servidor deberá contar con las siguientes rutas:

#### **📍 GET | /events**

-  Obtiene un arreglo , donde cada objeto es evento  con toda su información.

#### **📍 GET | /events/:id**

-  Obtiene un arreglo ((por identificador unico ID)) , donde cada objeto es evento  con toda su información.

#### **📍 DELETE | /delete/:id**

-  Esta ruta  elimina un evento con un identificador unico(ID)


#### **📍 POST | /events**

-  Esta ruta recibirá todos los datos necesarios para crear una actividad o evento y relacionarla con el usuario que lo promueve.
-  Toda la información debe ser recibida por body.
-  Debe crear la actividad en la base de datos, y esta debe estar relacionada con el usuario que la inicia.

#### **📍 PUT | /events/id**

-  se utiliza para actualizar un evento específico en la aplicación. Al enviar una solicitud PUT a esta ruta con el ID del evento en la URL, puedes modificar los datos del evento y guardar los cambios en la base de datos. Esta ruta es útil cuando necesitas realizar actualizaciones en un evento existente, como cambiar su título, descripción, fecha, ubicación u otras propiedades relacionadas.

## NOTA: Utilizamos como ejemplo las rutas de "events", pero básicamente tiene
exactamente la misma funcionalidad y deberas crearla para users, reports, reviews, etc.
<br />

---

<br />

### **🖱 FRONT-END**

Se debe desarrollar una aplicación utilizando **React** y **Redux** que contenga las siguientes vistas:

**📍 LANDING PAGE |** deberás crear una página de inicio o bienvenida con:
 Un mensaje de bienvenida e imagenes representativas del proyecto, con una ruta (boton) al HOME

<br />

**📍 HOME PAGE |** la página principal de tu SPA debe contener:

 - Imagen: Imagenes que representen perfectamente el proyecto.
 - Header: Encabezado de la página.
 - Hero: Sección principal que destaca la propuesta de valor o mensaje principal.
 - Recomend: Sección que muestra recomendaciones o sugerencias.
 - Events: Sección que muestra los eventos disponibles.
 - Reviews: Sección que muestra reseñas o testimonios de usuarios.
 - Services: Sección que muestra los servicios ofrecidos.
 - Footer: Pie de página que contiene enlaces y detalles adicionales.
 - Botón para ingresar a la **`home page`**.

<br />

**📍 DETAIL PAGE |** en esta vista se deberá mostrar toda la información específica de una actividad:

La página "Detail" muestra los detalles de una actividad en particular. Aquí puedes encontrar información como el nombre de la actividad, el tipo de actividad, una imagen representativa, una descripción, la fecha y hora del evento, la duración estimada, el número mínimo de participantes, el costo (si lo hay) y una lista de los miembros que participarán en el evento.

Además de eso, se muestran las imágenes y los nombres de los miembros que formarán parte de la actividad. También debe haber un botón  que permita realizar alguna acción relacionada con el evento.

En general, esta página debe brindar todos los detalles necesarios sobre una actividad específica y te permite conocer a las personas que participarán en ella.

<br />

**📍 FORM PAGE |**: en esta vista se encontrará el formulario para crear una actividad.

La página debe contener:

1. Barra de navegación (NavBar): Proporciona acceso a otras secciones del sitio web.
2. Formulario de creación de actividad: Permite a los usuarios ingresar información sobre la nueva actividad, incluyendo:
   - Título de la actividad
   - Descripción de la actividad
   - Fecha y hora de inicio de la actividad
   - Tipo de actividad (seleccionable de una lista)
   - Duración de la actividad
   - Cantidad mínima de personas necesarias para la actividad
   - Presupuesto mínimo para la actividad
   - Ubicación de la actividad (selección a través de un mapa interactivo)
3. Manejo de errores: Muestra mensajes de error en caso de que los campos no estén completos o no cumplan con ciertos criterios.
4. Botón de creación: Permite a los usuarios enviar el formulario y crear la nueva actividad.
5. Pie de página (Footer): Proporciona información adicional y enlaces relacionados.

En conjunto, esta página debe brindar a los usuarios la posibilidad de agregar nuevas actividades a la plataforma, asegurando que se proporcione la información necesaria para que otros usuarios puedan encontrar y unirse a estas actividades.
<br />

---

<br />

### **🖱 TESTING**

Ten en cuenta que en esta instancia no es obligatorio el desarrollo de testing para tu aplicación. De igual manera, te desafiamos a que los hagas, ¡ya que suman puntos!

-  Al menos tener un componente del frontend con sus tests respectivos.
-  Al menos tener dos rutas del backend con sus tests respectivos.
-  Al menos tener un modelo de la base de datos con sus tests respectivos.

<br />

---

<br />
```
  ![Alt text](image-3.png)
```