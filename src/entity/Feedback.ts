import { Column, Entity, ManyToOne } from "typeorm"
import { BaseEntity } from "./core/BaseEntity"
import { User } from "./User"

@Entity()
export class Feedback extends BaseEntity {
  @Column()
  title: string

  @Column()
  content: string

  @ManyToOne((type) => User, (user) => user.feedbacks)
  user: User
}
