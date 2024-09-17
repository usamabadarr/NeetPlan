import { Model, DataTypes } from "sequelize";
// define event model and export
export class Event extends Model {
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
    });
    return Event;
}
