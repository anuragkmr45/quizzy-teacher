const AlertBox = () => {

    const handleDownload = () => {
        // Get the image URL
        const imageUrl = "https://firebasestorage.googleapis.com/v0/b/brandladder-webapp.appspot.com/o/general%2FWhatsApp%20Image%202024-03-15%20at%2018.13.54_42ab5567.jpg?alt=media&token=2e7f4c53-780d-4b48-bf82-36985bbd5be0";
        // Create an anchor element
        const link = document.createElement('a');
        link.href = imageUrl;
        // Set the filename for the download
        link.download = 'csv_file_format.jpg';
        // Programmatically trigger the click event to start the download
        document.body.appendChild(link);
        link.click();
        // Clean up
        document.body.removeChild(link);

        // eslint-disable-next-line
    };

    return (
        <div className="alert alert-info">
            <label className="btn btn-outline-secondary mx-auto" htmlFor="csv-formate">Show CSV File Format</label>
            <input className="modal-state" id="csv-formate" type="checkbox" />
            <div className="modal">
                <label className="modal-overlay" htmlFor="csv-formate"></label>
                <div className="modal-content space-y-6">
                    <h1>Your CSV File Show Have Column Titles Should Have Correct Spelling</h1>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/brandladder-webapp.appspot.com/o/general%2FWhatsApp%20Image%202024-03-15%20at%2018.13.54_42ab5567.jpg?alt=media&token=2e7f4c53-780d-4b48-bf82-36985bbd5be0"
                        alt="Anurag Kumar"
                        loading='lazy'
                    />
                    <button className="btn btn-outline-secondary w-full" onClick={handleDownload}>
                        Download
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AlertBox;
