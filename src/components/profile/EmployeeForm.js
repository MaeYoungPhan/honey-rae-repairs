import { useEffect, useState } from "react"
import { getCurrentEmployee, saveEmployeeUpdates } from "../ApiManager"

export const EmployeeForm = (event) => {
    // TODO: Provide initial state for profile
    const [feedback, setFeedback] = useState("")
    const [profile, setProfile] = useState({
        specialty: "",
        rate: 0,
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

    // TODO: Get employee profile info from API and update state
    useEffect(() => {
        let currentEmployeeObject = getCurrentEmployee(honeyUserObject, setProfile)
        setProfile(currentEmployeeObject)
    }, [])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT call here to update the profile.
            Navigate user to home page when done.
        */
       saveEmployeeUpdates(profile)
       .then(() => {
        setFeedback("Employee profile successfully saved")
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
            <h2 className="profile__title">Update Employee Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile?.specialty}
                        onChange={
                            (evt) => {
                                // TODO: Update specialty property
                                const copy = {...profile}
                                copy.specialty = evt.target.value
                                setProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Hourly rate:</label>
                    <input type="number"
                        className="form-control"
                        value={profile?.rate}
                        onChange={
                            (evt) => {
                                // TODO: Update rate property
                                const copy = {...profile}
                                copy.rate = parseFloat(evt.target.value, 2)
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