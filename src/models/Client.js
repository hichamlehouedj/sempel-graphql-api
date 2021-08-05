export default (db, types) => {
	return db.define('client', {
        id: {
            type: types.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
    },{
        timestamps: true,
        createdAt: false,
        updatedAt: false
    });
};