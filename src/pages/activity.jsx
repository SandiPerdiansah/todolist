import {ActivityListItem, Box, EmptyContent, List, Modal, ModalDeleteActivity} from '../components/index.jsx'
import activityEmptyImage from '../assets/img/activity-empty-state.png';
import {ActivityContext} from "../context/ActivityContext.jsx";
import {useContext} from "react";
import {Loading} from "../components/organisms/Loading.jsx";
import {ALert} from "../components/organisms/ALert.jsx";

export const Activity = () => {
    const {activities, stateDelete, handleAddActivity} = useContext(ActivityContext);

    return (
        <>
            {
                activities.isLoading
                    ? <Loading/>
                    : (
                        <Box className='w-full'>
                            {
                                activities.data.length > 0 ? (
                                    <List className='w-full flex items-center justify-start flex-wrap gap-7 mx-auto'>
                                        {
                                            activities.data.map((data) => (
                                                <ActivityListItem
                                                    key={data.id}
                                                    data={data}
                                                />
                                            ))
                                        }
                                    </List>
                                ) : (
                                    <EmptyContent
                                        src={activityEmptyImage}
                                        alt='activity empty ilustration'
                                        ariaLabel='activity empty ilustration'
                                        dataCY='activity empty'
                                        onClick={handleAddActivity}
                                    />
                                )
                            }
                            <Modal state={stateDelete}>
                                <ALert stateDelete={stateDelete}/>
                                <ModalDeleteActivity stateDelete={stateDelete}/>
                            </Modal>
                        </Box>
                    )
            }
        </>
    )
}