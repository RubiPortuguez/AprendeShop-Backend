package org.aprende_shop.aprende_shop.repository;

import java.util.Optional;

import org.aprende_shop.aprende_shop.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
	Optional<Usuario> findByEmail(String email);

}
