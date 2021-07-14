export default (db, types) => {
	return db.define('company', {
            id: {
                type: types.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: types.STRING(30),
                allowNull: false
            },
            logo: {
                type: types.STRING(255),
                allowNull: false
            },
            phone01: {
                type: types.STRING(15),
                allowNull: false,
            },
            phone02: {
                type: types.STRING(15),
                allowNull: false
            },
            email: {
                type: types.STRING(50),
                allowNull: false,
                validate: {isEmail: true}
            },
            url_site: {
                type: types.STRING(255),
                allowNull: false
            },
            address: {
                type: types.STRING(50),
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
            activation: {
                type: types.STRING(6),
                allowNull: false
            },
        },{
            timestamps: true,
            indexes: [
                {unique: true, fields: ['phone01'] },
                {unique: true, fields: ['name'] },
            ]
        }
    );
};