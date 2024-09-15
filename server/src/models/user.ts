import { Model, InferAttributes, InferCreationAttributes, Sequelize, DataTypes, CreationOptional } from "sequelize";
import bcrypt from 'bcrypt'

// define user model and export

export class User extends Model<
    InferAttributes<User>, 
    InferCreationAttributes<User>> 
{
    declare id: CreationOptional<number>;
    declare username: string;
    declare email: string;
    declare password: string;

    async hashPassword(password: string) {
        this.password = await bcrypt.hash(password, 10)
    }
}


export function UserFactory(sequelize: Sequelize) {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true

            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize: sequelize,
            timestamps: false,
            tableName: 'user',
            hooks: {
                beforeCreate: async (newUser: User) => {
                    await newUser.hashPassword(newUser.password)
                },
                beforeUpdate: async (updateUser: User) => {
                    await updateUser.hashPassword(updateUser.password)
                },
            }
        }

    )
    return User
}