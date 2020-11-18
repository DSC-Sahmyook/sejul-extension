const REACT_API_HOST = "http://34.64.70.82";

const getUrl = (path: string) => {
    return `${REACT_API_HOST}/${path}`;
};

export default REACT_API_HOST;

export { REACT_API_HOST, getUrl };
