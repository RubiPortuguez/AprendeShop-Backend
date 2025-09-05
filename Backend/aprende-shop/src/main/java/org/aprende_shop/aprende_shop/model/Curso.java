package org.aprende_shop.aprende_shop.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

//POJO - Plane Old Java Object
@Entity
@Table(name="curso")

public class Curso {
	@Id 
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="idcurso", unique=true, nullable=false) 
	private Integer idCurso;
	@Column(name="nombrecurso",nullable=false)
	private String nombreCurso;
	@Column(name="descripcioncorta",nullable=false)
	private String descripcionCorta;
	@Column(name="descripciondetallada",nullable=false)
	private String descripcionDetallada;
	@Column(nullable=false)
	private String categoria;
	@Column(name="niveldificultad",nullable=false)
	private String nivelDificultad;
	@Column(name="duraciontotal",nullable=false)
	private Integer duracionTotal;
	@Column(nullable=false)
	private String idioma;
	@Column(nullable=false)
	private Double precio;
	@Column(name="valoracioninicial",nullable=false)
	private Integer valoracionInicial;
	@Column(name="imagenprincipal",nullable=false)
	private String imagenPrincipal;
	@Column(nullable=false)
	private String materiales;
	@Column(name="galeriaadicional",nullable=false)
	private String galeriaAdicional;
	@Column(name="incluyekit",nullable=false)
	private Byte incluyeKit;
	@Column(name="descripcionkit",nullable=true)
	private String descripcionKit;
	@Column(nullable=false)
	private Byte estado;
	
	private static long total = 0;

	public Curso(String nombreCurso, String descripcionCorta, String descripcionDetallada, String categoria,
			String nivelDificultad, Integer duracionTotal, String idioma, Double precio, Integer valoracionInicial,
			String imagenPrincipal, String materiales, String galeriaAdicional, Byte incluyeKit,
			String descripcionKit, Byte estado) {
		super();
		this.nombreCurso = nombreCurso;
		this.descripcionCorta = descripcionCorta;
		this.descripcionDetallada = descripcionDetallada;
		this.categoria = categoria;
		this.nivelDificultad = nivelDificultad;
		this.duracionTotal = duracionTotal;
		this.idioma = idioma;
		this.precio = precio;
		this.valoracionInicial = valoracionInicial;
		this.imagenPrincipal = imagenPrincipal;
		this.materiales = materiales;
		this.galeriaAdicional = galeriaAdicional;
		this.incluyeKit = incluyeKit;
		this.descripcionKit = descripcionKit;
		this.estado = estado;
		
//		Curso.total++;
//		this.idCurso = Curso.total;
	}// constructor 
	
	public Curso() {
//		Curso.total++;
//		this.idCurso = Curso.total;
	} //constructor vacio para el metodo post
	
	public String getNombreCurso() {
		return nombreCurso;
	}

	public Integer getIdCurso() {
		return idCurso;
	}

	public void setNombreCurso(String nombreCurso) {
		this.nombreCurso = nombreCurso;
	}

	public String getDescripcionCorta() {
		return descripcionCorta;
	}

	public void setDescripcionCorta(String descripcionCorta) {
		this.descripcionCorta = descripcionCorta;
	}

	public String getDescripcionDetallada() {
		return descripcionDetallada;
	}

	public void setDescripcionDetallada(String descripcionDetallada) {
		this.descripcionDetallada = descripcionDetallada;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public String getNivelDificultad() {
		return nivelDificultad;
	}

	public void setNivelDificultad(String nivelDificultad) {
		this.nivelDificultad = nivelDificultad;
	}

	public Integer getDuracionTotal() {
		return duracionTotal;
	}

	public void setDuracionTotal(Integer duracionTotal) {
		this.duracionTotal = duracionTotal;
	}

	public String getIdioma() {
		return idioma;
	}

	public void setIdioma(String idioma) {
		this.idioma = idioma;
	}

	public Double getPrecio() {
		return precio;
	}

	public void setPrecio(Double precio) {
		this.precio = precio;
	}

	public Integer getValoracionInicial() {
		return valoracionInicial;
	}

	public void setValoracionInicial(Integer valoracionInicial) {
		this.valoracionInicial = valoracionInicial;
	}

	public String getImagenPrincipal() {
		return imagenPrincipal;
	}

	public void setImagenPrincipal(String imagenPrincipal) {
		this.imagenPrincipal = imagenPrincipal;
	}

	public String getMateriales() {
		return materiales;
	}

	public void setMateriales(String materiales) {
		this.materiales = materiales;
	}

	public String getGaleriaAdicional() {
		return galeriaAdicional;
	}

	public void setGaleriaAdicional(String galeriaAdicional) {
		this.galeriaAdicional = galeriaAdicional;
	}

	public Byte getIncluyeKit() {
		return incluyeKit;
	}

	public void setIncluyeKit(Byte incluyeKit) {
		this.incluyeKit = incluyeKit;
	}

	public String getDescripcionKit() {
		return descripcionKit;
	}

	public void setDescripcionKit(String descripcionKit) {
		this.descripcionKit = descripcionKit;
	}

	public Byte getEstado() {
		return estado;
	}

	public void setEstado(Byte estado) {
		this.estado = estado;
	}

	@Override
	public String toString() {
		return "Curso [idCurso=" + idCurso + ", nombreCurso=" + nombreCurso + ", descripcionCorta=" + descripcionCorta
				+ ", descripcionDetallada=" + descripcionDetallada + ", categoria=" + categoria + ", nivelDificultad="
				+ nivelDificultad + ", duracionTotal=" + duracionTotal + ", idioma=" + idioma + ", precio=" + precio
				+ ", valoracionInicial=" + valoracionInicial + ", imagenPrincipal=" + imagenPrincipal + ", materiales="
				+ materiales + ", galeriaAdicional=" + galeriaAdicional + ", incluyeKit=" + incluyeKit
				+ ", descripcionKit=" + descripcionKit + ", estado=" + estado + "]";
	}	
}
