const ArtistLabel = ({
    image,
    name,
    popularity,
    artist_link
}) => {
    return ( 
        <a href={artist_link} className="flex items-center gap-3">
            <img src={image} alt={`${name}_img`} className="w-12 h-12" />
            <div className="text-black">
                <p className="text-xl font-medium">{name}</p>
            </div>
        </a>
     );
}
 
export default ArtistLabel;