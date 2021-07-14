import { Company } from '../../models';

export const resolvers = {
    Query: {
        company:        async (obj, args, context, info) => Company.findByPk(args.id),
        allCompany:     async (obj, args, context, info) => Company.findAll(),
    },

    Mutation: {

        createCompany: async (obj, args, context, info) =>   await Company.create({
            name: args.name,
            logo: args.logo,
            phone01: args.phone01,
            phone02: args.phone02,
            email: args.email,
            url_site: args.url_site,
            address: args.address,
            activation: args.activation
        }),

        updateCompany: async (obj, args, context, info) => {
            try {
                const id = args.id || null;
                delete args.id;

                let company = await Company.update(args, { where: { id: id } })

                return {
                    status: company[0] === 1 ? true : false
                }

            } catch (error) {
                throw new ApolloError(error.message)
            }
        },

        deleteCompany: async (obj, args, context, info) => {
            try {
                const id = args.id || null;

                let result = await Company.destroy({ where: { id: id } })

                return {
                    status: result === 1 ? true : false
                }
                
            } catch (error) {
                throw new ApolloError(error.message)
            }
        }
    }
}
