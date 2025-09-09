package org.aprende_shop.aprende_shop.controller;
import java.util.List;

import org.aprende_shop.aprende_shop.model.Usuario;
import org.aprende_shop.aprende_shop.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/api/usuarios/")
public class UsuarioController {

	private final UsuarioService service;
	
	@Autowired
	public UsuarioController(UsuarioService service) {
		this.service = service;
	}//constructor
	
	//GET
	@GetMapping (path="{userId}")
	public Usuario getUsuario(@PathVariable("userId") Integer id) {
		return service.getUser(id);
	}
	
	@GetMapping
	public List<Usuario> getUsuarios() {
		return service.getUsers();
	}
	
	
	//DELETE
	@DeleteMapping (path="{userId}")
	public Usuario deleteUsuario(@PathVariable("userId") Integer id) {
		return service.deleteUser(id);
	}
	
	//POST
	@PostMapping
	public Usuario addUsuario(@RequestBody Usuario usuario) {
		return service.addUser(usuario);	
	}
	
	//PUT 
	@PutMapping (path="{userId}")
	public Usuario updateUsuario(@PathVariable("userId") Integer id,
			@RequestParam(required=false) String nombre,
			@RequestParam(required=false) String email,
			@RequestParam(required=false) String telefono,
			@RequestParam(required=false) String password,
			@RequestParam(required=false) String tipoUsuario,
			@RequestParam(required=false) Byte estado) {
		return service.updateUser(id, nombre, email, telefono, password, tipoUsuario, estado);
	}
}
