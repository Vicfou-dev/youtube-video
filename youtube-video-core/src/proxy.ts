export default new class Proxy {
    public isProxyTested: boolean = false;
    public _isProxyAvailable: boolean = false;
    public proxyUrl: string = "";

    public async isProxyAvailable () {
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
    
    public setProxy (url: string)  {
        this.proxyUrl = url;
        this.isProxyTested = false;
    }
    
    public async fetchProxy (url: string, option: any, isProxy = false) {
        if(isProxy && await this.isProxyAvailable()){
            url = `${this.proxyUrl}/${url}`
            if(option.headers === undefined) option.headers = {};
            option.headers['X-Requested-With'] = 'XMLHttpRequest';
        }
        return fetch(url, option);
    }
}