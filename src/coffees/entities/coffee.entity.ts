import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable() //helps in specifying the OWNER side.
  @ManyToMany((type) => Flavor, (x) => x.coffees, {
    cascade: true, //['insert']
  })
  flavors: Flavor[];
}
