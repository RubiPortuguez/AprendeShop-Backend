package org.aprende_shop.aprende_shop.service;

import java.util.List;
import java.util.Optional;

import org.aprende_shop.aprende_shop.model.Usuario;
import org.aprende_shop.aprende_shop.repository.UsuarioRepository;
import org.aprende_shop.aprende_shop.dto.ChangePassword;
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
	
	public Usuario getUser(String email) {
		return repository.findByEmail(email).orElseThrow(()-> new IllegalArgumentException("El usuario con el email [ " + email +" ] no existe"));
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

	public Usuario updateUser(Integer id, Usuario usuario) {
		Usuario tmpUsuario = null;
		if (repository.existsById(id)) {
			Usuario usuarioBD = repository.findById(id).get();
			if (usuario.getNombre() != null) usuarioBD.setNombre(usuario.getNombre());
			if (usuario.getEmail() != null) usuarioBD.setEmail(usuario.getEmail());
			if (usuario.getTelefono() != null) usuarioBD.setTelefono(usuario.getTelefono());
			if (usuario.getTipoUsuario() != null) usuarioBD.setTipoUsuario(usuario.getTipoUsuario());
			if (usuario.getEstado() != null) usuarioBD.setEstado(usuario.getEstado());
			repository.save(usuarioBD);
			tmpUsuario = usuarioBD;
		}
		return tmpUsuario;
	}//updateUser
	
	public Usuario updatePassword(Integer id, ChangePassword changePassword) {
		Usuario tmpUser = null;
		if (repository.existsById(id)) {
			tmpUser = repository.findById(id).get();
			if (encoder.matches(changePassword.getPassword(), tmpUser.getPassword())) {
				tmpUser.setPassword(encoder.encode(changePassword.getNpassword()));
				return repository.save(tmpUser);
			}else {
				tmpUser = null;
			}
		}
		return tmpUser;
	}//updatePassword

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
