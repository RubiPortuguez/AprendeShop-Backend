package org.aprende_shop.aprende_shop.service;

import java.util.List;
import java.util.Optional;

import org.aprende_shop.aprende_shop.model.Usuario;
import org.aprende_shop.aprende_shop.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

	private final UsuarioRepository repository;
	
	@Autowired
	public UsuarioService (UsuarioRepository repository) {
		this.repository = repository;
	}
	
	public Usuario getUser(Integer id) {
		return repository.findById(id).orElseThrow(()-> new IllegalArgumentException("El producto con el id [ " + id +" ] no existe"));
	}//getUser

	public List<Usuario> getUsers() {
		return repository.findAll();
	}//getUsers
	
	public Usuario deleteUser(Integer id) {
		Usuario tmpUser = null;
		if (repository.existsById(id)) {
			tmpUser = repository.findById(id).get();
			repository.deleteById(id);
		}
		return tmpUser;
	}//deleteUser

	public Usuario addUser(Usuario usuario) {
		Optional<Usuario> tmpUser = repository.findByEmail(usuario.getEmail());
		if (tmpUser.isEmpty()) {
			repository.save(usuario);
		} else {
			usuario = null;
		}
		return usuario;
	}//addUser

	public Usuario updateUser(Integer id, String nombre, String email, String telefono, String password, String tipoUsuario, Byte estado) {
		Usuario tmpUsuario = null;
		if (repository.existsById(id)) {
			Usuario usuario = repository.findById(id).get();
			if (nombre != null) usuario.setNombre(nombre);
			if (email != null) usuario.setEmail(email);
			if (telefono != null) usuario.setTelefono(telefono);
			if (password != null) usuario.setPassword(password);
			if (tipoUsuario != null) usuario.setTipoUsuario(tipoUsuario);
			if (tipoUsuario != null) usuario.setEstado(estado);
			repository.save(usuario);
			tmpUsuario = usuario;
		}
		return tmpUsuario;
	}//updateUser
	
}
