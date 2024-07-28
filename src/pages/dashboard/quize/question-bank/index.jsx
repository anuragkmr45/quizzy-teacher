import React from 'react';
import { MdOutlineFeaturedPlayList } from 'react-icons/md';
import DashBoard from '../../../../components/frames/dashboard';

const QuestionBank = () => {
    return (
        <DashBoard>
            <div className='flex items-center justify-center h-full mx-auto w-11/12 md:w-full'>
                <h1 className='text-5xl font-semibold flex '>
                    Coming Soon <MdOutlineFeaturedPlayList className='my-auto mx-2' />
                </h1>
            </div>
        </DashBoard>
    );
};

export default QuestionBank;
