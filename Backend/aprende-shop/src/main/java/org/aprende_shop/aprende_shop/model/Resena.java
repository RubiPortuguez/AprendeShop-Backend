package org.aprende_shop.aprende_shop.model;

public class Resena {
	private Long idResena;
	private Long fk_idCurso;
	private Long fk_idUsuario;
	private Long calificacion;
	private String comentarios;
	
	private static long total=0;
	
	//Constructor
	public Resena(Long fk_idCurso, Long fk_idUsuario, Long calificacion, String comentarios) {
		super();
		this.fk_idCurso = fk_idCurso;
		this.fk_idUsuario = fk_idUsuario;
		this.calificacion = calificacion;
		this.comentarios = comentarios;
		total++;
		this.idResena = Resena.total;
	}
	
	//Constructor vacio
	public Resena() {
		Resena.total++;
		this.idResena = Resena.total;
	}
	
	//Get & Set
	public Long getCalificacion() {
		return calificacion;
	}
	public void setCalificacion(Long calificacion) {
		this.calificacion = calificacion;
	}
	
	public String getComentarios() {
		return comentarios;
	}
	public void setComentarios(String comentarios) {
		this.comentarios = comentarios;
	}
	
	public Long getIdResena() {
		return idResena;
	}

	public Long getFk_idCurso() {
		return fk_idCurso;
	}
	public void setFk_idCurso(Long fk_idCurso) {
		this.fk_idCurso = fk_idCurso;
	}

	public Long getFk_idUsuario() {
		return fk_idUsuario;
	}
	public void setFk_idUsuario(Long fk_idUsuario) {
		this.fk_idUsuario = fk_idUsuario;
	}
	
	//toString
	@Override
	public String toString() {
		return "Resena [id=" + idResena + ", fk_idCurso=" + fk_idCurso + ", fk_idUsuario=" + fk_idUsuario + ", calificacion="
				+ calificacion + ", comentarios=" + comentarios + "]";
	}
	
}
