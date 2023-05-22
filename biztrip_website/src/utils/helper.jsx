import {message} from "./message.jsx";

export const validateForm = (formData, validationRules) => {
    let errors = {};

    validationRules.forEach((rule) => {
        const { fieldName, validationFn, errorMessage } = rule;
        const fieldValue = formData[fieldName];

        if (typeof fieldValue === "string" && fieldValue.trim() === "") {
            // Check if the field value is an empty string (for input fields)
            errors[fieldName] = errorMessage;
        } else if (Array.isArray(fieldValue) && fieldValue.length === 0) {
            // Check if the field value is an empty array (for select options with multiple selection)
            errors[fieldName] = errorMessage;
        } else if (fieldValue instanceof FileList && fieldValue.length === 0) {
            // Check if the field value is an empty FileList (for file inputs)
            errors[fieldName] = errorMessage;
        } else if (!validationFn(fieldValue)) {
            // Perform custom validation using the provided function
            errors[fieldName] = errorMessage;
        }
    });

    return errors;
}
export const validateEmpty = (value) => {
    return value.trim() !== ""
}
export const validateSelectOption = (value) => {
    return value !== null
}
export const validateFile = (file) => {
    // Check if a file is selected
    if (!file) {
        return message.error.file.isEmpty;
    }
    // Check the file type
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
        return message.error.file.notAllowed;
    }

    // Check the file size (in bytes)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        return message.error.file.max;
    }

    // File is valid
    return null;
};
export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

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
