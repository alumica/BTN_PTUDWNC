import images from '../../assets/img';
import Slider from "react-slick";

const FoodList = ({list}) => {
        const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1
        };

    if (list?.length > 0)
    return (
        <div className="flex flex-row justify-center items-center gap-[33px] pt-20 ">
                {/* <div className="flex flex-row justify-center items-center w-[80px] h-[80px] bg-white/20 backdrop-blur-[20px] rounded-[50px]">
                    <img src={images.leftArrow}></img>
                </div> */}
                {/* flex flex-row justify-center items-end */}
                <div className='max-w-[1086px]'>
                    <Slider {...settings}>
                    {list?.length > 0 && list.map((item, index) =>
                    <div className='w-[300px] h-[375px] bg-white/20 border rounded-[30px] border-solid border-white' key={index}>
                        <div className='flex flex-row justify-center items-center rounded-[30px] w-[300px] h-[225px]'><img src={item.imageUrl} className='flex flex-row justify-center items-center w-[70%] h-[70%] ' /></div>
                        <div className='flex items-center flex-col'>
                            <div className='font-menus font-normal text-4xl leading-[130%] text-white mb-[20px]'>{item.name}</div>
                            <div className='flex flex-row justify-between items-center w-[80%]'>
                                <div className='flex flex-row justify-center items-center'>
                                    <svg aria-hidden="true" className="w-[25px] h-[25px] text-[#FAE637]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <span className='font-montserrat text-white font-normal text-2xl leading-[130%]'>4</span>
                                </div>
                                <div className='font-montserrat text-white font-normal text-2xl leading-[130%]'>${item.price}</div>
                            </div>
                        </div>
                    </div>
                    )}
                    </Slider>

                     



                    
                    {/* <div className='w-[300px] h-[375px] bg-white/20 border rounded-[30px] border-solid border-white'>
                        <div className='flex flex-row justify-center'><img src={images.sushi}></img></div>
                        <div className='flex items-center flex-col'>
                            <div className='font-menus font-normal text-4xl leading-[130%] text-white mb-[20px]'>Chenzu Sushi</div>
                            <div className='flex flex-row justify-between items-center w-[80%]'>
                                <div className='flex flex-row justify-center items-center'>
                                    <svg aria-hidden="true" className="w-[25px] h-[25px] text-[#FAE637]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <span className='font-montserrat text-white font-normal text-2xl leading-[130%]'>4</span>
                                </div>
                                <div className='font-montserrat text-white font-normal text-2xl leading-[130%]'>${}</div>
                            </div>
                        </div>
                    </div>

                    <div className='w-[320px] h-[400px] bg-white border rounded-[30px] border-solid border-white'>
                        <div className='flex flex-row justify-center'><img src={images.sushi}></img></div>
                        <div className='flex items-center flex-col'>
                            <div className='font-menus font-normal text-4xl leading-[130%] text-[#555] mb-[20px]'>Chenzu Sushi</div>
                            <div className='flex flex-row justify-between items-center w-[80%]'>
                                <div className='flex flex-row justify-center items-center'>
                                    <svg aria-hidden="true" className="w-[25px] h-[25px] text-[#FAE637]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <span className='font-montserrat text-[#555] font-normal text-2xl leading-[130%]'>4</span>
                                </div>
                                <div className='font-montserrat text-[#555] font-normal text-2xl leading-[130%]'>$21.00</div>
                            </div>
                        </div>
                    </div>

                    <div className='w-[300px] h-[375px] bg-white/20 border rounded-[30px] border-solid border-white'>
                        <div className='flex flex-row justify-center'><img src={images.sushi}></img></div>
                        <div className='flex items-center flex-col'>
                            <div className='font-menus font-normal text-4xl leading-[130%] text-white mb-[20px]'>Chenzu Sushi</div>
                            <div className='flex flex-row justify-between items-center w-[80%]'>
                                <div className='flex flex-row justify-center items-center'>
                                    <svg aria-hidden="true" className="w-[25px] h-[25px] text-[#FAE637]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <span className='font-montserrat text-white font-normal text-2xl leading-[130%]'>4</span>
                                </div>
                                <div className='font-montserrat text-white font-normal text-2xl leading-[130%]'>$21.00</div>
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* <div className="flex flex-row justify-center items-center w-[80px] h-[80px] bg-white/20 backdrop-blur-[20px] rounded-[50px] -rotate-180">
                    <img src={images.leftArrow}></img>
                </div> */}
            </div>
        
    );
    else
    return(<></>);
}

export default FoodList;