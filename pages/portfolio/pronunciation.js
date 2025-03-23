import Sentence from '@/components/pronunciation/Sentence';
import { StyledContainer,StyledCard,StartButton } from '@/components/common/StyledComponents'
import React, { useState, useEffect } from 'react';
import InitScreen from '@/components/pronunciation/InitScreen'
export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/api/pronunciation');
    const data = await res.json();
    return {
        props: {
            data,
        },
    };
}

export default function Pronunciation({ data }) {
    const [initScreen, setInitScreen] = useState(true)
    const [sentence, setSentence] = useState(null);
    const [sentences, setSentences] = useState(data?.sentences?.map((s) => {
        return { isDone: false, text: s }
    }));
    const [trackIndex, setTrackIndex] = useState(0);
    useEffect(() => {
        setSentence(sentences[trackIndex]);
    }, [trackIndex, sentences]);

    const onSuccess = () => {
        const updatedSentences = [...sentences];
        updatedSentences[trackIndex].isDone = true;
        setSentences(updatedSentences);
    };

    const resetSentences = () => {
        const resettedSentences = sentences.map(sentence => ({ ...sentence, isDone: false }));
        setSentences(resettedSentences);
        setTrackIndex(0);
        setSentence(resettedSentences[0]);
    };

    const onNext = () => {
        const updatedSentences = [...sentences];
        if (updatedSentences.every(sentence => sentence.isDone)) {
            resetSentences();
        } else {
            const nextIndex = (trackIndex + 1) % sentences.length;
            setTrackIndex(nextIndex);
        }

    };
    const onStart = () =>{
        setInitScreen(false);
    }

    return (
        <StyledContainer>
            {initScreen && <InitScreen onStart={onStart}  />}
            {!initScreen && <>
                <StyledCard>
                {sentence && <Sentence onSuccess={onSuccess} sentence={sentence.text} />}
                {sentence?.isDone && (
                    <StartButton onClick={onNext} >
                        Next
                    </StartButton>
                )}
                </StyledCard>

            </>}
        </StyledContainer>
    );
}




