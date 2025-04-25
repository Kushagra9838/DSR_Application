// dsr.model.ts
import { Column, DataType, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/user/model/user.model';

@Table({ tableName: 'dsrs' })
export class Dsr extends Model<Dsr> {

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  hours: number;

}
