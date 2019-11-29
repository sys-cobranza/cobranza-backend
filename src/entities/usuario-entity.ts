import { PersonaEntity } from './persona-entity';
import { ProductoEntity } from './producto-entity';
import { VentaDetalleEntity } from './venta-detalle';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne } from "typeorm";
import { VentaEntity } from "./venta-entity";

@Entity("usuario")
export class UsuarioEntity {

    @PrimaryGeneratedColumn({ name: "Id", type: "smallint" })
    id: number;

    @Column({ name: "UserName", length: 100 })
    userName: string;

    @Column({ name: "Password" })
    password: string;

    @Column({ name: "Estado", type: "tinyint" })
    estado: boolean;

    @OneToOne(type => PersonaEntity, { nullable: false })
    @JoinColumn({ name: "PersonaId" })
    persona: PersonaEntity;

    @OneToMany(type => VentaEntity, ventas => ventas.usuario_crea)
    ventas_crea: VentaEntity[];

    @OneToMany(type => VentaEntity, ventas => ventas.usuario_modifica)
    ventas_modifica: VentaEntity[];

    @OneToMany(type => VentaDetalleEntity, ventas_detalle => ventas_detalle.usuario_crea)
    detalles_crea: VentaDetalleEntity[];

    @OneToMany(type => VentaDetalleEntity, ventas_detalle => ventas_detalle.usuario_modifica)
    detalles_modifica: VentaDetalleEntity[];

    @OneToMany(type => ProductoEntity, productos => productos.usuario_crea)
    productos_crea: ProductoEntity[];

    @OneToMany(type => ProductoEntity, productos => productos.usuario_modifica)
    productos_modifica: ProductoEntity[];

    // @OneToMany(type => PersonaEntity, personas => personas.usuario_crea)
    // personas_crea: PersonaEntity[];

    // @OneToMany(type => PersonaEntity, personas => personas.usuario_modifica)
    // personas_modifica: PersonaEntity[];

}