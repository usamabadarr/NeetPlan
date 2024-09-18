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
    declare startTime: string;
    declare endTime: string;
    declare notes: string;
    declare UserId: ForeignKey<User['id']>

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
            startTime: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            endTime: {
                type: DataTypes.STRING,
                allowNull: true,
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