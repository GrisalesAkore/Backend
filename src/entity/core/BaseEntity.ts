import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date

  @DeleteDateColumn()
  deletedAt?: Date

  // @Column({ nullable: true })
  // createdBy: number;

  // @Column({ nullable: true })
  // updatedBy: number;

  // @BeforeInsert()
  // auditOnSave() {
  //   try {
  //     const user = requestContext.getMemberContext();
  //     this.createdBy = user.id;
  //   } catch (error) {
  //     this.createdBy = 0;
  //   }

  // }

  // @BeforeUpdate()
  // auditOnUpdate() {
  //   try {
  //     const user = requestContext.getMemberContext();
  //     this.updatedBy = user.id;
  //   } catch (error) {
  //     this.updatedBy = 0;
  //   }
  // }
}
