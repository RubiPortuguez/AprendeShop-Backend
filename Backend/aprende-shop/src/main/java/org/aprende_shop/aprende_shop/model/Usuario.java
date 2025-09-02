package org.aprende_shop.aprende_shop.model;

public class Usuario {

	private Integer id;
	private String nombre;
	private String email;
	private String telefono;
	private String password;
	private String tipoUsuario;
	private Byte estado;
	
	private static int totalUsuarios = 0;
	
	public Usuario(String nombre, String email, String telefono, String password, String tipoUsuario, byte estado) {
		//super();
		this.nombre = nombre;
		this.email = email;
		this.telefono = telefono;
		this.password = password;
		this.tipoUsuario = tipoUsuario;
		
		Usuario.totalUsuarios++;
		this.id = Usuario.totalUsuarios;
		this.estado = estado;
	}//constructor
	
	public Usuario() {
		Usuario.totalUsuarios++;
		this.id = Usuario.totalUsuarios;
	}//constructor

	public Integer getId() {
		return id;
	}//getId

	public void setId(Integer id) {
		this.id = id;
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
		if (tipoUsuario.equals("estudiante")) {
			this.tipoUsuario = tipoUsuario;
		} else if (tipoUsuario.equals("tallerista")) {
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
		return "Usuario [id=" + id + ", nombre=" + nombre + ", email=" + email + ", telefono=" + telefono
				+ ", password=" + password + ", tipoUsuario=" + tipoUsuario + ", estado=" + estado + "]";
	}	
	
}//clase usuario
