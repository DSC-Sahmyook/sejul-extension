import axios from "axios";
import { IUser, IAPIResponse, IArticle } from "./interfaces";
import { getUrl } from "./tools/host";
import * as LIB from "../lib";

export const fetch = async (): Promise<IArticle[]> => {
    const token = LIB.Token.get();
    const result = await axios({
        method: "GET",
        url: getUrl("api/article"),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return result.data;
};

export const store = async (url: string) => {
    const token = LIB.Token.get();
    const result = await axios({
        method: "POST",
        url: getUrl("api/article"),
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            url: url,
        },
    });
    return result.data;
};

export const remove = async (url: string) => {
    const token = LIB.Token.get();
    const result = await axios({
        method: "DELETE",
        url: getUrl("api/article"),
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            url: url,
        },
    });
    return result.data;
};
