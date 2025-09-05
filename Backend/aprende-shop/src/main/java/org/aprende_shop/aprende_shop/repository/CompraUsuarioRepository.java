package org.aprende_shop.aprende_shop.repository;

import java.util.List;

import org.aprende_shop.aprende_shop.model.CompraUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompraUsuarioRepository extends JpaRepository<CompraUsuario, Integer> {
    // Consultas útiles adicionales
    List<CompraUsuario> findByFkIdUsuario(Integer fkIdUsuario);
    List<CompraUsuario> findByFkIdCurso(Integer fkIdCurso);
}
