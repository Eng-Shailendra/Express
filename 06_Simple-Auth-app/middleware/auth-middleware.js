export function authMiddleware(req, res, next) {
    try {
        const token = req.headers && req.headers.authorization.split(" ")[1];

        console.log(req.headers);

        if (token) {
            return res.status(400).json({
                success: false,
                message: "Token not found"
            });

        }

        const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decodedTokenInfo);
        req.userInfo = decodedTokenInfo;
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Access denided"
        })

    }
}