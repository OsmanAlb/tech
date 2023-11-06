import React from 'react';
import BranchesMap from './BranchesMap';
import Form from './Form';
import './App.scss';
import {TownProvider} from "./PointReducer";

function App() {
    return (
        <div>
            <TownProvider>
                <BranchesMap/>
            </TownProvider>
            <Form/>
        </div>
    );
}

export default App;
