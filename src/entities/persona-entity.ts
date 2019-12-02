import { VentaEntity } from './venta-entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from "typeorm";

@Entity("persona")
export class PersonaEntity {

    @PrimaryGeneratedColumn({ name: "Id", type: "smallint" })
    id: number;
    
    @Index({ unique: true })
    @Column({ name: "NumeroDocumento", length: 11 })
    numeroDocumento: string;

    @Column({ name: "Nombre", length: 200 })
    nombre: string;

    @Column({ name: "Apellidos", length: 300 })
    apellidos: string;

    @Column({ name: "NombreCompleto", length: 800 })
    nombreCompleto: string;

    @Column({ name: "direccion", length: 500, nullable: true })
    direccion: string;

    @Column({ name: "NumeroCelular", type: "decimal", precision: 9, nullable: true })
    numeroCelular: number;

    // @ManyToOne(type => UsuarioEntity, usuario => usuario.personas_crea, { nullable: false })
    // @JoinColumn({ name: "UsuarioCreacionId" })
    // usuario_crea: UsuarioEntity;

    // @ManyToOne(type => UsuarioEntity, usuario => usuario.personas_modifica, { nullable: true })
    // @JoinColumn({ name: "UsuarioModificacionId" })
    // usuario_modifica: UsuarioEntity;

    @Column({ name: "FechaCreacion", nullable: false })
    fechaCreacion: Date;

    @Column({ name: "FechaModificacion", nullable: true })
    fechaModificacion: Date;

    @OneToMany(type => VentaEntity, ventas => ventas.persona)
    ventas: VentaEntity[];
}