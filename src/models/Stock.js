export default (db, types) => {
	return db.define('stock', {
        id: {
            type: types.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: types.DATE,
            allowNull: false
        }
    }, {
        timestamps: true,
        createdAt: true
    });
};