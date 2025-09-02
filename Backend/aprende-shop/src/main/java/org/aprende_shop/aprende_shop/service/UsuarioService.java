package org.aprende_shop.aprende_shop.service;
import java.util.ArrayList;
import org.aprende_shop.aprende_shop.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

	private final ArrayList<Usuario> lista = new ArrayList<Usuario>();
	
	@Autowired
	public UsuarioService() {
		lista.add(new Usuario("Yutnu Hernandez","yutnu@gmail.com","5501234567","","tallerista", (byte)1));
		lista.add(new Usuario("Erika Hernandez","erika@gmail.com","5500123456","","estudiante", (byte)1));
		lista.add(new Usuario("Yumari Diaz","yumari@gmail.com","5500012345","","tallerista", (byte)1));
		lista.add(new Usuario("Yessica Ramirez","yessica@gmail.com","5500001234","","estudiante", (byte)1));
		lista.add(new Usuario("Melisa Lopez","melisa@gmail.com","5500000123","","estudiante", (byte)1));
		lista.add(new Usuario("Rubi Portuguez","rubi@gmail.com","5500000012","","estudiante", (byte)1));
		lista.add(new Usuario("Carolina Ortiz","caro@gmail.com","5500000001","","estudiante", (byte)1));
	}
	
	public Usuario getUser(Integer id) {
		Usuario tmpUsuario = null;
		for (Usuario usuario : lista) {
			if (usuario.getId() == id) {
				tmpUsuario = usuario;
				break;
			}
		}
		return tmpUsuario;
	}//getUser

	public ArrayList<Usuario> getUsers() {
		return lista;
	}//getUsers
	
	public Usuario deleteUser(Integer id) {
		Usuario tmpUsuario= null;
		for (Usuario usuario : lista) {
			if (usuario.getId() == id) {
				tmpUsuario = usuario;
				lista.remove(usuario);
				break;
			}
		}
		return tmpUsuario;
	}//deleteUser

	public Usuario addUser(Usuario usuario) {
		lista.add(usuario);
		return usuario;
	}//addUser

	public Usuario updateUser(Integer id, String nombre, String email, String telefono, String password, String tipoUsuario, Byte estado) {
		Usuario tmpUsuario = null;
		for (Usuario usuario : lista) {
			if (usuario.getId() == id) {
				if (nombre != null) usuario.setNombre(nombre);
				if (email != null) usuario.setEmail(email);
				if (telefono != null) usuario.setTelefono(telefono);
				if (password != null) usuario.setPassword(password);
				if (tipoUsuario != null) usuario.setTipoUsuario(tipoUsuario);
				if (estado != null) usuario.setEstado(estado);
				tmpUsuario = usuario;
				break;
			}
		}
		return tmpUsuario;
	}//updateUser
	
}
