import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from '../tasks/task.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(
    type => Task,
    task => task.user,
    { eager: true },
  )
  tasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
    const hashPassword = await bcrypt.hash(password, this.salt);
    return hashPassword === this.password;
  }
}
