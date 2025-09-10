package org.aprende_shop.aprende_shop.service;

import java.util.List;
import java.util.Optional;

import org.aprende_shop.aprende_shop.model.Usuario;
import org.aprende_shop.aprende_shop.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

	private final UsuarioRepository repository;
	
	@Autowired
	private PasswordEncoder encoder;
	
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
			usuario.setPassword(encoder.encode(usuario.getPassword()) );
			return repository.save(usuario);

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
			if (password != null) usuario.setPassword(encoder.encode(password));
			if (tipoUsuario != null) usuario.setTipoUsuario(tipoUsuario);
			if (tipoUsuario != null) usuario.setEstado(estado);
			repository.save(usuario);
			tmpUsuario = usuario;
		}
		return tmpUsuario;
	}//updateUser

	public boolean validateUser(Usuario usuario) {
		Optional<Usuario> user = repository.findByEmail(usuario.getEmail());
		if (user.isPresent()) {
			Usuario tmpUser = user.get();
			if (encoder.matches(usuario.getPassword(), tmpUser.getPassword())) {
				return true;
			}
		}
		
		return false;
	}
	
}
