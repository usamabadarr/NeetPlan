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

    formatDate(date: string) {
        try {
            const dateArray = date.split('/')
            const newDate = (`${parseInt(dateArray[0])}/${parseInt(dateArray[1])}/${parseInt(dateArray[2])}`)
            this.date = newDate
        } catch (error) {this.date = date}
    }

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
            hooks: {
                beforeCreate: (newEvent: Event) => {
                    newEvent.formatDate(newEvent.date)
                },
                beforeUpdate: (updatedEvent: Event) => {
                    updatedEvent.formatDate(updatedEvent.date)
                }
            }
        }
    )
    return Event
}