package org.aprende_shop.aprende_shop.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.aprende_shop.aprende_shop.model.Curso;
import org.aprende_shop.aprende_shop.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
public class CursoService {
	private final CursoRepository repository;
	
	@Autowired
	public CursoService(CursoRepository repository) {
		this.repository = repository;
	}//constructor
	
	
	//-----------------MÉTODOS:
	//GET
	public List<Curso>getCursos(){
		return repository.findAll();
	}//getCursos

	public Curso getCurso(Integer idCurso) {
		return repository.findById(idCurso).orElseThrow(
				()-> new IllegalArgumentException("El curso con el id [" +idCurso
						+ "] + no existe")
				);
	}//getCurso

	//DELETE
	public Curso deleteCurso(Integer idCurso) {
		Curso tmpCurs = null;
			if (repository.existsById(idCurso)) {
				tmpCurs = repository.findById(idCurso).get();
				repository.deleteById(idCurso);
			}//if
		return tmpCurs;
	}//deteleCurso

	//POST
	public Curso addCurso(Curso curso) {
		Optional<Curso> curs =
				repository.findByNombreCurso(curso.getNombreCurso() );
		if(curs.isEmpty() ) {
			repository.save(curso);
		} else {
			curso =null;
		}//else
		return curso;
	}//addCurso

	
	//UPDATE
	public Curso updateCurso(Integer idCurso, String nombreCurso, String descripcionCorta, String descripcionDetallada,
			String categoria, String nivelDificultad, Integer duracionTotal, String idioma, Double precio,
			Integer valoracionInicial, String imagenPrincipal, String materiales, String galeriaAdicional,
			Byte incluyeKit, String descripcionKit, Byte estado) {
		Curso tmpCurs = null;
		
			if (repository.existsById(idCurso)) {
				Curso curs = repository.findById(idCurso).get();
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
				tmpCurs = repository.save(curs);
			}//if
		return tmpCurs;
	}//updateCurso
	
	
}//class
