// noinspection JSCheckFunctionSignatures

import {createContext, useEffect, useState} from "react";
import {ACTIVITY_SERVICES} from "../services/ACTIVITY_SERVICES.js";

export const ActivityContext = createContext(null);

export const ActivityProvider = ({children}) => {
    const request = ACTIVITY_SERVICES;
    const [stateDelete, setStateDelete] = useState({
        type:'deleteActivity',
        modal: false,
        content: false,
        alert:false,
        data: {}
    });

    const [activities, setActivities] = useState({
        isLoading: true,
        data: []
    });

    useEffect(() => {
        (async () => {
            try {

                const response = await request.getActivities();
                setActivities(() => ({
                    isLoading: true,
                    data: response.data
                }));

            } catch (e) {
                console.log(`Error : ${e.message}`);
            } finally {
                setActivities((prevState) => ({
                    ...prevState,
                    isLoading: false,
                }));
            }
        })();
    }, []);

    const handleAddActivity = async () => {
        try {
            const response = await request.addActivity();
            setActivities((prevState) => ({
                ...prevState,
                data: [
                    response,
                    ...prevState.data,
                ]
            }));
        } catch (e) {
            throw new Error(`Errror ${e.message}`);
        }
    }

    const handleDeleteActivity = async (id) => {
        try {
            await request.deleteActivity(id);
            setActivities((prevState) => ({
                ...prevState,
                data: [
                    ...prevState.data.filter((activity) => activity.id !== id)
                ]
            }));
        } catch (e) {
            throw new Error(`Errror ${e.message}`);
        }
    }

    return (
        <ActivityContext.Provider value={
            {
                activities,
                setActivities,
                handleAddActivity,
                handleDeleteActivity,
                stateDelete,
                setStateDelete
            }
        }>
            {children}
        </ActivityContext.Provider>
    )
}