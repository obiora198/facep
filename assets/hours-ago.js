const hoursAgo = (stamp) => {
    const currentTimeStamp = new Date().getTime();
    const diff = currentTimeStamp - stamp;
    const hoursPast = Math.floor(diff / 1000 / 60 / 60);
    return hoursPast;
}

export { hoursAgo }