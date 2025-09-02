package org.aprende_shop.aprende_shop.model;

public class CompraUsuario {
	private int fk_idUsuario;
	private int fk_idCurso;
	private int idCompra;
	
	private static long total=0;
	
	//constructor vacio
    public CompraUsuario() {
    	CompraUsuario.total++;
		this.idCompra= (int) CompraUsuario.total;
    }

    //constructor sin id
    public CompraUsuario(int fk_idUsuario, int fk_idCurso) {
		super();
		this.fk_idUsuario = fk_idUsuario;
		this.fk_idCurso = fk_idCurso;
		CompraUsuario.total++;
		this.idCompra= (int) CompraUsuario.total;
	}


    public Integer getIdCompra() {
        return idCompra;
    }

    public Integer getFk_idUsuario() {
        return fk_idUsuario;
    }

    public void setFk_idUsuario(Integer fk_idUsuario) {
        this.fk_idUsuario = fk_idUsuario;
    }

    public Integer getFk_idCurso() {
        return fk_idCurso;
    }

    public void setFk_idCurso(Integer fk_idCurso) {
        this.fk_idCurso = fk_idCurso;
    }

	@Override
	public String toString() {
		return "CompraUsuario [fk_idUsuario=" + fk_idUsuario + ", fk_idCurso=" + fk_idCurso + ", idCompra=" + idCompra
				+ "]";
	}
    
}