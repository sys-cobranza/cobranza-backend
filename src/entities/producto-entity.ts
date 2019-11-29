import { UsuarioEntity } from './usuario-entity';
import { VentaEntity } from './venta-entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";

@Entity("producto")
export class ProductoEntity {

    @PrimaryGeneratedColumn({ name: "Id", type: "smallint" })
    id: number;

    @Column({ name: "Denominacion", length: 500 })
    denominacion: string;

    @Column({ name: "Categoria", length: 100 })
    categoria: string;

    @Column({ name: "Precio", type: "decimal", precision: 8, scale: 2, nullable: true })
    precio: number;

    @OneToMany(type => VentaEntity, ventas => ventas.producto, { nullable: true })
    ventas: VentaEntity[];

    @ManyToOne(type => UsuarioEntity, usuario => usuario.productos_crea, { nullable: false })
    @JoinColumn({ name: "UsuarioCreacionId" })
    usuario_crea: UsuarioEntity;

    @ManyToOne(type => UsuarioEntity, usuario => usuario.productos_modifica, { nullable: true })
    @JoinColumn({ name: "UsuarioModificacionId" })
    usuario_modifica: UsuarioEntity;

    @Column({ name: "FechaCreacion", nullable: false })
    fechaCreacion: Date;

    @Column({ name: "FechaModificacion", nullable: true })
    fechaModificacion: Date;
}