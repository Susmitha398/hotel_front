import React, { useEffect, useState } from "react"
import axios from "axios"
import "./Hotel.css"

function Hotel(){

    const [roomName, setRoomName] = useState("")
    const [customerName, setCustomerName] = useState("")
    const [price, setPrice] = useState("")
    const [status, setStatus] = useState("")
    const [image, setImage] = useState("")

    const [rooms, setRooms] = useState([])

    // INSERT
    const saveData = async(e) => {

        e.preventDefault()

        const formData = new FormData()

        formData.append("roomName", roomName)
        formData.append("customerName", customerName)
        formData.append("price", price)
        formData.append("status", status)
        formData.append("image", image)

        await axios.post("http://localhost:5000/fi", formData)

        alert("Inserted")

        getData()
        
    }

    // READ
    const getData = async() => {

        const res = await axios.get("http://localhost:5000/fi")

        setRooms(res.data)

    }

    useEffect(() => {

        getData()

    }, [])

    // DELETE
    const deleteData = async(id) => {

        await axios.delete(`http://localhost:5000/fi/${id}`)

        getData()

    }

    return(

        <div className="container">

            <h1>Hotel Booking</h1>

            <form onSubmit={saveData}>

                <input
                type="text"
                placeholder="Room Name"
                onChange={(e)=>setRoomName(e.target.value)}
                />

                <input
                type="text"
                placeholder="Customer Name"
                onChange={(e)=>setCustomerName(e.target.value)}
                />

                <input
                type="number"
                placeholder="Price"
                onChange={(e)=>setPrice(e.target.value)}
                />

                <input
                type="text"
                placeholder="Status"
                onChange={(e)=>setStatus(e.target.value)}
                />

                <input
                type="file"
                onChange={(e)=>setImage(e.target.files[0])}
                />

                <button>Add Room</button>

            </form>

            <div className="card-container">

                {
                    rooms.map((item) => (

                        <div className="card" key={item._id}>

                            <img
                            src={`http://localhost:5000/images/${item.image}`}
                            alt=""
                            width="200"
                            />

                            <h3>{item.roomName}</h3>

                            <p>{item.customerName}</p>

                            <p>₹ {item.price}</p>

                            <p>{item.status}</p>

                            <button onClick={() => deleteData(item._id)}>
                                Delete
                            </button>

                        </div>

                    ))
                }

            </div>

        </div>

    )

}

export default Hotel