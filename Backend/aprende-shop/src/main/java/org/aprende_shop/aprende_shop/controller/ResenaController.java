package org.aprende_shop.aprende_shop.controller;

import java.util.List;

import org.aprende_shop.aprende_shop.model.Resena;
import org.aprende_shop.aprende_shop.service.ResenaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/api/review/")
public class ResenaController {
	//ruta del servicio
	private final ResenaService service;
	//iniciamos automaticamente el servicio
	@Autowired
	public ResenaController(ResenaService service) {
		this.service = service;
	}//constructor
	
	//GET
	@GetMapping
	public List<Resena> getResenas(){
		return service.getResena();
	}
	@GetMapping (path="{idResena}")
	public Resena getResena(@PathVariable("idResena") Long idResena){
		return service.getResena(idResena);
	}
	
	//DELETE
	@DeleteMapping (path="{idResena}")
	public Resena deleteResena(@PathVariable("idResena") Long idResena){
		return service.deleteResena(idResena);
	}
	
	//POST
	@PostMapping
	public Resena addResena(@RequestBody Resena res){
		return service.addResena(res);
	}
	
	//PUT
	@PutMapping (path="{idResena}")
	public Resena updateResena(@PathVariable("idResena") Long idResena,
			@PathVariable(required=false) Long fk_idCurso,
			@PathVariable(required=false) Long fk_idUsuario,
			@PathVariable(required=false) Long calificacion,
			@PathVariable(required=false) String comentarios){
		return service.updateResena(idResena,fk_idCurso,fk_idUsuario,calificacion,comentarios);
	}
}
