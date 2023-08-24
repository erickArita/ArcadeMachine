import {Button, CircularProgress} from "@nextui-org/react";


export interface WinOrLoseProps {
    oncClick?: () => void;
    isOpen?: boolean;
    win?: boolean;
}

import "./WinOrLose.css";
import {CustomModal} from "../../../../components/CustomModal.tsx";


export const WinOrLose = ({

                              oncClick,
                              isOpen,
                              win,
                          }: WinOrLoseProps) => (
    <CustomModal isOpen={isOpen} size={"full"}>

        <div
            className="WinOrLose"
            style={{
                backgroundColor: win ? "green" : "red",
            }}
        >
            <div>
                <h2>{win?"Ganaste":'Fuiste humillado'}</h2>
                <Button
                    className="bg-gradient-to-tr
          from-pink-500
          to-yellow-500
          text-white shadow-lg"
                    radius="sm"
                    startContent={
                        <CircularProgress
                            size="sm"
                            classNames={{
                                base: "max-w-md",
                                track: "drop-shadow-md border border-default",
                                indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                                label: "tracking-wider font-medium text-default-600",
                                value: "text-foreground/60",
                            }}
                        />
                    }
                    size="lg"
                    onClick={oncClick}
                >
                </Button>
                <Button
                    className="bg-gradient-to-tr
          from-pink-500
          to-yellow-500
          text-white shadow-lg"
                    radius="sm"
                    startContent={
                        <CircularProgress
                            size="sm"
                            classNames={{
                                base: "max-w-md",
                                track: "drop-shadow-md border border-default",
                                indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                                label: "tracking-wider font-medium text-default-600",
                                value: "text-foreground/60",
                            }}
                        />
                    }
                    size="lg"
                    onClick={oncClick}
                >
                </Button>
            </div>

            <img className={"img1"} src={ win?"/ruta/ganar.gift":'/ruta/perder.gift' } alt={`img  ${win?"Mastodonte":'Manco'}`}/>
            <img className={"img2"} src={ win?"/ruta/ganar.gift":'/ruta/perder.gift' } alt={`img  ${win?"Mastodonte":'Manco'}`}/>
            <img className={"img3"} src={ win?"/ruta/ganar.gift":'/ruta/perder.gift' } alt={`img  ${win?"Mastodonte":'Manco'}`}/>


        </div>
        <CustomModal/>
        );


