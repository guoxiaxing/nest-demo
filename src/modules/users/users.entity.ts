import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PhotoEntity } from '../photo/photo.entity';

// 要把一个对象作为一个实体，首先需要使用 Entity 装饰器，name 为数据表的名称
@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number; // 主键

  @Column({ length: 20 })
  name: string;

  @Column('varchar')
  password: string;

  @Column()
  status: boolean;

  // 一对多的关系，一个用户可以又多个图片
  @OneToMany(() => PhotoEntity, (photo) => photo.user)
  photos: [];
}
