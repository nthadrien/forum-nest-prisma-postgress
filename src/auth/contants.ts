export const jwtConstants = {
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '900s' },
};