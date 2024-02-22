import React, { useState, useEffect } from 'react';

// const Slider = ({ images }) => {
const Slider = ({ images}) => {
    // const [currentIndex, setCurrentIndex] = useState(0);
    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setCurrentIndex((currentIndex + 1) % images.length);
    //     }, 5000);
    //     return () => clearInterval(timer);
    // }, [currentIndex, images.length]);

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() =>{
        const timer = setInterval(() => {
            setCurrentIndex((currentIndex+1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    },[currentIndex, images.length]);

    return (
        // <div style={{ 
        // //     'width': '200vw', 'height': '30vh'
        // // , overflow: 'hidden' ,
        // //     'position': 'relative',
        // //     'left': '-1050px'

        //     }}>
        //     {images.map((image, index) => (
        //         <img
        //             // key={index}
        //             key={index}
        //             src={image.src}
        //             alt={image.alt}
        //             style={{
        //                 width: '100%',
        //                 height: '100%',
        //                 // height: '100%',
        //                 'max-height': '40vh',
        //                 'object-fit': 'contain',
        //                 display: currentIndex === index ? 'block' : 'none'
        //             }}
        //         />
        //     ))}
        // </div>

        <div>
            {images.map((image, index) => (
                <img 
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    style={{
                        width: '100%',
                        height: '100%',
                        'max-height': '40vh',
                        'object-fit': 'contain',   
                        display: currentIndex == index ? 'block' : 'none'
                    }}
                />
            ))

            }
        </div>
    );
};

export default Slider;
