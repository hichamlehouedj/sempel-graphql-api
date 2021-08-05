export default (db, types) => {
	return db.define('box', {
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
        name_recipient: {
            type: types.STRING(50),
            allowNull: false,
        },
        phon1_recipient: {
            type: types.STRING(20),
            allowNull: false,
        },
        phon2_recipient: {
            type: types.STRING(20),
            allowNull: false,
        },
        place_delivery: {
            type: types.STRING(255),
            allowNull: false
        },
        price: {
            type: types.STRING(20),
            allowNull: false
        },
        code_order: {
            type: types.STRING(20),
            allowNull: false
        },
        number_Receipt: {
            type: types.STRING(20),
            allowNull: false
        },
        createdAt: {
            type: types.DATE,
            allowNull: false
        },
        updatedAt: {
            type: types.DATE,
            allowNull: false
        },
        note: {
            type: types.STRING(6),
            allowNull: false
        },
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        indexes: [
            {unique: true, fields: ['code_order'] }
        ]
    });
};
