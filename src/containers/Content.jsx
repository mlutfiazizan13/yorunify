import { useContext, useEffect, useRef, useState } from "react";
import { getTopItems } from "../services/SpotifyServices";
import TrackLabel from "../components/TrackLabel";
import ArtistLabel from "../components/ArtistLabel";
import { UserContext } from "../App";
import { toPng } from 'html-to-image';

const Songs = () => {

    const { user } = useContext(UserContext);

    const [data, setData] = useState(null);
    const [type, setType] = useState('tracks');
    const [time_range, setTimeRange] = useState('long_term');
    const [limit, setLimit] = useState(10);
    const elementRef = useRef(null);
    let timePeriod;

    if (time_range === 'long_term') {
        timePeriod = ""
    } else if(time_range === 'medium_term') {
        timePeriod = "Last 6 Month"
    } else {
        timePeriod = "Last Month"
    }

    const changeTopItem = (itemType = type, itemLimit = limit, itemTimeRange = time_range) => {
        getTopItems(itemType, itemLimit, itemTimeRange)
            .then(response => setData(response.data))
                .then(() => {
                    setType(itemType)
                    setLimit(itemLimit)
                    setTimeRange(itemTimeRange)
                });
    }

    const htmlToImageConvert = () => {
        toPng(elementRef.current, { cacheBust: false })
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = user.display_name +"_" +type+ "_"+ timePeriod.replace(" ", '_').toLocaleLowerCase() +".png";
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.log(err);
          });
      };

    useEffect(() => {
        changeTopItem("tracks");

        console.log(timePeriod);
    }, [])
    return ( 
        <div className="px-5 md:px-10 lg:px-0">
            <p className="text-lg text-white mb-5 text-center capitalize">Top {type} { timePeriod }</p>
            <div className="flex justify-center">

                {
                    data !== null ?
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div ref={elementRef} className="grid grid-cols-1 place-self-center w-96 gap-2 p-7 bg-white">
                                <div className="text-center mb-4">
                                    <p className="font-bold text-2xl mb-1">Yorunify°</p>
                                    <p className="font-medium text-xl capitalize"> Top {type} { timePeriod } </p>
                                </div>
                                { type === 'tracks' ? 
                                    // console.log(type,data)
                                    data.items.map((values, index) => {
                                        return <TrackLabel key={index} image={values.album.images[2].url} name={values.name} artists={values.artists}></TrackLabel>
                                    })
                                    :
                                    data.items.map((values, index) => {
                                        return <ArtistLabel key={index} image={values.images[0].url} name={values.name} popularity={values.popularity}></ArtistLabel>
                                    })
                                }
                                
                            </div>
                            <div className="px-5">
                                <div className="mb-5">
                                    <p className="font-medium text-xl text-white mb-3">Type</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button onClick={() => changeTopItem("artists")} className={`px-3 py-2 border border-white rounded-full font-medium text-lg ${type === "artists" ? 'bg-white text-black' : 'text-white'}`}>Artists</button>
                                        <button onClick={() => changeTopItem("tracks")} className={`px-3 py-2 border border-white rounded-full font-medium text-lg ${type === "tracks" ? 'bg-white text-black' : 'text-white'}`}>Tracks</button>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <p className="font-medium text-xl text-white mb-3">Time Period</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        <button onClick={() => changeTopItem(type, limit, "short_term")} className={`px-3 py-2 border border-white rounded-full font-medium text-sm lg:text-lg  ${time_range === "short_term" ? 'bg-white text-black' : 'text-white'}`}>Last Month</button>
                                        <button onClick={() => changeTopItem(type, limit, "medium_term")} className={`px-3 py-2 border border-white rounded-full font-medium text-sm lg:text-lg  ${time_range === "medium_term" ? 'bg-white text-black' : 'text-white'}`}>Last 6 Month</button>
                                        <button onClick={() => changeTopItem(type, limit, "long_term")} className={`px-3 py-2 border border-white rounded-full font-medium text-sm lg:text-lg  ${time_range === "long_term" ? 'bg-white text-black' : 'text-white'}`}>All Time</button>
                                    </div>
                                </div>
                                
                                <div className="mb-5">
                                    <p className="font-medium text-xl text-white mb-3">Image</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        <button onClick={() => htmlToImageConvert()} className={`px-3 py-2 border border-white rounded-full font-medium text-sm lg:text-lg text-white`}>Download</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    : ''

                }

            </div>
        </div>
     );
}
 
export default Songs;