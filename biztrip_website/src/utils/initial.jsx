export const initialState = {
    list: [],
    totalPages: 0,
    totalItems: 0,
    status: 'idle',
}
export const initialUserFormState = {
    email: "",
    phoneNumber: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    role: ""
}
export const initialCoachFormState = {
    plateNumber: "",
    totalSeats: "",
    description: "",
    imagePath: null,
    status: ""
}
export const initialTicketFormState = {
    title: "",
    fare: ""
}
export const initialScheduleFormState = {
    departure: [],
    stopover: [],
    destination: [],
    status: ""
}
export const initialTestimonialFormState = {
    fullName: "",
    job: "",
    isHot: 2,
    status: 2,
    contentJson: '',
    avatarPath: ""
}