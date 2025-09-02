package org.aprende_shop.aprende_shop.service;

import java.util.ArrayList;
import java.util.List;

import org.aprende_shop.aprende_shop.model.CompraUsuario;
import org.springframework.stereotype.Service;

@Service
public class CompraUsuarioService {

    // Lista que simula la BD
    private final List<CompraUsuario> compras = new ArrayList<>();

    // GET: todas las compras
    //compras → es un ArrayList en memoria que guarda las compras creadas.
    //getCompras → devuelve todas.
    public List<CompraUsuario> getCompras() {
        return compras;
    }

    // GET: por id
    //getCompra(id) → busca por id.
    public CompraUsuario getCompra(Integer id) {
        return compras.stream()
                .filter(c -> c.getIdCompra().equals(id))
                .findFirst()
                .orElse(null);
    }

    // POST: agregar
    //addCompra → agrega la nueva compra a la lista.
    public CompraUsuario addCompra(CompraUsuario compra) {
        compras.add(compra);
        return compra;
    }

    // PUT: actualizar
   //updateCompra → busca la compra por id y actualiza sus datos.
    public CompraUsuario updateCompra(Integer id, CompraUsuario nuevaCompra) {
        CompraUsuario existente = getCompra(id);
        if (existente != null) {
            existente.setFk_idUsuario(nuevaCompra.getFk_idUsuario());
            existente.setFk_idCurso(nuevaCompra.getFk_idCurso());
            return existente;
        }
        return null;
    }

    // DELETE
    //deleteCompra → elimina por id.
    public void deleteCompra(Integer id) {
        compras.removeIf(c -> c.getIdCompra().equals(id));
    }
}


