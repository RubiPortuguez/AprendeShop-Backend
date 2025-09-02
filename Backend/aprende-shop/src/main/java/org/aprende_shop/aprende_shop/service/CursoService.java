package org.aprende_shop.aprende_shop.service;

import java.util.ArrayList;
import java.util.List;

import org.aprende_shop.aprende_shop.model.Curso;
import org.springframework.stereotype.Service;

@Service
public class CursoService {
	private final ArrayList<Curso> lista = new ArrayList<Curso>();
	
	public CursoService() {
		lista. add(new Curso("Repostería creativa", "Pasteles y cupcakes con técnicas modernas.","Domina batidos, emulsiones, fondant, ganache, royal icing y templado de chocolate. Incluye costeo y empaque.", "Repostería creativa",
				"Intermedio",9,"ES",163.0,0, 
			    "https://res.cloudinary.com/dwkykeqgz/image/upload/v1755200193/reposteria_o20yu8.jpg","Batidora, Moldes para pasteles, Fondant, Colorantes comestibles, Boquillas y mangas pasteleras, Espátulas", "https://res.cloudinary.com/dwkykeqgz/image/upload/v1755200193/reposteria_detail1.jpg",0,
			    "Kit con complementos",1) );
		lista.add(new Curso("Velas artesanales", "Crea velas únicas con cera de soya/abeja, fragancias y moldes.","Descubre el arte de fabricar velas a mano: tipos de cera, pabilos, temperaturas de vertido, pruebas de quemado y decoración. Ideal para hobby o emprendimiento.","Artesanías",
                "Intermedio", 5, "ES", 87.0, 4,
                "https://res.cloudinary.com/dwkykeqgz/image/upload/v1755199911/candles_jrg8zo.jpg","Cera de soya, Cera de abeja, Moldes de silicona, Pabilos, Fragancias, Colorantes","https://res.cloudinary.com/dwkykeqgz/image/upload/v1755199911/candles_detail1.jpg",
                1, "Cera de soya, 2 moldes, pabilos, 2 fragancias, colorante básico.", 1) );
		lista.add(new Curso("Pintura creativa","Color, texturas y composición para obras originales.","De teoría del color a técnicas mixtas: acrílico, veladuras, composición, perspectiva y práctica guiada para construir portafolio.","Arte", 
                "Principiante", 7, "ES", 124.0, 4,
                "https://res.cloudinary.com/dwkykeqgz/image/upload/v1755200187/paint_tlowmd.jpg","Pinceles variados, Lienzo, Pinturas acrílicas, Paleta de mezclas, Caballetes, Barniz protector","https://res.cloudinary.com/dwkykeqgz/image/upload/v1755200187/paint_detail1.jpg",
                0, "Prueba de kit", 1) );
		
	}
	
	public List<Curso>getCursos(){
		return lista;
	}

	public Curso getCurso(Long idCurso) {
		Curso tmpCurs = null;
		for (Curso curs : lista) {
			if (curs.getIdCurso() == idCurso) {
				tmpCurs = curs;
				break;
			}
		}
		return tmpCurs;
	}

	public Curso deleteCurso(Long idCurso) {
		Curso tmpCurs = null;
		for (Curso curs : lista) {
			if (curs.getIdCurso() == idCurso) {
				tmpCurs = curs;
				lista.remove(curs);
				break;
			}
		}
		return tmpCurs;
	}

	public Curso addCurso(Curso curso) {
		lista.add(curso);
		return curso;
	}

	public Curso updateCurso(Long idCurso, String nombreCurso, String descripcionCorta, String descripcionDetallada,
			String categoria, String nivelDificultad, Integer duracionTotal, String idioma, Double precio,
			Integer valoracionInicial, String imagenPrincipal, String materiales, String galeriaAdicional,
			Integer incluyeKit, String descripcionKit, Integer estado) {
		Curso tmpCurs = null;
		for (Curso curs : lista) {
			if (curs.getIdCurso() == idCurso) {
				if (nombreCurso != null) curs.setNombreCurso(nombreCurso);
				if (descripcionCorta != null) curs.setDescripcionCorta(descripcionCorta);
				if (descripcionDetallada != null) curs.setDescripcionDetallada(descripcionDetallada);
				if (categoria != null) curs.setCategoria(categoria);
				if (nivelDificultad != null) curs.setNivelDificultad(nivelDificultad);
				if (duracionTotal != null) curs.setDuracionTotal(duracionTotal);
				if (idioma != null) curs.setIdioma(idioma);
				if (precio != null) curs.setPrecio(precio);
				if (valoracionInicial != null) curs.setValoracionInicial(valoracionInicial);
				if (imagenPrincipal != null) curs.setImagenPrincipal(imagenPrincipal);
				if (materiales != null) curs.setMateriales(materiales);
				if (galeriaAdicional != null) curs.setGaleriaAdicional(galeriaAdicional);
				if (incluyeKit != null) curs.setIncluyeKit(incluyeKit);
				if (descripcionKit != null) curs.setDescripcionKit(descripcionKit);
				if (estado != null) curs.setEstado(estado);
				tmpCurs = curs;
				break;
			}
		}
		return tmpCurs;
	}
	
	
}
