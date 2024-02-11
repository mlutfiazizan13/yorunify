const TrackLabel = ({
    image,
    name,
    artists
}) => {
    return ( 
        <div className="flex gap-3">
            <img src={image} alt={`${name}_img`} className="w-12 h-12" />
            <div className="text-black">
                <p className="text-xl font-medium">{name}</p>
                <p>{artists.map((artist) => {
                    return artist.name
                })}</p>
            </div>
        </div>
     );
}
 
export default TrackLabel;