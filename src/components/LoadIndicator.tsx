import React from "react"
import "../styles/LoadingIndicator.css"

export default function LoadingIndicator(): JSX.Element {
    return <div className="loading-container">
        <div className="loader"></div>
    </div>
}
