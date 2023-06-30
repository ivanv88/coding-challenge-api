import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class JobAd {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @Column({ unique: true })
  @Index({ unique: true })
  title: string;

  @Column()
  status: 'draft' | 'published' | 'archived';

  @Column('simple-array')
  skills: string[];
}
