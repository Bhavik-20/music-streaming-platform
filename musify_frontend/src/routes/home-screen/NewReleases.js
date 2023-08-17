import { Card, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchNewReleases } from "../../spotify-hook/spotifyApi";


const NewReleases = () => {
    const [albums, setAlbums] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const albumData = await fetchNewReleases();
                console.log("Fetched album items:", albumData); // Add this line
                setAlbums(albumData.albums.items.slice(0, 5));
            } catch (error) {
                console.error("Error fetching albums:", error);
            }
        };
        fetchAlbums();
    }, []);

    return (
        <div>
        <Row className="mx-2 row row-cols-6">
        {albums.map((album, i) => {
          return (
              <Card
                onClick={(e) => {
                  e.preventDefault();
                    navigate(`/albums/${album.id}`);
                
                }}
              
              >
                <Card.Img src={album.images[0].url} />
                <Card.Body>
                  <Card.Title >{album.name} </Card.Title>
                </Card.Body>
              </Card>
          );
        })}
      </Row>
      </div>
    );
}

export default NewReleases;