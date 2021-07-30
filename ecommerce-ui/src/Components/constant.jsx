



export const localHost = "http://localhost:8000";
export const  api = "/api";
export const endPoint = `${localHost}${api}`;
export const productList = `${endPoint}/product`;
export const ProductDetail = id => `${endPoint}/product/${id}`;