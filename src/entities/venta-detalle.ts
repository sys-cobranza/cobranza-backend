import { PersonaEntity } from './persona-entity';
import { UsuarioEntity } from './usuario-entity';
import { VentaEntity } from './venta-entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity("venta_detalle")
export class VentaDetalleEntity {

    @PrimaryGeneratedColumn({ name: "Id", type: "smallint" })
    id: number;

    @Column({ name: "Fecha", nullable: false })
    fecha: Date;

    @Column({ name: "Descripcion", length: 200, nullable: false })
    descripcion: string;

    @Column({ name: "MontoCobro", type: "decimal", precision: 8, scale: 2, nullable: false })
    montoCobro: number;

    @ManyToOne(type => VentaEntity, venta => venta.venta_detalle)
    @JoinColumn({ name: "VentaId" })
    venta: VentaEntity;

    @ManyToOne(type => PersonaEntity, persona => persona.ventas)
    @JoinColumn({ name: "PersonaId" })
    persona: PersonaEntity;

    @ManyToOne(type => UsuarioEntity, usuario => usuario.detalles_crea, { nullable: false })
    @JoinColumn({ name: "UsuarioCreacionId" })
    usuario_crea: UsuarioEntity;

    @ManyToOne(type => UsuarioEntity, usuario => usuario.detalles_modifica, { nullable: true })
    @JoinColumn({ name: "UsuarioModificacionId" })
    usuario_modifica: UsuarioEntity;

    @Column({ name: "FechaCreacion", nullable: false })
    fechaCreacion: Date;

    @Column({ name: "FechaModificacion", nullable: true })
    fechaModificacion: Date;
}