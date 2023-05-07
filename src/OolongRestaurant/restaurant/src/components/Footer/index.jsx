import React from "react";
import images from "../../assets/img";
import { Link } from "react-router-dom";

function Footer(){
    return(
        <div>
            <div className="flex bg-primary-red">
                <div className="mx-5 my-10 flex w-full items-start justify-between">
                    <img src={images.icon} alt="" className="object-contain" />
                    <div className="flex-col font-montserrat2 text-primary-white">
                        <div className="font-bold mb-4">TERM</div>
                        <div className="mb-5">
                            <Link to={""}>Privacy Policy</Link>
                        </div>
                        <div className="mb-5">
                            <Link to={""}>Terms & Conditions</Link>
                        </div>
                    </div>

                    <div className="flex-col font-montserrat2 text-primary-white">
                        <div className="font-bold mb-4">CONTACT</div>
                        <div>
                            <i class="fa-sharp fa-solid fa-phone fa-lg mr-2 mb-5" style={{color: "#FFFFFF"}}></i>
                         : 0123456789
                        </div>
                        <div>
                            <i class="fa-solid fa-envelope fa-lg mr-2 mb-5" style={{color: "#FFFFFF"}}></i>
                            : sushirestaurant@gmail.com
                        </div>
                        <div>
                            <i class="fa-solid fa-location-dot fa-lg mr-2 mb-5" style={{color: "FFFFFF"}}></i>
                            : Dalat,LamDong
                        </div>
                    </div>
                    <div className="flex flex-col">
                    <div className="flex gap-5">
                        <Link
                            to={""}
                            className=""
                        >
                            <i class="fa-brands fa-facebook-f fa-xl" style={{color: "#FFFFFF"}}></i>
                        </Link>
                        <Link
                            to={""}
                            className=""
                        >
                            <i class="fa-brands fa-twitter fa-xl" style={{color: "#FFFFFF"}}></i>
                        </Link>
                        <Link
                            to={""}
                            className=""
                        >
                            <i class="fa-brands fa-instagram fa-xl" style={{color: "#FFFFFF"}}></i>
                        </Link>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
export default Footer
