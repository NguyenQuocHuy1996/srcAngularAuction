import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server = 'https://5a572260751d4e001277964d.mockapi.io/';
    public ApiUrl = 'act/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}
