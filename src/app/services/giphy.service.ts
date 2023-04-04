import { environment } from "@/environments/environments";

export interface IGif {
    type: string;
    id: string;
    url: string;
    slug: string;
    bitly_gif_url: string;
    bitly_url: string;
    embed_url: string;
    username: string;
    source: string;
    title: string;
    rating: string;
    content_url: string;
    source_tld: string;
    source_post_url: string;
    is_sticker: number;
    import_datetime: string | Date;
    trending_datetime: string | Date;
    images: {[key: string]: any};
    user: {[key: string]: any};
}

export interface IResponse<T>{
    data: T;
    pagination: {[key: string]: any};
    meta: {[key: string]: any};
}

class GiphyService {
    private readonly baseParams: URLSearchParams;
    private selectedGif!: IGif;

    constructor() {
        this.baseParams = new URLSearchParams();
        this.baseParams.append('api_key', environment.apiKey);
    }

    set selectGif(data: IGif) {
        this.selectedGif = data;
    }

    get selectGif(): IGif {
        return this.selectedGif;
    }

    getSearchGifs(searchValue: string, offset: number = 0, limit: number = 20): Promise<IResponse<Array<IGif>>> {
        const url = `${environment.apiUrl}/search?${this.baseParams}&q=${searchValue}&limit=${limit}&offset=${offset}`;
        return fetch(url).then((res) => res.json());
    }

    getTrendingGifts(offset: number = 0, limit: number = 20): Promise<IResponse<Array<IGif>>> {
        const url = `${environment.apiUrl}/trending?${this.baseParams}&limit=${limit}&offset=${offset}&rating='g'`;

        return fetch(url).then((res) => res.json());
    }

    getRandomGift(tag: string): Promise<IResponse<IGif>> {
        const url = `${environment.apiUrl}/random?${this.baseParams}&tag=${tag}`;

        return fetch(url).then((res) => res.json());
    }
}
export default new GiphyService();
