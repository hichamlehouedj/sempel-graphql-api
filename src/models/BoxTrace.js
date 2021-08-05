export default (db, types) => {
	return db.define('box_trace', {
        id: {
            type: types.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: types.STRING(50),
            allowNull: false,
        },
        type_person: {
            type: types.STRING(20),
            allowNull: false,
        },
        note: {
            type: types.STRING(255),
            allowNull: false
        },
        createdAt: {
            type: types.DATE,
            allowNull: false
        },
        updatedAt: {
            type: types.DATE,
            allowNull: false
        }
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: true
    });
};