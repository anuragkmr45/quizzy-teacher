import React, { useState, useEffect } from 'react'

const QuestionCard = ({ index, question, option1, option2, option3, option4, answer }) => {

    const [opt1, setOpt1] = useState(false);
    const [opt2, setOpt2] = useState(false);
    const [opt3, setOpt3] = useState(false);
    const [opt4, setOpt4] = useState(false);

    const handleAnsMatch = async () => {
        try {
            if (await option1 !== null && await option1 === answer) {
                setOpt1(true);
            }
            if (await option2 !== null && await option2 === answer) {
                setOpt2(true);
            }
            if (await option3 !== null && await option3 === answer) {
                setOpt3(true);
            }
            if (await option4 !== null && await option4 === answer) {
                setOpt4(true);
            }
        } catch (error) {
            console.error('Erro while seearching for correct ans: ', error);
        }
    }

    useEffect(() => {
        handleAnsMatch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='card max-w-full my-5'>
            {
                question && (
                    <div className="card-body">
                        <h3 className='max-w-full text-2xl'>
                            {index + 1}. {question}
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <p className={`text-xl ${opt1 ? 'text-green-500' : 'text-gray-500'} `} >
                                a. {option1}
                            </p>
                            <p className={`text-xl ${opt2 ? 'text-green-500' : 'text-gray-500'} `} >
                                b. {option2}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <p className={`text-xl ${opt3 ? 'text-green-500' : 'text-gray-500'} `} >
                                c. {option3}
                            </p>
                            <p className={`text-xl ${opt4 ? 'text-green-500' : 'text-gray-500'} `} >
                                d. {option4}
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default QuestionCard
