export const isUserAuthenticated = (req, res, next) => {
    let {isAuth, user} = req

    if (!isAuth) {
        return res.status(401).json({
            status: 401,
            message: 'You must be the authenticated user to get this information'
        })
        
    }
    next();
}