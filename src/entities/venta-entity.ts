import { VentaDetalleEntity } from './venta-detalle';
import { ProductoEntity } from './producto-entity';
import { UsuarioEntity } from './usuario-entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { PersonaEntity } from "./persona-entity";

@Entity("venta")
export class VentaEntity {

    @PrimaryGeneratedColumn({ name: "Id", type: "smallint" })
    id: number;

    @Column({ name: "Fecha", nullable: false })
    fecha: Date;

    @Column({ name: "Descripcion", length: 200, nullable: false })
    descripcion: string;

    @Column({ name: "MontoVenta", type: "decimal", precision: 8, scale: 2, nullable: false })
    montoVenta: number;

    @Column({ name: "CuotaDiaria", type: "decimal", precision: 8, scale: 2, nullable: true })
    cuotaDiaria: number;

    @ManyToOne(type => PersonaEntity, persona => persona.ventas)
    @JoinColumn({ name: "PersonaId" })
    persona: PersonaEntity;

    @ManyToOne(type => ProductoEntity, producto => producto.ventas, { nullable: true })
    @JoinColumn({ name: "ProductoId" })
    producto: ProductoEntity;

    @ManyToOne(type => UsuarioEntity, usuario => usuario.ventas_crea, { nullable: false })
    @JoinColumn({ name: "UsuarioCreacionId" })
    usuario_crea: UsuarioEntity;

    @ManyToOne(type => UsuarioEntity, usuario => usuario.ventas_modifica, { nullable: true })
    @JoinColumn({ name: "UsuarioModificacionId" })
    usuario_modifica: UsuarioEntity;

    @Column({ name: "FechaCreacion", nullable: false })
    fechaCreacion: Date;

    @Column({ name: "FechaModificacion", nullable: true })
    fechaModificacion: Date;

    @OneToMany(type => VentaDetalleEntity, venta_detalle => venta_detalle.venta, { cascade: true, nullable: true })
    venta_detalle: VentaDetalleEntity[];
}