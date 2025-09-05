package org.aprende_shop.aprende_shop.controller;

import java.util.List;

import org.aprende_shop.aprende_shop.model.CompraUsuario;
import org.aprende_shop.aprende_shop.service.CompraUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/api/compras/") // http://localhost:8080/api/compras/
public class CompraUsuarioController {

    private final CompraUsuarioService service;

    @Autowired
    public CompraUsuarioController(CompraUsuarioService service) {
        this.service = service;
    }

    // GET: todas
    @GetMapping
    public List<CompraUsuario> getCompras() {
        return service.getCompras();
    }

    // GET: por id
    @GetMapping(path="{idCompra}")
    public CompraUsuario getCompra(@PathVariable("idCompra") Integer id) {
        return service.getCompra(id);
    }

    // POST: agregar
    @PostMapping
    public CompraUsuario addCompra(@RequestBody CompraUsuario compra) {
        return service.addCompra(compra);
    }

    // PUT: actualizar
    @PutMapping(path="{idCompra}")
    public CompraUsuario updateCompra(@PathVariable("idCompra") Integer id,
    		@RequestParam(required=false) Integer fk_idCurso,
			@RequestParam(required=false) Integer fk_idUsuario) {
        return service.updateCompra(id, fk_idCurso,fk_idUsuario);
    }

    // DELETE
    @DeleteMapping(path="{idCompra}")
    public void deleteCompra(@PathVariable("idCompra") Integer id) {
        service.deleteCompra(id);
    }
}
