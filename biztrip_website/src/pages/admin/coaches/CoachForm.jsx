import React, {useEffect, useRef, useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import image_add from "../../../assets/image/image_add.png";
import {fetchSaveCoachUtility} from "../../../redux/slices/coachUtilitySlice.jsx";
import {fetchGetCoachById} from "../../../redux/slices/coachSlice.jsx";

const CoachForm = () => {
    useDocumentTitle("Thêm mới xe", true)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const id = useLocation().state?.id
    const statusState = useSelector((state) => state.coach.status)
    const inputImageRef = useRef(null);
    const [imageDefault, setImageDefault] = useState(image_add)
    const [imageName, setImageName] = useState("")
    const [plateNumber, setPlateNumber] = useState("")
    const [totalSeats, setTotalSeats] = useState(0)
    const [status, setStatus] = useState("")
    const [description, setDescription] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [errStatus, setErrStatus] = useState("")
    const [errImage, setErrImage] = useState("")
    const [disableButton, setDisableButton] = useState(false)

    useEffect(() => {
        if (id) {
            const test = async () => {
                const res = await dispatch(fetchGetCoachById({id})).unwrap()

            }
        }
    }, [id])

    return (
        <div>
            123
        </div>
    );
};

export default CoachForm;