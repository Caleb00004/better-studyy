import { FC, ReactNode } from "react";
import Navbar from "./Navbar";

type HomeLayoutProps = {
  children: ReactNode;
};

const Layout: FC<HomeLayoutProps> = ({children}) => {
    return (
        <div className="bg-dark min-h-screen">
            <Navbar />
            <div className="flex pt-[5em] px-[2em] text-white flex-col ">
                {children}
            </div>        
        </div>

    )
}

export default Layout