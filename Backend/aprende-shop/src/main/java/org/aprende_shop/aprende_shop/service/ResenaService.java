package org.aprende_shop.aprende_shop.service;

import java.util.List;

import org.aprende_shop.aprende_shop.model.Resena;
import org.aprende_shop.aprende_shop.repository.ResenaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResenaService {
	
	private final ResenaRepository reseRepository;
	
	@Autowired
	public ResenaService(ResenaRepository reseRepository) {
		this.reseRepository = reseRepository;
	}

	public List<Resena> getResena() {
        return reseRepository.findAll();
    } //Todos los cursos
	
	//GET
	public Resena getResena(Integer idResena) {
		return reseRepository.findById(idResena).orElseThrow(
				() -> new IllegalArgumentException("La reseña con el id ["
						+  idResena +"] no existe"));
	} // Un solo curso
	
	 public List<Resena> getByCurso(Integer idCurso) {
	        return reseRepository.findByFkIdCurso(idCurso);
	    }
	
	//DELETE
	public Resena deleteResena(Integer idResena) {
		Resena tmpRes= null;
		if (reseRepository.existsById(idResena)) {
			tmpRes = reseRepository.findById(idResena).get();
			reseRepository.deleteById(idResena);
		}
		return tmpRes;
	}
	
	//POST
	public Resena addResena(Resena res) {
	return reseRepository.save(res);
	}
	
	//PUT
	public Resena updateResena(Integer idResena, Integer fk_idCurso, Integer fk_idUsuario, Integer calificacion, String comentarios) {
		Resena tmpRes= null;
		if(reseRepository.existsById(idResena)) {
			Resena res= reseRepository.findById(idResena).get();
				if(fk_idCurso!=null) res.setFkIdCurso(fk_idCurso);
				if(fk_idUsuario!=null) res.setFkIdUsuario(fk_idUsuario);
				if(calificacion!=null) res.setCalificacion(calificacion);
				if(comentarios!=null) res.setComentarios(comentarios);
				reseRepository.save(res);
				tmpRes = res;
			}
			return tmpRes;
	}
}
