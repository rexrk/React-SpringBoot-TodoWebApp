import { useParams } from "react-router-dom"
import { retrieveTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"

export default function TodoComponent() {

    //parameters
    const {id} = useParams()
    const authContext = useAuth()
    const username = authContext.username

    //Description set
    const [description, setDescription] = useState('')

    useEffect(
        () => retrieveTodo(), [id]
    )

    function retrieveTodo() {
        retrieveTodoApi(username, id)
            .then(
                response => setDescription(response.data.description)
            )
            .catch((error) => console.log(error))
    }

    return(
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div className="text">
                Description : {description}
            </div>

        </div>
    )
}