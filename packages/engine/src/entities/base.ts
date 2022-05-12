import {
  Entity, 
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

abstract class Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
  updated: Date;

  @Column({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
  created: Date;

}

export default Model;