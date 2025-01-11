function updateClock() {
    const now = new Date();
    const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    };

    const timeFormatter = new Intl.DateTimeFormat("en-US", options);
    const formattedTime = timeFormatter.format(now);
    document.getElementById("time").textContent = formattedTime;

    const dateFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const formattedDate = dateFormatter.format(now);
    document.getElementById("date").textContent = formattedDate;

    updateBackground(now.getHours());
}

function updateBackground(hour) {
    if (hour >= 6 && hour < 18) {
        document.body.style.backgroundImage = "url('assets/day.jpg')";
    } else {
        document.body.style.backgroundImage = "url('assets/night.jpg')";
    }
}

setInterval(updateClock, 1000);
updateClock();