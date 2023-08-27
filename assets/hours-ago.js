const hoursAgo = (stamp) => {
    const currentTimeStamp = new Date().getTime();
    const diff = currentTimeStamp - stamp;
    const hoursPast = Math.floor(diff / 1000 / 60 / 60);
    if (hoursPast >= 24) {
        const daysPast = Math.floor(hoursPast / 24);
        return daysPast;
    }
    return hoursPast;
}

export { hoursAgo }