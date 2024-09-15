import { UserFactory } from "./user";
import { EventFactory } from "./event";
import sequelize from "../config/connection";
// define one user to many events relationship and export

const User = UserFactory(sequelize);
const Event = EventFactory(sequelize);

User.hasMany(Event, {
    onDelete: 'CASCADE'
});

Event.belongsTo(User);

export { User, Event}