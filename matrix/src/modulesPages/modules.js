import {Routes, Route } from 'react-router-dom';
import VolunteerSignUp from './volunteerSignUp/volunteerSignUp';

export default function Modules () {
    return (
        <div style={{height:"100%"}}>
            <Routes>
                <Route path='volunteer/*' element={<VolunteerSignUp />} />
                <Route path='test1' element={<p>Test1</p>} />
                <Route path='test2' element={<p>Test2</p>} />
            </Routes>
        </div>
    )
}