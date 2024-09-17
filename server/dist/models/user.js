import { Model, DataTypes } from "sequelize";
import bcrypt from 'bcrypt';
// define user model and export
export class User extends Model {
    async hashPassword(password) {
        this.password = await bcrypt.hash(password, 10);
    }
}
export function UserFactory(sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
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
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        sequelize: sequelize,
        timestamps: false,
        tableName: 'user',
        hooks: {
            beforeCreate: async (newUser) => {
                await newUser.hashPassword(newUser.password);
            },
        }
    });
    return User;
}
