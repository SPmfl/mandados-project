
const verifyAdmin = (req, res, next) => {
    try {
        const role = req.user;

        if (role === 'admin') {
            next();
            return;
        };
        res.status(403).json({ msg: "requires admin role" });
    } catch (error) {
        console.error(error);
    }
}

const verifyOperator = (req, res, next) => {
    try {
        const role = req.user;

        if (role === 'admin' || role === 'operator') {
            next();
            return;
        };
        res.status(403).json({ msg: "requires admin or operator role" });
    } catch (error) {
        console.error(error);
    }
}

const verifyRol = {
    verifyAdmin,
    verifyOperator
}

export default verifyRol;

