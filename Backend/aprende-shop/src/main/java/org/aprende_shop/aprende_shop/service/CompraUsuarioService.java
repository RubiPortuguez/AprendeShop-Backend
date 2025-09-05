package org.aprende_shop.aprende_shop.service;

import java.util.List;

import javax.transaction.Transactional;

import org.aprende_shop.aprende_shop.model.CompraUsuario;
import org.aprende_shop.aprende_shop.repository.CompraUsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class CompraUsuarioService {

    private final CompraUsuarioRepository repo;

    public CompraUsuarioService(CompraUsuarioRepository repo) {
        this.repo = repo;
    }

    // READ
    public List<CompraUsuario> getCompras() {
        return repo.findAll();
    }

    public CompraUsuario getCompra(Integer id) {
        return repo.findById(id).orElse(null);
    }

    // CREATE
    public CompraUsuario addCompra(CompraUsuario compra) {
        // idCompra se genera automáticamente por la BD
        return repo.save(compra);
    }

    // UPDATE
    @Transactional
    public CompraUsuario updateCompra(Integer id, Integer fk_idCurso,Integer fk_idUsuario) {
		CompraUsuario comUsu= null;
		if(repo.existsById(id)) {
			CompraUsuario compra= repo.findById(id).get();
				if(fk_idCurso!=null) compra.setFkIdCurso(fk_idCurso);
				if(fk_idUsuario!=null) compra.setFkIdUsuario(fk_idUsuario);
				repo.save(compra);
				comUsu = compra;
			}
			return comUsu;
	}

    // DELETE
    public boolean deleteCompra(Integer id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}


