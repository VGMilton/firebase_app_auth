import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth) { }

  async register({email,password}: { email: string, password: string }){
    try {
      const user=createUserWithEmailAndPassword(this.auth,email,password);
      return user;
    } catch (error) {
      return null;
    }
  }
  async login({email,password}: { email: string, password: string }){
    try {
      const user=await signInWithEmailAndPassword(this.auth,email,password);
      return user;
    } catch (error) {
      return null;
    }
  }

  logout(){
    return signOut(this.auth);
  }
}
