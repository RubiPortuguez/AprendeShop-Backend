package org.aprende_shop.aprende_shop.service;

import java.util.List;
import java.util.Optional;

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

    public List<CompraUsuario> getComprasPorUsuario(Integer fkIdUsuario) {
        return repo.findByFkIdUsuario(fkIdUsuario);
    }

    public List<CompraUsuario> getComprasPorCurso(Integer fkIdCurso) {
        return repo.findByFkIdCurso(fkIdCurso);
    }

    // CREATE
    @Transactional
    public CompraUsuario addCompra(CompraUsuario compra) {
        // idCompra se genera automáticamente por la BD
        return repo.save(compra);
    }

    // UPDATE
    @Transactional
    public CompraUsuario updateCompra(Integer id, CompraUsuario nueva) {
        Optional<CompraUsuario> opt = repo.findById(id);
        if (opt.isEmpty()) return null;

        CompraUsuario existente = opt.get();
        existente.setFkIdCurso(nueva.getFkIdUsuario());
        existente.setFkIdCurso(nueva.getFkIdCurso());
        return repo.save(existente);
    }

    // DELETE
    @Transactional
    public boolean deleteCompra(Integer id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}


