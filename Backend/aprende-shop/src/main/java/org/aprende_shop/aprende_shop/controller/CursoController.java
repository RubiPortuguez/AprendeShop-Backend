package org.aprende_shop.aprende_shop.controller;

import java.util.List;

import org.aprende_shop.aprende_shop.model.Curso;
import org.aprende_shop.aprende_shop.service.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping (path = "/api/cursos/") // http://localhost:8080/api/cursos/
public class CursoController {	
	private final CursoService service;
	
	@Autowired
	public CursoController(CursoService service) {
		this.service = service;
	}//constructor
	
	//GET
	// Todos los cursos
	@GetMapping
	public List<Curso> getCurso(){
		return service.getCursos();
	}
	
	// Mostrar Curso por idCurso
	@GetMapping (path = "{curId}")
	public Curso getCurso(@PathVariable ("curId") Integer idCurso) {
		return service.getCurso(idCurso);
	}
	
	//DELETE
	// Borrar Curso por idCurso
	@DeleteMapping (path = "{curId}")
	public Curso deleteCurso(@PathVariable ("curId") Integer idCurso) {
		return service.deleteCurso(idCurso);
	}
	
	//POST
	// Agregar un curso nuevo
	@PostMapping
	public Curso addCurso(@RequestBody Curso curso) {
		return service.addCurso(curso);
	}
	
	//PUT
	@PutMapping (path = "{curId}")
	public Curso updateCurso(@PathVariable ("curId") Integer idCurso,
			@RequestParam (required = false) String nombreCurso,
			@RequestParam (required = false) String descripcionCorta,
			@RequestParam (required = false) String descripcionDetallada,
			@RequestParam (required = false) String categoria,
			@RequestParam (required = false) String nivelDificultad,
			@RequestParam (required = false) Integer duracionTotal,
			@RequestParam (required = false) String idioma,
			@RequestParam (required = false) Double precio,
			@RequestParam (required = false) Integer valoracionInicial,
			@RequestParam (required = false) String imagenPrincipal,
			@RequestParam (required = false) String materiales,
			@RequestParam (required = false) String galeriaAdicional,
			@RequestParam (required = false) Byte incluyeKit,
			@RequestParam (required = false) String descripcionKit,
			@RequestParam (required = false) Byte estado) {
		return service.updateCurso(idCurso,nombreCurso, descripcionCorta, descripcionDetallada, categoria,
				nivelDificultad, duracionTotal, idioma, precio, valoracionInicial,
				imagenPrincipal, materiales, galeriaAdicional, incluyeKit, descripcionKit, estado);
		
	}
	
	
	
}//class
