import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Slider from "@mui/material/Slider"
import {useSelector, useDispatch} from "react-redux";
import {decrement, increment} from "./redux/slices/counterSlice.jsx";

const App = () => {
    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()
    return (
        <div className="App">
            <div className={`flex items-center justify-center`}>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <p className="">
                Here's a block of text from a blog post that isn't conveniently three lines long like you designed
                for originally. It's probably like 6 lines on mobile or even on desktop depending on how you have
                things laid out. Truly a big pain in the derriere, and not the sort of thing you expected to be
                wasting your time trying to deal with at 4:45pm on a Friday am I right? You've got tickets to
                SmackDown and you heard there's gonna be a dark match with that local guy from two towns over that
                your cousin went to high school with before the show starts, and you're gonna miss it if you're
                not there early.  Here's a block of text from a blog post that isn't conveniently three lines long like you designed
                for originally. It's probably like 6 lines on mobile or even on desktop depending on how you have
                things laid out. Truly a big pain in the derriere, and not the sort of thing you expected to be
                wasting your time trying to deal with at 4:45pm on a Friday am I right? You've got tickets to
                SmackDown and you heard there's gonna be a dark match with that local guy from two towns over that
                your cousin went to high school with before the show starts, and you're gonna miss it if you're
                not there early.  Here's a block of text from a blog post that isn't conveniently three lines long like you designed
                for originally. It's probably like 6 lines on mobile or even on desktop depending on how you have
                things laid out. Truly a big pain in the derriere, and not the sort of thing you expected to be
                wasting your time trying to deal with at 4:45pm on a Friday am I right? You've got tickets to
                SmackDown and you heard there's gonna be a dark match with that local guy from two towns over that
                your cousin went to high school with before the show starts, and you're gonna miss it if you're
                not there early.  Here's a block of text from a blog post that isn't conveniently three lines long like you designed
                for originally. It's probably like 6 lines on mobile or even on desktop depending on how you have
                things laid out. Truly a big pain in the derriere, and not the sort of thing you expected to be
                wasting your time trying to deal with at 4:45pm on a Friday am I right? You've got tickets to
                SmackDown and you heard there's gonna be a dark match with that local guy from two towns over that
                your cousin went to high school with before the show starts, and you're gonna miss it if you're
                not there early.  Here's a block of text from a blog post that isn't conveniently three lines long like you designed
                for originally. It's probably like 6 lines on mobile or even on desktop depending on how you have
                things laid out. Truly a big pain in the derriere, and not the sort of thing you expected to be
                wasting your time trying to deal with at 4:45pm on a Friday am I right? You've got tickets to
                SmackDown and you heard there's gonna be a dark match with that local guy from two towns over that
                your cousin went to high school with before the show starts, and you're gonna miss it if you're
                not there early.  Here's a block of text from a blog post that isn't conveniently three lines long like you designed
                for originally. It's probably like 6 lines on mobile or even on desktop depending on how you have
                things laid out. Truly a big pain in the derriere, and not the sort of thing you expected to be
                wasting your time trying to deal with at 4:45pm on a Friday am I right? You've got tickets to
                SmackDown and you heard there's gonna be a dark match with that local guy from two towns over that
                your cousin went to high school with before the show starts, and you're gonna miss it if you're
                not there early.  Here's a block of text from a blog post that isn't conveniently three lines long like you designed
                for originally. It's probably like 6 lines on mobile or even on desktop depending on how you have
                things laid out. Truly a big pain in the derriere, and not the sort of thing you expected to be
                wasting your time trying to deal with at 4:45pm on a Friday am I right? You've got tickets to
                SmackDown and you heard there's gonna be a dark match with that local guy from two towns over that
                your cousin went to high school with before the show starts, and you're gonna miss it if you're
                not there early.  Here's a block of text from a blog post that isn't conveniently three lines long like you designed
                for originally. It's probably like 6 lines on mobile or even on desktop depending on how you have
                things laid out. Truly a big pain in the derriere, and not the sort of thing you expected to be
                wasting your time trying to deal with at 4:45pm on a Friday am I right? You've got tickets to
                SmackDown and you heard there's gonna be a dark match with that local guy from two towns over that
                your cousin went to high school with before the show starts, and you're gonna miss it if you're
                not there early.  Here's a block of text from a blog post that isn't conveniently three lines long like you designed
                for originally. It's probably like 6 lines on mobile or even on desktop depending on how you have
                things laid out. Truly a big pain in the derriere, and not the sort of thing you expected to be
                wasting your time trying to deal with at 4:45pm on a Friday am I right? You've got tickets to
                SmackDown and you heard there's gonna be a dark match with that local guy from two towns over that
                your cousin went to high school with before the show starts, and you're gonna miss it if you're
                not there early.  Here's a block of text from a blog post that isn't conveniently three lines long like you designed
                for originally. It's probably like 6 lines on mobile or even on desktop depending on how you have
                things laid out. Truly a big pain in the derriere, and not the sort of thing you expected to be
                wasting your time trying to deal with at 4:45pm on a Friday am I right? You've got tickets to
                SmackDown and you heard there's gonna be a dark match with that local guy from two towns over that
                your cousin went to high school with before the show starts, and you're gonna miss it if you're
                not there early.
            </p>
            <Slider
                value={[0,1000]}

                getAriaLabel={() => 'Minimum distance'}
                disableSwap
                min={0}
                max={10000}
                className={`text-black`}
                valueLabelDisplay="off"
                sx={{
                    color: '#000', '& .MuiSlider-rail': {
                        background: '#999', height: '2px'
                    }, '& .MuiSlider-track': {
                        borderRadius: '16px', background: '#000', height: '2px'
                    }, '& .MuiSlider-thumb': {
                        background: '#fff', width: '15px', height: '15px', border: '2px solid #000'
                    },
                }}
            />
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
        </div>
    )
}

export default App
