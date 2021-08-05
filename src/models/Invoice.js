export default (db, types) => {
	return db.define('invoice', {
        id: {
            type: types.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        product: {
            type: types.STRING(50),
            allowNull: false
        },
        price: {
            type: types.STRING(10),
            allowNull: false
        },
        payment: {
            type: types.BOOLEAN,
            defaultValue: false
        },
        createdAt: {
            type: types.DATE,
            allowNull: false
        },
        updatedAt: {
            type: types.DATE,
            allowNull: false
        }
    },{
        timestamps: true,
        createdAt: true,
        updatedAt: true
    });
};