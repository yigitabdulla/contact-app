import { useEffect, useState } from "react"
import View from "./View"

//apo@mail.com 123

const getDataFromLocalStorage = () => {
    const data = localStorage.getItem("contacts")
    if(data) {
        // JSON.parse stringi object'e dönüştürüyor, local storagede kaydetmek için objeyi stringe dönüştürmüştük!
        return JSON.parse(data)
    }
    else {
        return []
    }
}

export default function Home() {

    const [contacts,setContacts] = useState(getDataFromLocalStorage())

    const [name,setName] = useState("")
    const [surname,setSurname] = useState("")
    const [number,setNumber] = useState("")
    const [confirmationNumber,setConfirmationNumber] = useState("")
    const [add,setAdd] = useState(false)
    const [edit,setEdit] = useState(false)
 

    const handleAddContactSubmit = (e) => {
        e.preventDefault()
        let flag = 0
        let no = contacts.length + 1
        let contact = {
            name: name,
            surname: surname,
            number: number,
            id: no,
            owner: localStorage.getItem("username")
        }

        for (let index = 0; index < contacts.length; index++) {
            if(contacts[index].number == number && contacts[index].owner == localStorage.getItem("username")) {
                flag += 1
            }
        }

        if(flag == 0) {
            setContacts([...contacts,contact])
            setName("")
            setSurname("")
            setNumber("")
            setAdd(false)
        }
        else {
            alert("Number already exist!")
        }
        
       
    }

    const handleEditContactSubmit = (e) => {
        e.preventDefault()

        for (let index = 0; index < contacts.length; index++) {
            if(contacts[index].number == confirmationNumber) {
                contacts[index].name = name
                contacts[index].surname = surname
                contacts[index].number = number
            }  
        }
        localStorage.setItem("contacts", JSON.stringify(contacts))
        setName("")
        setSurname("")
        setNumber("")
        setConfirmationNumber("")
        setEdit(false)
    }

    const deleteContact = (number) => {
        //const filteredContacts = contacts.filter((element,index) => {
        //    return  element.number !== number
        //})
        //setContacts(filteredContacts)
        let flag = 0

        for (let index = 0; index < contacts.length; index++) {
           if(number == contacts[index].number && localStorage.getItem("username") == contacts[index].owner) {
                flag = index
           }
        }

        const filteredArray = contacts.splice(flag,1)
        setContacts(contacts)

        localStorage.setItem("contacts", JSON.stringify(contacts))
        
        for (let index = 0; index < contacts.length; index++) {
            contacts[index].id = index+1
        }

        alert("User deleted succesfuly!")
        window.location.reload()
    
    }

    const editContact = (number) => {
        edit ? setEdit(false) : setEdit(true)
        add ? setAdd(false) : 0

        for (let index = 0; index < contacts.length; index++) {
            if(contacts[index].number == number) {
                setConfirmationNumber(contacts[index].number)
                setName(contacts[index].name)
                setSurname(contacts[index].surname)
                setNumber(contacts[index].number)
            }  
        }
    }


    const handleAdd = () => {
        setName("")
        setSurname("")
        setNumber("")
        add ? setAdd(false) : setAdd(true)
        edit ? setEdit(false) : 0
    }

    const handleAddEdit = () => {
        if(edit) {
            edit ? setEdit(false) : setEdit(true)
            add ? setAdd(false) : 0
        }
        if(add) {
            add ? setAdd(false) : setAdd(true)
            edit ? setEdit(false) : 0
        }
    }

    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts))

    },[contacts])

    const logout = () => {
        localStorage.removeItem("signUp")
        localStorage.removeItem("name")
        window.location.reload()
    }

    const checkEmpty = () => {
        let i = 0
        for (let index = 0; index < contacts.length; index++) {
            if(contacts[index].owner == localStorage.getItem("username")) {
                i += 1
            }
                
        }
        if(i == 0) {
            return true
        }
        else {
            return false
        }
    }
    

    //onClick={handleAddEdit}
    return (
        <div className="home" >
            <div className="home-content">
            <h1>{localStorage.getItem("username")}'s Contacts</h1>
            <button className="add-contact" onClick={handleAdd}>Add Contact</button>
            
            {add && 
            
            <div>
                <div onClick={handleAddEdit} className="overlay"></div>
                <div className="wrapper">
                    <div className="main">

                        <div className="form-container">
                            <form className="form-group" autoComplete="off" onSubmit={handleAddContactSubmit}>
                                <label>Name</label>
                                <input type="text" className="form-control" required 
                                onChange={(e) => setName(e.target.value)} value={name} />
                                <br />
                                <label>Surname</label>
                                <input type="text" className="form-control" required 
                                onChange={(e) => setSurname(e.target.value)} value={surname}/>
                                <br />
                                <label>Number</label>
                                <input type="text" className="form-control" required 
                                onChange={(e) => setNumber(e.target.value)} value={number}/>
                                <br />
                                <button type="submit" className="btn btn-success btn-md">ADD</button>
                                <button onClick={handleAdd} className="close-btn">CLOSE</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            }
            {edit && 
            <div>
                <div onClick={handleAddEdit} className="overlay"></div>
                <div className="wrapper">
                    <div className="main">
                        <div className="form-container">
                            <form className="form-group" autoComplete="off" onSubmit={handleEditContactSubmit}>
                                <label>Name</label>
                                <input type="text" id="name-text" className="form-control" required 
                                onChange={(e) => setName(e.target.value)} value={name} />
                                <br />
                                <label>Surname</label>
                                <input type="text" id="surname-text" className="form-control" required 
                                onChange={(e) => setSurname(e.target.value)} value={surname}/>
                                <br />
                                <label>Number</label>
                                <input type="text" className="form-control" required 
                                onChange={(e) => setNumber(e.target.value)} value={number}/>
                                <br />
                                <button type="submit" id="save-btn" className="btn btn-success btn-md">SAVE</button>
                                <button onClick={editContact} className="close-btn">CLOSE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            }
            <div className="view-container">
                        {contacts.length >0 && <>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th id="table-th">Id</th>
                                            <th id="table-th">Name</th>
                                            <th id="table-th">Surname</th>
                                            <th id="table-th">Number</th>
                                            <th id="table-th">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <View contacts={contacts} deleteContact={deleteContact} editContact={editContact} />
                                    </tbody>
                                </table>
                            </div>
                        </>}
                        {checkEmpty() && <div>There are currently no entries in your directory.</div>}

                    </div>
            <div className="acc-buttons">
                <button onClick={logout} className="logout">Log Out</button>
            </div>
            </div>

        </div>

        
    )
}