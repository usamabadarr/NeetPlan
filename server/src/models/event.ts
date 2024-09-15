import { Model, InferAttributes, InferCreationAttributes, Sequelize, ForeignKey, DataTypes, CreationOptional } from "sequelize";
import type { User } from './user.ts'

// define event model and export

export class Event extends Model<
    InferAttributes<Event>, 
    InferCreationAttributes<Event>> 
{
    declare id: CreationOptional<number>;
    declare name: string;
    declare date: string;
    declare time: string;
    declare notes: string;
    declare userID: ForeignKey<User['id']>

}


export function EventFactory(sequelize: Sequelize) {
    Event.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            date: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            time: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            notes: {
                type: DataTypes.STRING,
                allowNull: true,
            }
        },
        {
            sequelize: sequelize,
            timestamps: false,
            tableName: 'event',
        }

    )
    return Event
}