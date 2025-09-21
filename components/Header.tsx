import Image from "next/image";

import Styles from "@/components/Header.module.css"

function Header() {
    return ( 

        <div className={Styles.modelContainer}>

            <Image

            src={"/launchLogo.png"}

            height={100}
            width={200}
            quality={99}
            alt="img"
            className={Styles.img1}
            />

            <Image

            src={"/textSpeech.png"}

            height={200}
            width={200}
            quality={99}
            alt="img"
            className={Styles.img2}
            />

            
        </div>
     );
}

export default Header;