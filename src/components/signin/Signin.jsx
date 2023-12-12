import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../contextProvider';
import 'tachyons'
import { jwtDecode } from 'jwt-decode';
import Error from '../error/Error'

const Signin = () => {
    const navigate = useNavigate();
    const [session, setSession] = useContext(Context);
    const [error, setError] = useState({
        warn: false,
        error: ''
    })
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const signin = async (e) => {
        e.preventDefault()
        const response = await fetch(`${session.API_URL}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        })
        const data = await response.json()
        if(response.status === 200) {
            setSession({
                ...session, 
                authTokens: data,
                user: jwtDecode(JSON.stringify(data)).user
            })
            localStorage.setItem('authTokens', JSON.stringify(data))
            console.log(data)
            navigate('/')
        }
        else {
            console.log(data)
            setError({ warn: true, message: data.detail})
        }
    }

    return (
        <>
        {
            error.warn ? <Error message={error.message}/> : null
        }
        <article class="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main class="pa4 white-80">
                <form class="measure">
                    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                        <legend class="f2 fw6 ph0 mh0">Sign In</legend>
                            <div class="mt3">
                                <label class="db fw6 lh-copy f6" for="email-address">Username</label>
                                <input onChange={(e) => {setUser({...user, username: e.target.value})}} value={user.username} class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                            </div>
                            <div class="mv3">
                                <label class="db fw6 lh-copy f6" for="password">Password</label>
                                    <input onChange={(e) => {setUser({...user, password: e.target.value})}} value={user.password} class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                            </div>
                    </fieldset>
                    <div class="">
                        <input class="b ph3 pv2 white input-reset ba b-- bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={(e) => signin(e)} />
                    </div>
                    <div class="lh-copy mt3">
                        <a href="/register" class="f6 link dim white db">Register</a>
                    </div>
                </form>
            </main>
        </article>
        </>
    )
}

export default Signin