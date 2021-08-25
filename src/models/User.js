export default (db, types) => {
	return db.define('user', {
        id: {
            type: types.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: types.STRING(50),
            allowNull: false,
        },
        password: {
            type: types.STRING(255),
            allowNull: false
        },
        role: {
            type: types.STRING(20),
            allowNull: false
        },
        activation: {
            type: types.STRING(10),
            defaultValue: "desactive",
            allowNull: false
        },
    }, {
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        indexes: [
            {unique: true, fields: ['user_name'] }
        ]
    });
};