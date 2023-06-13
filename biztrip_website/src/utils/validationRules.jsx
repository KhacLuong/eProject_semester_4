import {validateEmpty, validateFile, validateLengthOfString, validateSelectOption} from "./helper.jsx";
import {message} from "./message.jsx";

export const formCoachValidationRules = [
    {
        fieldName: "plateNumber",
        validationFn: validateEmpty,
        errorMessage: message.error.plateNumber.isEmpty
    },
    {
        fieldName: "status",
        validationFn: validateSelectOption,
        errorMessage: message.error.status.isEmpty
    },
]

export const formTestimonialValidateRules = [
    {
        fieldName: "fullName",
        validationFn: validateEmpty,
        errorMessage: message.error.name.isEmpty
    },
    {
        fieldName: "job",
        validationFn: validateEmpty,
        errorMessage: message.error.job.isEmpty
    },
]