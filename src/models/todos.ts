import {
    Optional,
} from 'sequelize';
import {
    Table,
    DataType,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import User from './users';

interface TodoAttributes {
    id: number;
    title: string;
    description?: string;
    user_id: string;
    status: number
}
interface todoCreationAttributes extends Optional<TodoAttributes, 'id' | 'status'> { }

@Table({
    timestamps: true,
    tableName: 'todos',
    modelName: 'Todo',
})
export default class Todo extends Model<TodoAttributes, todoCreationAttributes> {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare title: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare description: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    })
    declare status: number;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: false })
    declare user_id: string;

    @BelongsTo(() => User)
    declare user: User;
}
