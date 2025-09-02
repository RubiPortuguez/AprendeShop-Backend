package org.aprende_shop.aprende_shop.service;

import java.util.ArrayList;

import org.aprende_shop.aprende_shop.model.Resena;
import org.springframework.stereotype.Service;

@Service
public class ResenaService {
	private final ArrayList<Resena> resenaUsuario = 
			new ArrayList<Resena>();
	
	public ArrayList<Resena> getResena() {
        return resenaUsuario;
    }
	
	//GET
	public Resena getResena(Long idResena) {
		for(Resena res:resenaUsuario) {
			if(res.getIdResena()==idResena) {
				return res;
			}
		}
		return null;
	}
	
	//DELETE
	public Resena deleteResena(Long idResena) {
		for(Resena res:resenaUsuario) {
			if(res.getIdResena()==idResena) {
				resenaUsuario.remove(res);
				return res;
			}
		}
		return null;
	}
	
	//POST
	public Resena addResena(Resena res) {
		resenaUsuario.add(res);
		return res;
	}
	
	//PUT
	public Resena updateResena(Long idResena, Long fk_idCurso, Long fk_idUsuario, Long calificacion, String comentarios) {
		for(Resena res:resenaUsuario) {
			if(res.getIdResena()==idResena) {
				if(fk_idCurso!=null) res.setFk_idCurso(fk_idCurso);
				if(fk_idUsuario!=null) res.setFk_idUsuario(fk_idUsuario);
				if(calificacion!=null) res.setCalificacion(calificacion);
				if(comentarios!=null) res.setComentarios(comentarios);
				return res;
			}
		}
		return null;
	}
}
