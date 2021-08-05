export const isUserAdmin = (req, res, next) => {
    let {isAuth, user} = req
    let requiredRole = "ADMIN";

    if (!isAuth || user.dataValues.role.toUpperCase() !== requiredRole) {
        return res.status(401).json({
            status: 401,
            message: `You need following role: ${requiredRole}`
        })
    }
    next();
}