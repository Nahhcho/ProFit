import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../contextProvider';
import 'tachyons'
import { jwtDecode } from 'jwt-decode';

const Register = () => {
    const navigate = useNavigate();
    const [session, setSession] = useContext(Context);
    const [user, setUser] = useState({
        email: '',
        password: '',
        cpassword: '',
        name: '',
        username: '',
    })

    const register = (e) => {
        e.preventDefault()
        if(user.cpassword !== user.password) {
            return alert('passwords dont match')
        }
        if(user.email == null) {
            return alert('empty fields')
        }

        fetch(`${session.API_URL}/register`, {
            method: 'POST',
            body: JSON.stringify({
                password: user.password,
                email: user.email,
                username: user.username,
                name: user.name
            })
        })
        .then(response => response.json())
        .then(data => {
            setSession({
                ...session, 
                authTokens: data,
                user: jwtDecode(JSON.stringify(data)).user
            })
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/workouts')
        })
    }


    return (
        <>
        <article class="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main class="pa4 white-80">
                <form class="measure">
                    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                        <legend class="f2 fw6 ph0 mh0">Register</legend>
                            <div class="mt3">
                                <label class="db fw6 lh-copy f6" for="email-address">Email</label>
                                <input onChange={(e) => {setUser({...user, email: e.target.value})}} value={user.email} class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                            </div>
                            <div class="mv3">
                                <label class="db fw6 lh-copy f6" for="username">Username</label>
                                    <input onChange={(e) => {setUser({...user, username: e.target.value})}} value={user.username} class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
                            </div>
                            <div class="mv3">
                                <label class="db fw6 lh-copy f6" for="name">Name</label>
                                    <input onChange={(e) => {setUser({...user, name: e.target.value})}} value={user.name} class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
                            </div>
                            <div class="mv3">
                                <label class="db fw6 lh-copy f6" for="password">Password</label>
                                    <input onChange={(e) => {setUser({...user, password: e.target.value})}} value={user.password} class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                            </div>
                            <div class="mv3">
                                <label class="db fw6 lh-copy f6" for="password">C-Password</label>
                                    <input onChange={(e) => {setUser({...user, cpassword: e.target.value})}} value={user.cpassword} class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                            </div>
                    </fieldset>
                    <div class="">
                        <input class="b ph3 pv2 white input-reset ba b-- bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={(e) => register(e)} />
                    </div>
                    <div class="lh-copy mt3">
                        <a href="" class="f6 link dim white db">Already registered?</a>
                    </div>
                </form>
            </main>
        </article>
        </>
    )
}

export default Register