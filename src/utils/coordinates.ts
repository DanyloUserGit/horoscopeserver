export const decimalToDMS = (decimal:number) => {
    const degrees = Math.floor(decimal);
    const minutesNotTruncated = (decimal - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2);

    return {
        degrees: degrees,
        minutes: minutes,
        seconds: seconds
    };
}
