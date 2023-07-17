import React, { useEffect, useState } from "react";
import { useRef } from "react"
import Home from "./Home";

const getUsersFromLS = () => {
    const users = localStorage.getItem("users")

    if(users) {
        return JSON.parse(users)
    }
    else {
        return []
    }
}


export default function SignInSignUp() {

    const [users,setUsers] = useState(getUsersFromLS())

    const[username,setUsername] = useState("")
    const[mail,setMail] = useState("")
    const[sifre,setSifre] = useState("")
    const[signed,setSigned] = useState("")

    const name = useRef()
    const email = useRef()
    const password = useRef()
    const localSignUp = localStorage.getItem("signUp")
    const localEmail = localStorage.getItem("email")
    const localName = localStorage.getItem("name")
    const localPassword = localStorage.getItem("password")

    const [showHome,setShowHome] = useState(false)
    const [show,setShow] = useState(false)

    useEffect(() => {
        if(localSignUp) {
            setShowHome(true)
        }
        if(localEmail) {
            setShow(true)
        }
    })

   

    const handleAddContactSubmit = (e) => {
        e.preventDefault()
        let no = users.length + 1
        let user = {
            username: username,
            mail: mail,
            sifre: sifre,
            signed: mail,
            id: no,
        }

        setUsers([...users,user])
        alert("You Signed Up Succesfully!")
        setUsername("")
        setMail("")
        setSifre("")
        setSigned("")
    }

    const handleSigninUserSubmit = (e) => {
        e.preventDefault()

        for (let index = 0; index < users.length; index++) {
            console.log(sifre)
            console.log(mail)
            if(users[index].mail == mail && users[index].sifre == sifre) {
                localStorage.setItem("signUp",mail)
                localStorage.setItem("username",users[index].username)
                window.location.reload()
                //setShowHome(true)
            }
        }

    }

    const changeSign = () => {
        if(show) {
            setShow(false)
        }
        else {
            setShow(true)
        }
    }

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users))

    },[users])

    return (
        <div>
            {showHome?<Home /> : 
            (show ?
                <div className="wrapper">
                        <div className="main">
                            <div className="form-container" id="sign-form">
                                <form id="user-form" className="form-group" autoComplete="off" onSubmit={handleAddContactSubmit}>
                                    <label>Username</label>
                                    <input type="text" className="form-control" required 
                                    onChange={(e) => setUsername(e.target.value)} value={username} />
                                    <br />
                                    <label>Mail</label>
                                    <input type="email" className="form-control" required 
                                    onChange={(e) => setMail(e.target.value)} value={mail}/>
                                    <br />
                                    <label>Password</label>
                                    <input type="password" className="form-control" required 
                                    onChange={(e) => setSifre(e.target.value)} value={sifre}/>
                                    <br />
                                    <button type="submit" className="sign-btns" id="signup-btn">Sign Up</button>
                                    <div>You already have an account?</div>
                                    <button onClick={changeSign} className="sign-btns" id="signin-btn">Sign In</button>
                                </form>
                            </div>
                        </div>
                    </div>
            

                :

                <div className="wrapper">
                    <div className="main">

                        <div className="form-container">
                            <form className="form-group" autoComplete="off">
                                <label>Mail</label>
                                <input type="email" className="form-control" required 
                                onChange={(e) => setMail(e.target.value)} value={mail} />
                                <br />
                                <label>Password</label>
                                <input type="password" className="form-control" required 
                                onChange={(e) => setSifre(e.target.value)} value={sifre}/>
                                <br />
                                <button onClick={handleSigninUserSubmit} type="button" id="save-btn" className="sign-btns">Sign In</button>
                                <div>You don't have an account?</div>
                                <button onClick={changeSign} className="sign-btns">Sign Up</button>
                            </form>

                        </div>
                    </div>
                </div>

                   
                )
            }
            
        </div>
    )
}