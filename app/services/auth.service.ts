import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { options } from '../auth.options';

declare var Auth0Lock: any;

@Injectable()

export class Auth {
    //configure Auth0Lock
    lock = new Auth0Lock('MFVP14uyAS0L67mCZGvRjAG5OYFovxxW', 'mike-the-frontend-developer.au.auth0.com', options);

    constructor() {
         // Add callback for lock `authenticated` event
        this.lock.on("authenticated", (authResult:any) => {
            this.lock.getProfile(authResult.idToken, function(error:any, profile:any){
                if(error){
                    throw new Error(error);
                }

                //set profile
                localStorage.setItem('profile', JSON.stringify(profile));

                //set token 
                localStorage.setItem('id_token', authResult.idToken);

            })
        });
    }

    public login() {
        // Call the show method to display the widget.
        this.lock.show();
    }


    public authenticated(){
        return tokenNotExpired();
    }

    public logout() {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
    }


}