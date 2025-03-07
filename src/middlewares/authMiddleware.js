import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
    const authHeader = req.header("Authorization"); // Get the full "Bearer <token>"

    if (!authHeader) {
        return res.status(401).json({ error: "Access Denied" });
    }

    // console.log("Authorization Header:", authHeader);

    // Ensure token starts with "Bearer " and extract only the token
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({ error: "Invalid token format" });
    }

    const token = tokenParts[1]; // Extract only the token

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user data to the request
        next();
    } catch (err) {
        return res.status(400).json({ error: "Invalid Token" });
    }
}
