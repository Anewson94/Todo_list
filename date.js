
function getDate() {
    let dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    let today = new Date();
    let day = today.toLocaleDateString("en-US", dateOptions);
    return day
}

module.exports = getDate