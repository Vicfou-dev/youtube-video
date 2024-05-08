export interface ProxyOptions {
    url: string, 
    headers: {} 
}

export default class Proxy {
    protected isProxyTested: boolean = false;
    protected _isProxyAvailable: boolean = false;
    protected proxyHeaders: {} = {};
    protected proxyUrl: string = "";

    protected async isProxyAvailable () {
        if(this.isProxyTested == false) {
            try {
                await fetch(this.proxyUrl);
                this._isProxyAvailable = true;
            } finally {
                this.isProxyTested = true;
            }
        } 
        return this._isProxyAvailable;
    }
    
    public setProxy (options : ProxyOptions) {
        this.proxyUrl = options.url;
        this.proxyHeaders = options.headers ?? {};
        if(!this.proxyHeaders['X-Requested-With']) this.proxyHeaders['X-Requested-With'] = 'XMLHttpRequest';
        this.isProxyTested = false;
    }
    
    public async fetchThroughtProxy (url: string, option: any, isProxy = false) {
        if(isProxy && await this.isProxyAvailable()){
            url = `${this.proxyUrl}${url}`
            if(option.headers === undefined) option.headers = {};
            option.headers = { ...option.headers, ...this.proxyHeaders };
        }

        return fetch(url, option);
    }
}