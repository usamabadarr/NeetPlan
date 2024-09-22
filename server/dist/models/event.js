import { Model, DataTypes } from "sequelize";
// define event model and export
export class Event extends Model {
    formatDate(date) {
        try {
            const dateArray = date.split('/');
            const newDate = (`${parseInt(dateArray[0])}/${parseInt(dateArray[1])}/${parseInt(dateArray[2])}`);
            this.date = newDate;
        }
        catch (error) {
            this.date = date;
        }
    }
}
export function EventFactory(sequelize) {
    Event.init({
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
    }, {
        sequelize: sequelize,
        timestamps: false,
        tableName: 'event',
        hooks: {
            beforeCreate: (newEvent) => {
                newEvent.formatDate(newEvent.date);
            },
            beforeUpdate: (updatedEvent) => {
                updatedEvent.formatDate(updatedEvent.date);
            }
        }
    });
    return Event;
}
