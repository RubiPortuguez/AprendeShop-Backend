package org.aprende_shop.aprende_shop.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "compraUsuario")
public class CompraUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idcompra")
    private Integer idCompra;

    @Column(name = "fkid_usuario", nullable = false)
    private Integer fkIdUsuario;

    @Column(name = "fkidcurso", nullable = false)
    private Integer fkIdCurso;

    // Constructors
    public CompraUsuario() {}

    public CompraUsuario(Integer fkIdUsuario, Integer fkIdCurso) {
        this.fkIdUsuario = fkIdUsuario;
        this.fkIdCurso = fkIdCurso;
    }

	public Integer getIdCompra() {
		return idCompra;
	}

	public void setIdCompra(Integer idCompra) {
		this.idCompra = idCompra;
	}

	public Integer getFkIdCurso() {
		return fkIdCurso;
	}

	public void setFkIdCurso(Integer fkIdCurso) {
		this.fkIdCurso = fkIdCurso;
	}

	public Integer getFkIdUsuario() {
		return fkIdUsuario;
	}

	@Override
	public String toString() {
		return "CompraUsuario [idCompra=" + idCompra + ", fkIdUsuario=" + fkIdUsuario + ", fkIdCurso=" + fkIdCurso
				+ "]";
	}


  
    
}