export default (db, types) => {
	return db.define('factor', {
        id: {
            type: types.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        department: {
            type: types.STRING(30),
            allowNull: false
        }
    },{
        timestamps: true,
        createdAt: false,
        updatedAt: false
    });
};