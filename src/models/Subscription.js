export default (db, types) => {
	return db.define('subscription', {
        id: {
            type: types.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        payment: {
            type: types.STRING(30),
            allowNull: false
        },
        package: {
            type: types.STRING(30),
            allowNull: false
        },
        start_date: {
            type: types.DATE,
            allowNull: false
        },
        expiry_date: {
            type: types.DATE,
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
    },{
        timestamps: true,
        createdAt: true,
        updatedAt: true
    });
};