package org.aprende_shop.aprende_shop.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table (name = "resena")
public class Resena {
	
	@Id
	@GeneratedValue	(strategy = GenerationType.IDENTITY)
	@Column(name = "idresena")
	private Integer idResena;
    @Column (name = "fk_idcurso")
	private Integer fk_idCurso;
    @Column (name = "fk_idusuario")
	private Integer fk_idUsuario;
	@Column (name = "calificacion")
	private Integer calificacion;
	@Column (name = "comentario")
	private String comentarios;
	

	//Constructor
	public Resena(Integer fk_idCurso, Integer fk_idUsuario, Integer calificacion, String comentarios) {
		super();
		this.fk_idCurso = fk_idCurso;
		this.fk_idUsuario = fk_idUsuario;
		this.calificacion = calificacion;
		this.comentarios = comentarios;
	}
	
	//Constructor vacio
	public Resena() {
	}
	
	//Get & Set
	public Integer getCalificacion() {
		return calificacion;
	}
	public void setCalificacion(Integer calificacion) {
		this.calificacion = calificacion;
	}
	
	public String getComentarios() {
		return comentarios;
	}
	public void setComentarios(String comentarios) {
		this.comentarios = comentarios;
	}
	
	public Integer getIdResena() {
		return idResena;
	}

	public Integer getFk_idCurso() {
		return fk_idCurso;
	}
	public void setFk_idCurso(Integer fk_idCurso) {
		this.fk_idCurso = fk_idCurso;
	}

	public Integer getFk_idUsuario() {
		return fk_idUsuario;
	}
	public void setFk_idUsuario(Integer fk_idUsuario) {
		this.fk_idUsuario = fk_idUsuario;
	}
	
	//toString
	@Override
	public String toString() {
		return "Resena [id=" + idResena + ", fk_idCurso=" + fk_idCurso + ", fk_idUsuario=" + fk_idUsuario + ", calificacion="
				+ calificacion + ", comentarios=" + comentarios + "]";
	}
	
}
