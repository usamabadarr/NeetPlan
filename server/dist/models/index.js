import { UserFactory } from "./user.js";
import { EventFactory } from "./event.js";
import sequelize from "../config/connection.js";
// define one user to many events relationship and export
const User = UserFactory(sequelize);
const Event = EventFactory(sequelize);
User.hasMany(Event, {
    onDelete: 'CASCADE'
});
Event.belongsTo(User);
export { User, Event };
