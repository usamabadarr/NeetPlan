import React from 'react';

type Sticky = {
    id: number;
    title: string;
    message: string;
};

type StickyProps = {
    stickies: Sticky[];
};


const StickyNote: React.FC<StickyProps> = () => {
    return (
        <>

        </>
    )
}

export default StickyNote;