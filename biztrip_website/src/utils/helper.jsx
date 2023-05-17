export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
export const initialState = {
    list: [],
    totalPages: 0,
    totalItems: 0,
    status: 'idle',
}
export const handleChangeImage = (e, setImageDefault, setImageName, setErrMsg) => {
    setErrMsg("")
    const fileObj = e.target.files && e.target.files[0];

    if (!fileObj) {
        return;
    }
    setImageDefault(window.URL.createObjectURL(fileObj))
    setImageName(fileObj)

    // 👇️ reset file input
    e.target.value = null;
}
export const handleOpenFileInput = (inputImageRef) => {
    inputImageRef.current.click()
}
export const THIS_YEAR = +(new Date().getFullYear())

export const THIS_MONTH = +(new Date().getMonth()) + 1;
export const WEEK_DAYS = {
    Sunday: "CN",
    Monday: "T2",
    Tuesday: "T3",
    Wednesday: "T4",
    Thursday: "T5",
    Friday: "T6",
    Saturday: "T7"
}
export const CALENDAR_MONTHS = {
    January: "Th01",
    February: "Th02",
    March: "Th03",
    April: "Th04",
    May: "Th05",
    June: "Th06",
    July: "Th07",
    August: "Th08",
    September: "Th09",
    October: "Th10",
    November: "Th11",
    December: "Th12"
}
export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
    const months30 = [4, 6, 9, 11];
    const leapYear = year % 4 === 0;
    return month === 2
        ? leapYear
            ? 29
            : 28
        : months30.includes(month)
            ? 30
            : 31;
}
export const CALENDAR_WEEKS = 6;
export const zeroPad = (value, length) => {
    return `${value}`.padStart(length, '0');
}
export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
    return +(new Date(`${year}-${zeroPad(month, 2)}-01`).getDay()) + 1;
}