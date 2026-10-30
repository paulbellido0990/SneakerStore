import type { Zapatilla, Marca, Genero, Estilo } from '../types/product';

// Precios, colores, etiquetas y tallas del proyecto: datos académicos de demostración.
// Las fotografías se enlazan a páginas públicas de producto y requieren Internet.
const fotos = {
  nikeAF1: 'https://www.solefly.com/cdn/shop/files/AURORA_CW2288-111_PHSRH000-2000.jpg?v=1693366202&width=2000',
  nikeDunk: 'https://images.soleretriever.com/sb/product-images/477/nike-dunk-low-white-black-dd1391-100_alt_1.png?fit=contain&quality=75&width=740',
  nikeMax90: 'https://cdn.shopify.com/s/files/1/0603/3031/1875/files/2_c1ad7012-9a96-4f68-8b5b-35435823fc93_1080x.jpg?=75&v=1772238106',
  nikeMax270: 'https://classic.cdn.media.amplience.net/i/hibbett/M0472_0001_right/Nike%20Air%20Max%20270%20%22Black%22%20Men%27s%20Shoe-0001',
  nikePegasus: 'https://image1.shopserve.jp/sasakura-sport.com/pic-labo/llimg/hq1717-400b.jpg?t=20250201100439',
  nikeBlazer: 'https://cdn.blazimg.com/1800/product/n/i/nike_bq6806-100_000.webp',
  nb550: 'https://cdn.sneakersquad.nl/uploads/sneakers/BB550HSB.webp?bg=FFF&fit=fill&fm=webp&h=1200&pad=40&signature=006d6b27&trim=auto&trim-sd=1&v=1680246960&w=1200',
  nb574: 'https://2app.kicksonfire.com/kofapp/upload/events_images/ipad_new-balance-574-grey-white-3.png',
  nb2002: 'https://sidekicks.co.uk/cdn/shop/files/777724_00_png.png?v=1739564261',
  nb9060: 'https://nrml.ca/cdn/shop/files/SADVB_grande.png?v=1711482731',
  nb530: 'https://static.ftshp.digital/img/p/8/2/4/4/2/2/824422.jpg',
  nb327: 'https://www.consortium.co.uk/media/catalog/product/cache/1/image/040ec09b1e35df139433887a97daa66f/n/e/new-balance-327-black-w-white-ms327cbw_0000_cat.jpg',
  adiSamba: 'https://chicagocitysports.com/cdn/shop/files/UnisexadidasOriginalsSambaOGShoesCloudWhiteIE3439_1.jpg?v=1746547519&width=2400',
  adiGazelle: 'https://assets.adidas.com/images/h_2000%2Cf_auto%2Cq_auto%2Cfl_lossy%2Cc_fill%2Cg_auto/e7106b80850f435eb1614477f96c97bd_9366/ZAPATILLAS_GAZELLE_INDOOR_Azul_IH9650_01_00_standard.jpg',
  adiSuperstar: 'https://images-beta.laced.com/products/3833b9b9-8e04-4799-8d3c-d8f8b5ba67ea.jpg?width=2048',
  adiCampus: 'https://assets.adidas.com/images/h_840%2Cf_auto%2Cq_auto%2Cfl_lossy%2Cc_fill%2Cg_auto/8943df93a9e94f81adb7af63011856c7_9366/Campus_00s_Shoes_Black_HQ6638_01_standard.jpg',
  adiForum: 'https://1843659826.rsc.cdn77.org/temp/1684771171_dc02a81adc0e22aa8f191688bade5424.jpg',
  adiUltra: 'https://cdn.shopify.com/s/files/1/0638/1885/8538/files/0051680631800000_1.jpg?v=1774879002&width=1946',
  jordanChicago: 'https://sportsconnectionpa.com/cdn/shop/files/NikeAirJordan1HighLostandfounds.png?v=1697298221&width=1445',
  jordanBlue: 'https://img.pchome.com.tw/cs/items/DXAX2BA900HJEQI/000001_1717557844.jpg',
  jordan4: 'https://cdn.shopify.com/s/files/1/0603/3031/1875/files/2_f02c6cd9-4965-4e2d-b3c7-e81cdfe45440_1080x.jpg?=75&v=1772278713',
  jordan3: 'https://store.yankeekicks.com/cdn/shop/files/air-jordan-3-retro-white-cement-reimagined_118694f6-2acb-4f87-98bb-540dfbffc33b_1200x1200.webp?v=1718038867',
  jordan11: 'https://shoegamemanila.myshopify.com/cdn/shop/products/img01-24.jpg?v=1587913064',
  jordanMid: 'https://gomagcdn.ro/domains/sportselect.ro/files/product/original/wmns-air-jordan-1-mid-365-960571.jpg',
};

type Datos = { id: string; nombre: string; marca: Marca; genero: Genero; estilo: Estilo; precio: number; anterior?: number; descripcion: string; color: string; imagen: string; etiqueta?: string; codigo: string };
function zapatilla(p: Datos): Zapatilla {
  return { ...p, imagenes: [p.imagen], origen: 'seleccion' };
}
export const seleccion: Zapatilla[] = [
  zapatilla({id:'s-nk-01',nombre:'Air Force 1 Low Triple White',marca:'Nike',genero:'Unisex',estilo:'Urbano',precio:579.90,anterior:649.90,descripcion:'Un ícono del estilo urbano con acabado blanco, silueta clásica y amortiguación cómoda para el día a día.',color:'Blanco',imagen:fotos.nikeAF1,etiqueta:'Más buscada',codigo:'CW2288-111'}),
  zapatilla({id:'s-nk-02',nombre:'Dunk Low Retro Panda',marca:'Nike',genero:'Unisex',estilo:'Urbano',precio:539.90,descripcion:'Diseño retro en blanco y negro, con paneles contrastantes y una silueta versátil para combinar con todo.',color:'Blanco / Negro',imagen:fotos.nikeDunk,etiqueta:'Tendencia',codigo:'DD1391-100'}),
  zapatilla({id:'s-nk-03',nombre:'Air Max 90 Triple White',marca:'Nike',genero:'Hombre',estilo:'Urbano',precio:599.90,anterior:679.90,descripcion:'Una silueta clásica con capas deportivas y una unidad de amortiguación visible.',color:'Blanco',imagen:fotos.nikeMax90,codigo:'CN8490-100'}),
  zapatilla({id:'s-nk-04',nombre:'Air Max 270 Black',marca:'Nike',genero:'Hombre',estilo:'Running',precio:619.90,descripcion:'Perfil moderno y deportivo con una llamativa zona de amortiguación en el talón.',color:'Negro',imagen:fotos.nikeMax270,codigo:'AM270-BLK'}),
  zapatilla({id:'s-nk-05',nombre:'Pegasus 41 Blue',marca:'Nike',genero:'Hombre',estilo:'Running',precio:529.90,descripcion:'Zapatilla para entrenamiento diario con diseño ligero, tejido transpirable y estilo dinámico.',color:'Azul',imagen:fotos.nikePegasus,etiqueta:'Running',codigo:'HQ1717-400'}),
  zapatilla({id:'s-nk-06',nombre:"Blazer Mid '77 Vintage",marca:'Nike',genero:'Unisex',estilo:'Urbano',precio:469.90,descripcion:'Caña media, esencia setentera y acabados atemporales inspirados en las canchas.',color:'Blanco / Negro',imagen:fotos.nikeBlazer,codigo:'BQ6806-100'}),
  zapatilla({id:'s-nb-01',nombre:'550 Granite',marca:'New Balance',genero:'Unisex',estilo:'Urbano',precio:489.90,descripcion:'El carácter del básquet retro adaptado a la ciudad, con líneas limpias y tonos neutros.',color:'Gris',imagen:fotos.nb550,etiqueta:'Destacado',codigo:'BB550HSB'}),
  zapatilla({id:'s-nb-02',nombre:'574 Grey White',marca:'New Balance',genero:'Unisex',estilo:'Urbano',precio:419.90,descripcion:'Un clásico casual con malla y gamuza, diseñado para acompañar el ritmo de cada día.',color:'Gris / Blanco',imagen:fotos.nb574,codigo:'U574RBLD'}),
  zapatilla({id:'s-nb-03',nombre:'2002R Grey',marca:'New Balance',genero:'Hombre',estilo:'Running',precio:659.90,anterior:729.90,descripcion:'Diseño técnico inspirado en el running de los años 2000 con una estética urbana contemporánea.',color:'Gris',imagen:fotos.nb2002,codigo:'2002R-GRY'}),
  zapatilla({id:'s-nb-04',nombre:'9060 Sea Salt',marca:'New Balance',genero:'Mujer',estilo:'Urbano',precio:749.90,descripcion:'Silueta robusta con inspiración futurista, materiales en capas y una paleta suave.',color:'Crema',imagen:fotos.nb9060,etiqueta:'Nueva selección',codigo:'U9060ECA'}),
  zapatilla({id:'s-nb-05',nombre:'530 White Silver',marca:'New Balance',genero:'Mujer',estilo:'Running',precio:449.90,descripcion:'Estética Y2K y detalles metalizados en una zapatilla liviana de estilo retro deportivo.',color:'Blanco / Plata',imagen:fotos.nb530,codigo:'MR530EMA'}),
  zapatilla({id:'s-nb-06',nombre:'327 Black White',marca:'New Balance',genero:'Unisex',estilo:'Urbano',precio:459.90,descripcion:'Inspiración setentera con una N de gran tamaño y una silueta deportiva distintiva.',color:'Negro / Blanco',imagen:fotos.nb327,codigo:'MS327CBW'}),
  zapatilla({id:'s-ad-01',nombre:'Samba OG Cloud White',marca:'Adidas',genero:'Unisex',estilo:'Urbano',precio:449.90,descripcion:'El estilo retro de perfil bajo que combina líneas sencillas, franjas laterales y aire clásico.',color:'Blanco',imagen:fotos.adiSamba,etiqueta:'Ícono urbano',codigo:'IE3439'}),
  zapatilla({id:'s-ad-02',nombre:'Gazelle Indoor Navy',marca:'Adidas',genero:'Unisex',estilo:'Urbano',precio:449.00,descripcion:'Gamuza azul marino, franjas blancas y suela de goma en un clásico de inspiración deportiva.',color:'Azul marino',imagen:fotos.adiGazelle,codigo:'IH9650'}),
  zapatilla({id:'s-ad-03',nombre:'Superstar White Black',marca:'Adidas',genero:'Unisex',estilo:'Urbano',precio:429.90,descripcion:'Un clásico reconocible por su puntera tipo concha y las tres franjas en contraste.',color:'Blanco / Negro',imagen:fotos.adiSuperstar,codigo:'EG4958'}),
  zapatilla({id:'s-ad-04',nombre:'Campus 00s Black',marca:'Adidas',genero:'Mujer',estilo:'Urbano',precio:479.90,descripcion:'Silueta de inspiración dosmilera con proporciones marcadas y acabado de gamuza.',color:'Negro',imagen:fotos.adiCampus,etiqueta:'Tendencia',codigo:'HQ6638'}),
  zapatilla({id:'s-ad-05',nombre:'Forum Low White Blue',marca:'Adidas',genero:'Hombre',estilo:'Baloncesto',precio:459.90,descripcion:'Herencia de básquet con correa ajustable y detalles azules que destacan sobre el blanco.',color:'Blanco / Azul',imagen:fotos.adiForum,codigo:'FY7756'}),
  zapatilla({id:'s-ad-06',nombre:'Ultraboost 5 Black',marca:'Adidas',genero:'Hombre',estilo:'Running',precio:699.90,descripcion:'Diseño para carrera con tejido flexible, líneas técnicas y una pisada amortiguada.',color:'Negro',imagen:fotos.adiUltra,codigo:'UB5-BLK'}),
  zapatilla({id:'s-jd-01',nombre:'Air Jordan 1 High Chicago',marca:'Jordan',genero:'Unisex',estilo:'Baloncesto',precio:899.90,descripcion:'La historia del baloncesto en una silueta de caña alta con colores rojo, blanco y negro.',color:'Rojo / Blanco / Negro',imagen:fotos.jordanChicago,etiqueta:'Edición icónica',codigo:'DZ5485-612'}),
  zapatilla({id:'s-jd-02',nombre:'Air Jordan 1 Low Industrial Blue',marca:'Jordan',genero:'Hombre',estilo:'Urbano',precio:629.90,descripcion:'Perfil bajo con una combinación azul y blanca que mantiene el ADN de Jordan.',color:'Azul / Blanco',imagen:fotos.jordanBlue,codigo:'FN5214-141'}),
  zapatilla({id:'s-jd-03',nombre:'Air Jordan 4 Bred Reimagined',marca:'Jordan',genero:'Hombre',estilo:'Baloncesto',precio:969.90,descripcion:'Una reinterpretación de una leyenda con cuero negro, detalles rojos y estructura deportiva.',color:'Negro / Rojo',imagen:fotos.jordan4,etiqueta:'Colección premium',codigo:'FV5029-006'}),
  zapatilla({id:'s-jd-04',nombre:'Air Jordan 3 White Cement',marca:'Jordan',genero:'Unisex',estilo:'Baloncesto',precio:859.90,descripcion:'Cuero blanco, detalles clásicos y un estampado característico en un modelo legendario.',color:'Blanco / Gris',imagen:fotos.jordan3,codigo:'DN3707-100'}),
  zapatilla({id:'s-jd-05',nombre:'Air Jordan 11 Concord',marca:'Jordan',genero:'Hombre',estilo:'Baloncesto',precio:1049.90,descripcion:'Diseño de alto impacto con acabados brillantes, malla blanca y contraste oscuro.',color:'Blanco / Negro',imagen:fotos.jordan11,etiqueta:'Premium',codigo:'378037-100'}),
  zapatilla({id:'s-jd-06',nombre:'Air Jordan 1 Mid Black White',marca:'Jordan',genero:'Mujer',estilo:'Urbano',precio:659.90,descripcion:'Un básico urbano de caña media con contraste limpio entre cuero negro y blanco.',color:'Negro / Blanco',imagen:fotos.jordanMid,codigo:'DV0991-001'}),
];
