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
	private Integer fkIdCurso;
    @Column (name = "fk_idusuario")
	private Integer fkIdUsuario;
	@Column (name = "calificacion")
	private Integer calificacion;
	@Column (name = "comentario")
	private String comentarios;
	@ManyToOne @JoinColumn(name = "fk_idusuario", insertable = false, updatable = false) private Usuario usuario;
	

	//Constructor
	public Resena(Integer fk_idCurso, Integer fk_idUsuario, Integer calificacion, String comentarios) {
		super();
		this.fkIdCurso = fk_idCurso;
		this.fkIdUsuario = fk_idUsuario;
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

	
	public Integer getFkIdCurso() {
		return fkIdCurso;
	}

	public void setFkIdCurso(Integer fkIdCurso) {
		this.fkIdCurso = fkIdCurso;
	}

	public Integer getFkIdUsuario() {
		return fkIdUsuario;
	}

	public void setFkIdUsuario(Integer fkIdUsuario) {
		this.fkIdUsuario = fkIdUsuario;
	}
	public Usuario getUsuario() { 
		return usuario; 
	}

	//toString
	@Override
	public String toString() {
		return "Resena [id=" + idResena + ", fk_idCurso=" + fkIdCurso + ", fk_idUsuario=" + fkIdUsuario + ", calificacion="
				+ calificacion + ", comentarios=" + comentarios + "]";
	}
	
}
