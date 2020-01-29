export const getJWTToken = (): string => {
    const token = localStorage.getItem('token');
    return token as string;
}