import { FunctionComponent, useEffect, useState } from "react";
import { getMyCards } from "../services/cardService";
import Card from "../interfaces/Card";

interface MyCardsProps {

}

const MyCards: FunctionComponent<MyCardsProps> = () => {
    /* useEffect(() => {
        getMyCards().then((res) => {
            
        }).catch((err) => {
            console.log(err);
            
        })
    }, []) */
    
    return (
        <>
            My Cards

        </>
    );
}

export default MyCards;