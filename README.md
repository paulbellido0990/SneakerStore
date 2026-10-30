<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=260&color=0:151923,45:FC6755,100:60D3C2&text=SNEAKERSTORE%20PRO&fontColor=ffffff&fontSize=47&fontAlignY=39&desc=TU%20ESTILO.%20TUS%20ZAPATILLAS.&descAlignY=61&descSize=19&animation=fadeIn" width="100%" alt="SneakerStore Pro — Tu estilo, tus zapatillas" />

### 👟 Un catálogo de zapatillas que combina diseño, tecnología y experiencia de usuario

**Nike · Adidas · Jordan · New Balance**

[![GitHub Repo](https://img.shields.io/badge/GITHUB-REPOSITORIO-151923?style=for-the-badge&logo=github&logoColor=white)](https://github.com/paulbellido0990/SneakerStore)
[![Laboratorio](https://img.shields.io/badge/IS--882-LABORATORIO%2007-FC6755?style=for-the-badge)](#-sobre-el-proyecto)
![Estado](https://img.shields.io/badge/ESTADO-DEMOSTRATIVO-40B9AA?style=for-the-badge)
![Idioma](https://img.shields.io/badge/IDIOMA-ESPAÑOL-62749A?style=for-the-badge)

<img src="https://readme-typing-svg.demolab.com?font=Montserrat&weight=600&size=19&pause=1300&color=FC6755&center=true&vCenter=true&width=750&lines=Explora+24+modelos+seleccionados;Filtra+por+marca%2C+estilo+y+precio;Busca%2C+compara+y+guarda+tus+favoritos;React+%2B+TypeScript+%2B+TanStack+Query" alt="Funciones destacadas de SneakerStore Pro" />

</div>

---

## ✨ Sobre el proyecto

**SneakerStore PRO** es una aplicación web académica para explorar zapatillas de **Nike, Adidas, Jordan y New Balance**, con una interfaz en español, diseño adaptable y precios referenciales en **soles peruanos (S/)**.

El proyecto fue desarrollado para el **Laboratorio N.º 07 de Desarrollo Web (IS-882)**, integrando consumo de API REST, asincronía, tipado estricto y enrutamiento dinámico.

> [!IMPORTANT]
> **Proyecto demostrativo.** No se realizan compras, pagos, reservas ni pedidos. Los precios y los productos seleccionados son de carácter académico y no representan inventario ni ofertas oficiales.

<div align="center">

| 👟 24 modelos seleccionados | 🏷️ 4 marcas | 🇵🇪 Precios en S/ | 📱 Diseño adaptable |
|:---:|:---:|:---:|:---:|
| 6 por marca | Nike · Adidas · Jordan · New Balance | Moneda PEN | Móvil · Tablet · PC |

</div>

## 🛍️ Descubre las marcas

<div align="center">

| **NIKE** | **ADIDAS** | **JORDAN** | **NEW BALANCE** |
|:---:|:---:|:---:|:---:|
| Deportes y estilo urbano | Clásicos y tendencias | Inspiración basketball | Confort y diseño |
| [Explorar catálogo](#-funcionalidades) | [Explorar catálogo](#-funcionalidades) | [Explorar catálogo](#-funcionalidades) | [Explorar catálogo](#-funcionalidades) |

</div>

## 🚀 Funcionalidades

- 🔎 **Búsqueda inteligente:** *debouncing* de 400 ms para procesar la búsqueda después de una pausa.
- 🎛️ **Filtros combinables:** marca, género, estilo y rango de precios.
- ↕️ **Ordenamiento:** consulta modelos por nombre o precio.
- 📄 **Paginación:** ocho productos por página, con estado reflejado en la URL.
- ❤️ **Favoritos:** almacenamiento de preferencias en el navegador.
- 🧭 **Navegación dinámica:** catálogo y detalle individual mediante React Router.
- ⚡ **Caché y prefetching:** TanStack Query permite gestionar datos asíncronos y precargar detalles.
- 🌐 **Integración REST:** Axios obtiene productos adicionales de DummyJSON cuando están disponibles.
- 🛟 **Experiencia resiliente:** manejo de carga, errores, productos inexistentes e imágenes alternativas.
- 📱 **Responsive:** interfaz adaptada a dispositivos de distintos tamaños.

## 🧰 Tecnologías utilizadas

<div align="center">

![React](https://img.shields.io/badge/React-19-202632?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

</div>

## 🧭 Arquitectura del catálogo

```mermaid
flowchart LR
  U[Usuario] --> UI[React + TypeScript]
  UI --> R[React Router]
  UI --> Q[TanStack Query]
  UI --> L[Catálogo local: 24 modelos]
  Q --> A[Axios]
  A --> API[DummyJSON REST API]
  UI --> F[Favoritos en navegador]
  classDef coral fill:#FFE7E2,stroke:#FC6755,color:#552720;
  classDef aqua fill:#E3F8F4,stroke:#49B9AA,color:#214F48;
  class U,UI,R,L coral;
  class Q,A,API,F aqua;
```

**Origen de los datos:** la aplicación combina un catálogo local de **24 zapatillas seleccionadas** con productos adicionales obtenidos de [DummyJSON](https://dummyjson.com/docs/products), filtrados según las marcas y categorías admitidas. Los precios en soles son **simulados**, no conversiones comerciales verificadas.

## 📁 Estructura principal

```text
SneakerStore/
├── public/
├── src/
│   ├── api/
│   │   └── products.ts          # Cliente REST, Axios y adaptación
│   ├── components/             # Layout, tarjetas e imágenes
│   ├── context/
│   │   └── Favoritos.tsx       # Preferencias del navegador
│   ├── data/
│   │   └── catalogo.ts         # 24 modelos seleccionados
│   ├── hooks/
│   │   └── useDebounce.ts      # Retardo de búsqueda
│   ├── pages/
│   │   ├── Catalog.tsx         # Filtros, búsqueda y paginación
│   │   └── ProductDetail.tsx   # Detalle de zapatilla
│   ├── types/
│   │   └── product.ts          # Interfaces TypeScript
│   ├── utils/
│   │   └── format.ts           # Formato monetario es-PE
│   ├── main.tsx
│   └── styles.css
├── package.json
└── README.md
```

## 💻 Instalación y ejecución

**Requisito previo:** Node.js compatible con la versión de Vite del proyecto (recomendado Node.js 20.19+ o 22.12+).

**1. Clona el repositorio**

```bash
git clone https://github.com/paulbellido0990/SneakerStore.git
cd SneakerStore
```

**2. Instala las dependencias**

```bash
npm install
```

**3. Inicia la aplicación**

```bash
npm run dev
```

Abre la URL mostrada por Vite, normalmente **http://localhost:5173**.

**4. Verifica la compilación**

```bash
npm run build
```

## 🧪 Pruebas recomendadas

| Prueba | Resultado esperado |
|---|---|
| Buscar `Samba` | Aparece el modelo que coincide con la búsqueda |
| Elegir `New Balance` | Se muestran zapatillas de esa marca |
| Cambiar de página | Se actualiza `pagina` en la URL |
| Entrar al detalle | Se muestra información del producto seleccionado |
| Marcar como favorito | El estado se conserva en el navegador |
| Acceder a un ID inválido | Se muestra un mensaje de producto no encontrado |
| Ejecutar `npm run build` | Permite comprobar la compilación local |

Consulta también [`GUIA_DE_PRUEBAS.md`](./GUIA_DE_PRUEBAS.md) para el procedimiento de validación académica.

## 📚 Aprendizajes del Laboratorio 07

- Consumo asíncrono de APIs REST con Axios.
- Tipado de interfaces y datos externos mediante TypeScript.
- Gestión de estados, caché y consultas con TanStack Query.
- Rutas dinámicas y parámetros de URL con React Router.
- Aplicación de debouncing, paginación y prefetching.
- Separación de responsabilidades en componentes, hooks y módulos.

## 👨‍💻 Autor

<div align="center">

**Llallahui Bellido Paul Modesto**  
Estudiante de Ingeniería de Sistemas  
Universidad Nacional de San Cristóbal de Huamanga — UNSCH

[![Perfil de GitHub](https://img.shields.io/badge/GitHub-paulbellido0990-151923?style=for-the-badge&logo=github&logoColor=white)](https://github.com/paulbellido0990)

**IS-882 · Desarrollo Web · Laboratorio 07 · 2026-II**

<img src="https://capsule-render.vercel.app/api?type=waving&height=110&section=footer&color=0:151923,50:FC6755,100:60D3C2" width="100%" alt="Separador decorativo SneakerStore" />

<sub>Desarrollado con fines educativos. Las marcas e imágenes pertenecen a sus respectivos titulares.</sub>

</div>
