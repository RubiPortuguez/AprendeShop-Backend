package org.aprende_shop.aprende_shop.controller;

import java.util.Calendar;
import java.util.Date;

import javax.servlet.ServletException;

import org.aprende_shop.aprende_shop.dto.Token;
import org.aprende_shop.aprende_shop.model.Usuario;
import org.aprende_shop.aprende_shop.service.UsuarioService;
import org.aprende_shop.aprende_shop.config.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping (path = "/api/login" )
public class LoginController {
	
private final UsuarioService service;
	
	@Autowired
	public LoginController(UsuarioService service) {
		this.service = service;
	}//constructor

	@PostMapping
	public Token loginUser(@RequestBody Usuario usuario) throws ServletException {
		if (service.validateUser(usuario)) {
			return new Token(generateToken(usuario.getEmail()));
		}
		throw new ServletException("Nombre de usuario o contraseña incorrectos [" + usuario.getEmail() + "]");
	}
	
	private String generateToken (String email) {
		Calendar calendar = Calendar.getInstance();
	//	calendar.add(calendar.MINUTE, 15);
		calendar.add(calendar.HOUR, 24);
		
		return Jwts.builder().setSubject(email)
				.claim("role", "user")
				.setIssuedAt(new Date())
				.setExpiration(calendar.getTime())
				.signWith(SignatureAlgorithm.HS256, JwtFilter.secret)
				.compact();
		
		
	}
}
