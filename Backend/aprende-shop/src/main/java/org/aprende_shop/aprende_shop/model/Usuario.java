package org.aprende_shop.aprende_shop.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

//POJO: Plain Old Java Object
@Entity
@Table(name="usuario")
public class Usuario {

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="idusuario", unique=true, nullable=false)
	private Integer idUsuario;
	@Column(name="nombre",nullable=false)
	private String nombre;
	@Column(name="correoelectronico",nullable=false)
	private String email;
	@Column(name="telefono",nullable=false)
	private String telefono;
	@Column(name="contrasena",nullable=false)
	private String password;
	@Column(name="tipousuario",nullable=false)
	private String tipoUsuario;
	@Column(name="estado",nullable=false)
	private Byte estado;
		
	public Usuario(String nombre, String email, String telefono, String password, String tipoUsuario, byte estado) {
		//super();
		this.nombre = nombre;
		this.email = email;
		this.telefono = telefono;
		this.password = password;
		this.tipoUsuario = tipoUsuario;
		this.estado = estado;
	}//constructor
	
	public Usuario() {
	}//constructor

	public Integer getId() {
		return idUsuario;
	}//getId

	public void setId(Integer id) {
		this.idUsuario = id;
	}//setId

	public String getNombre() {
		return nombre;
	}//getNombre

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}//setNombre

	public String getEmail() {
		return email;
	}//getEmail

	public void setEmail(String email) {
		this.email = email;
	}//setEmail

	public String getTelefono() {
		return telefono;
	}//getTelefono

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}//setTelefono

	public String getPassword() {
		return password;
	}//getPassword

	public void setPassword(String password) {
		this.password = password;
	}//setPassword

	public String getTipoUsuario() {
		return tipoUsuario;
	}//getTipoUsuario

	public void setTipoUsuario(String tipoUsuario) {
		if (tipoUsuario.equals("ES")) {
			this.tipoUsuario = tipoUsuario;
		} else if (tipoUsuario.equals("TA")) {
			this.tipoUsuario = tipoUsuario;
		}
	}//setTipoUsuario

	public Byte getEstado() {
		return estado;
	}//getEstado

	public void setEstado(Byte estado) {
		this.estado = estado;
	}//setEstado

	@Override
	public String toString() {
		return "Usuario [id=" + idUsuario + ", nombre=" + nombre + ", email=" + email + ", telefono=" + telefono
				+ ", password=" + password + ", tipoUsuario=" + tipoUsuario + ", estado=" + estado + "]";
	}	
	
}//clase usuario
