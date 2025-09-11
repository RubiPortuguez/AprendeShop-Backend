package org.aprende_shop.aprende_shop.repository;

import java.util.List;
import java.util.Optional;

import org.aprende_shop.aprende_shop.model.Resena;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ResenaRepository extends JpaRepository<Resena, Integer> {
	List<Resena> findByFkIdCurso(Integer fkIdCurso);
	@Query
	("SELECT r FROM Resena r JOIN FETCH r.usuario WHERE r.fkIdCurso = :idCurso") 
	List<Resena> findByFkIdCursoWithUsuario(@Param("idCurso") Integer idCurso);
}
