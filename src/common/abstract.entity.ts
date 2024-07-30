import { PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export abstract class AbstractEntity {
    @PrimaryGeneratedColumn('increment')
    id: string;
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date = new Date();
    @CreateDateColumn({ type: 'timestamp' })
    updatedAt: Date = new Date();
}
