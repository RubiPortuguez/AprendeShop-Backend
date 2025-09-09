package org.aprende_shop.aprende_shop.repository;

import java.util.Optional;

import org.aprende_shop.aprende_shop.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Integer> {
	Optional<Curso> findByNombreCurso(String nombreCurso);

}//interface
