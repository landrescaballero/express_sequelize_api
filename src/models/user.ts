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
} from 'sequelize-typescript';

interface UserAttributes {
    id: number;
    username: string;
    password: string;
}
interface userCreationAttributes extends Optional<UserAttributes, 'id'> { }

@Table({
    timestamps: true,
    tableName: 'users',
    modelName: 'User',
})
export default class User extends Model<UserAttributes, userCreationAttributes> {
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
    declare username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare password: string;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}
