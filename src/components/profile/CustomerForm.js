import { useEffect, useState } from "react"
import { getCurrentCustomer, saveCustomerUpdates } from "../ApiManager"

export const CustomerForm = (event) => {
    const [feedback, setFeedback] = useState("")
    const [profile, setProfile] = useState({
        address: "",
        phoneNumber: "",
        userId: 0
    })

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

const localHoneyUser = localStorage.getItem("honey_user")
const honeyUserObject = JSON.parse(localHoneyUser)

//Get current customer profile info from API and update state
useEffect(() => {
    let currentCustomerObject = getCurrentCustomer(honeyUserObject, setProfile)
    setProfile(currentCustomerObject)
    },
    [])

const handleSaveButtonClick = (event) => {
    event.preventDefault()

    //PUT to update profile, display submitted message when done
    saveCustomerUpdates(profile)
    .then(() => {
        setFeedback("Profile updates successfully sent to the dark lords of the metaverse")
    })
}

return (
    <>
    <>
    <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
    {feedback}
    </div>
    </>
    <form className="profile">
        <h2 className="profile__title">Update Customer Profile</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="specialty">Address:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={profile?.address}
                    onChange={
                        (evt) => {
                            // TODO: Update specialty property
                            const copy = {...profile}
                            copy.address = evt.target.value
                            setProfile(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Phone Number:</label>
                <input type="text"
                    className="form-control"
                    value={profile?.phoneNumber}
                    onChange={
                        (evt) => {
                            // TODO: Update rate property
                            const copy = {...profile}
                            copy.phoneNumber = evt.target.value
                            setProfile(copy)
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Profile
        </button>
    </form>
    </>
)
}