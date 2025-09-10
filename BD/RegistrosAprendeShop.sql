SHOW DATABASES;
USE aprendeshopdb;
SHOW TABLES;
SELECT * FROM usuario;
SELECT * FROM comprausuario;

INSERT INTO usuario VALUES
	(NULL, "Yessica", "yessiiramirez98@gmail.com", "5542940300", "Contraseña26.", "ES", 1),
	(NULL, "Yumari", "yumari.diaz.herrera@gmail.com", "5951040302", "MAzapan5-", "TA", 0 ),
    (NULL, "Rubi", "jarubiplatuguez@gmail.com", "5566697481", "Sopitadepollo30%", "ES", 1 ),
    (NULL, "Jazmin", "jarubiplatuguez@gmail.com", "5566697481", "Sopitadepollo30%", "ES", 1 ),
    (NULL, "Sara", "saraH@gmail.com", "5951032948", "AmolaVida4$", "TA", 0),
    (NULL, "Luis", "luis.martinez@gmail.com", "5512345678", "ClaveSegura1!", "ES", 1 ),
    (NULL, "Camila", "camila.rios@hotmail.com", "5523456789", "Camila*2025", "TA", 1 ),
    (NULL, "Andres", "andres.lopez@yahoo.com", "5534567890", "4ndr3s#Safe", "ES", 1 ),
    (NULL, "Mariana", "mariana.suarez@outlook.com", "5545678901", "Mari@na22", "TA", 1 ),
    (NULL, "Diego", "diego.perez@gmail.com", "5556789012", "D!eg0Pass", "ES", 1 ),
    (NULL, "Valeria", "valeria.gomez@gmail.com", "5567890123", "V@leriA77", "TA", 1 );
 
SELECT * FROM curso;
INSERT INTO curso
  (idCurso, nombreCurso, descripcionCorta, descripcionDetallada, categoria,
   nivelDificultad, duracionTotal, idioma, precio, valoracionInicial,
   imagenPrincipal, materiales, galeriaAdicional, incluyeKit, descripcionKit,
   estado, precioKit)
VALUES
  (NULL,'Repostería creativa',
   'Pasteles y cupcakes con técnicas modernas.',
   'Domina batidos, emulsiones, fondant, ganache, royal icing y templado de chocolate. Incluye costeo y empaque.',
   'Repostería creativa','Intermedio',9,'ES',163,0,
   'https://res.cloudinary.com/dwkykeqgz/image/upload/v1755200193/reposteria_o20yu8.jpg',
   'Batidora, Moldes para pasteles, Fondant, Colorantes comestibles, Boquillas y mangas pasteleras, Espátulas',
   'https://res.cloudinary.com/dwkykeqgz/image/upload/v1755200193/reposteria_detail1.jpg',
   0,NULL,1,163),

  (NULL,'Velas artesanales',
   'Crea velas con cera de soya/abeja, fragancias y moldes.',
   'Tipos de cera, pabilos, temperaturas de vertido, pruebas de quemado y decoración. Ideal para hobby o emprendimiento.',
   'Artesanías','Intermedio',5,'ES',87,4,
   'https://res.cloudinary.com/dwkykeqgz/image/upload/v1755199911/candles_jrg8zo.jpg',
   'Cera de soya, Cera de abeja, Moldes de silicona, Pabilos, Fragancias, Colorantes',
   'https://res.cloudinary.com/dwkykeqgz/image/upload/v1755199911/candles_detail1.jpg',
   1,'Cera de soya, 2 moldes, pabilos, 2 fragancias, colorante básico.',1,119),

  (NULL,'Pintura creativa',
   'Color, texturas y composición para obras originales.',
   'De teoría del color a técnicas mixtas: acrílico, veladuras, composición, perspectiva y práctica para portafolio.',
   'Arte','Principiante',7,'ES',124,4,
   'https://res.cloudinary.com/dwkykeqgz/image/upload/v1755200187/paint_tlowmd.jpg',
   'Pinceles, Lienzo, Pinturas acrílicas, Paleta, Caballete, Barniz',
   'https://res.cloudinary.com/dwkykeqgz/image/upload/v1755200187/paint_detail1.jpg',
   0,NULL,1,124),

  (NULL,'Crochet desde cero',
   'Amigurumis y accesorios con patrones guiados.',
   'Puntos básicos, lectura de diagramas, cambios de color y acabados profesionales. Incluye tips para venta.',
   'Textil','Principiante',6,'ES',52,5,
   'https://res.cloudinary.com/dwkykeqgz/image/upload/v1755199917/crochet_m1mcfh.jpg',
   'Hilos de algodón, Ganchillo, Tijeras, Agujas de lana, Marcadores',
   'https://res.cloudinary.com/dwkykeqgz/image/upload/v1755199917/crochet_detail1.jpg',
   1,'Set de ganchillos, hilo de algodón y marcadores.',1,72),

  (NULL,'Cerámica funcional',
   'Modelado, esmaltado y cocción segura.',
   'Del amasado al vitrificado: torno, modelado a mano, engobes y esmaltes. Seguridad y curvas de cocción.',
   'Cerámica','Intermedio',8,'ES',97,4,
   'https://res.cloudinary.com/dwkykeqgz/image/upload/v1755199914/ceramica_snmxab.jpg',
   'Arcilla, Torno, Esmaltes, Herramientas de modelado, Horno cerámico',
   'https://res.cloudinary.com/dwkykeqgz/image/upload/v1755199914/ceramica_detail1.jpg',
   0,NULL,1,97),

  (NULL,'Joyería artesanal',
   'Diseño y fabricación de piezas con metales y piedras.',
   'Soldadura con soplete, engastes, texturas y acabados espejo. Ergonomía, seguridad y costeo por pieza.',
   'Joyería','Avanzado',10,'ES',145,4,
   'https://res.cloudinary.com/dwkykeqgz/image/upload/v1755199921/joyeria_dejtub.jpg',
   'Alambre de plata, Alicates de joyería, Cuentas, Cierres, Base para anillos',
   'https://res.cloudinary.com/dwkykeqgz/image/upload/v1755199921/joyeria_detail1.jpg',
   1,'Alambre plata 925, pinzas básicas, piedras cabujón.',1,199),

  (NULL,'Fotografía digital',
   'Exposición, composición e introducción a edición.',
   'Triángulo de exposición, enfoque, composición y flujo de trabajo en edición básica para construir portafolio.',
   'Fotografía','Principiante',6,'ES',189,3,
   'https://res.cloudinary.com/dwkykeqgz/image/upload/v1755199920/fotografia_ru9lml.jpg',
   'Cámara DSLR/mirrorless, Trípode, Tarjeta de memoria, Reflector',
   'https://res.cloudinary.com/dwkykeqgz/image/upload/v1755199920/fotografia_detail1.jpg',
   0,NULL,1,189),

  (NULL,'Bordado moderno',
   'Puntos, color y acabados para prendas y cuadros.',
   'Punto satín, cadeneta, nudo francés y degradados. Composición y acabados para prendas y cuadros decorativos.',
   'Bordado','Intermedio',5,'ES',59,5,
   'https://res.cloudinary.com/dwkykeqgz/image/upload/v1755199910/bordado_z1rogd.jpg',
   'Aros, Hilos, Agujas, Telas, Marcador textil, Tijeras',
   'https://res.cloudinary.com/dwkykeqgz/image/upload/v1755199910/bordado_z1rogd.jpg',
   1,'Aro, juego de hilos, agujas surtidas.',1,79),

  (NULL,'Macramé decorativo',
   'Colgadores y tapices con nudos básicos.',
   'Nudos alondra, cuadrado y espiral, diseño de patrones y montaje. Proyecto final: colgador + mini tapiz.',
   'Textil','Principiante',4,'ES',49,3,
   'https://res.cloudinary.com/dwkykeqgz/image/upload/v1755199923/macrame_kdb2db.jpg',
   'Cuerda algodón, Anillas madera, Tijeras, Cinta métrica',
   'https://res.cloudinary.com/dwkykeqgz/image/upload/v1755199908/macrame_detail1.jpg',
   0,NULL,1,49),

  (NULL,'Costura básica',
   'De cero a tus primeras prendas sencillas.',
   'Conoce la máquina, puntadas, patrones básicos, dobladillos y ajustes. Proyecto: tote bag y falda simple.',
   'Textil','Principiante',6,'ES',79,4,
   'https://res.cloudinary.com/dwkykeqgz/image/upload/v1755199915/costura_n7dre2.jpg',
   'Tela algodón, Máquina de coser, Hilos, Alfileres, Agujas',
   'https://res.cloudinary.com/dwkykeqgz/image/upload/v1755199907/costura_detail1.jpg',
   0,NULL,1,79);


    
SELECT * FROM comprausuario;
INSERT INTO compraUsuario (fk_idUsuario, fk_idCurso, idCompra) VALUES
	(1, 2, NULL),
	(1, 5, NULL),
	(2, 1, NULL),
	(2, 3, NULL),
	(3, 7, NULL),
	(3, 9, NULL),
	(4, 4, NULL),
	(4, 8, NULL),
	(5, 6, NULL),
	(5, 10, NULL);

INSERT INTO resena (fk_idUsuario, fk_idCurso, calificacion, comentario) VALUES
  (1, 1, 5, 'La guía de temperaturas de vertido evita túneles y frosting. ¡Huelen delicioso!'),
  (4, 1, 4, 'Me ayudó a costear y presentar mis velas para Instagram.'),
  (11, 2, 4, 'Las armonías y paletas limitadas me cambiaron el juego.'),
  (10, 2, 3, 'Excelente en acrílico; ojalá más demos con óleo.'),
  (3,  3, 5, 'Mis primeros amigurumis salieron perfectos.'),
  (4,  3, 5, 'Consejos de tallas y etiquetas súper útiles.'),
  (5,  4, 5, 'La buttercream quedó estable en clima cálido.'),
  (6,  4, 5, 'Plantillas de costeo y empaque profesionales.'),
  (7,  5, 4, 'Entendí plasticidad y tiempos de secado.'),
  (8,  5, 5, 'Buenos protocolos de seguridad y pruebas.'),
  (9,  6, 5, 'Tips de temperatura y seguridad muy claros.'),
  (11, 6, 5, 'Secuencia de lijas y pulido impecables.'),
  (10, 7, 4, 'Histograma y medición de luz bien explicados.'),
  (2,  7, 4, 'Regla de tercios, líneas y enfoque al ojo útiles.'),
  (5,  8, 5, 'Los degradados quedan espectaculares en ropa.'),
  (6,  8, 5, 'Tips de precios y presentación muy útiles.'),
  (5,  9, 3, 'Buenos nudos básicos; ritmo algo irregular.'),
  (2,  9, 4, 'Colgador y mini tapiz quedaron muy bien.'),
  (7, 10, 4, 'Dobladillos y remates perfectos.'),
  (8, 10, 4, 'Faltó un patrón extra de falda, lo demás excelente.');