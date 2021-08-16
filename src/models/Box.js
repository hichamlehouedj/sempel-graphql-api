export default (db, types) => {
	return db.define('box', {
        id: {
            type: types.UUID,
            defaultValue: types.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        recipient_name: {
            type: types.STRING(50),
            allowNull: false,
        },
        recipient_phone1: {
            type: types.STRING(50),
            allowNull: false,
        },
        recipient_phone2: {
            type: types.STRING(50),
            allowNull: false,
        },
        recipient_city: {
            type: types.STRING(50),
            allowNull: false,
        },
        recipient_address: {
            type: types.STRING(50),
            allowNull: false,
        },
        code_box: {
            type: types.STRING(50),
            allowNull: false,
        },
        content_box: {
            type: types.STRING(50),
            allowNull: false,
        },
        number_of_pieces_inside_the_box: {
            type: types.INTEGER(11),
            allowNull: false,
        },
        number_box: {
            type: types.STRING(50),
            allowNull: false,
        },
        payment_type: {
            type: types.STRING(50),
            allowNull: false,
        },
        height_box: {
            type: types.STRING(50),
            allowNull: false,
        },
        width_box: {
            type: types.STRING(50),
            allowNull: false,
        },
        weight_box: {
            type: types.STRING(50),
            allowNull: false,
        },
        price_box: {
            type: types.DOUBLE,
            allowNull: false,
        },
        price_delivery: {
            type: types.DOUBLE,
            allowNull: false,
        },
        TVA: {
            type: types.INTEGER(11),
            allowNull: false,
        },
        note: {
            type: types.STRING(50),
            allowNull: false,
        },
        id_stock: {
            type: types.STRING(50),
            allowNull: false
        }
    }, {
        timestamps: true,
        date_create: true,
        date_update: true,
        indexes: [
            {unique: true, fields: ['code_box'] }
        ]
    });
};