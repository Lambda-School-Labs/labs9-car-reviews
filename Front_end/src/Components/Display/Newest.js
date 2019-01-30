import React, { Component } from 'react';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import NewReleaseCard from './NewReleaseCard';
import { Container, Card } from 'reactstrap';

const url = 'https://api.spotify.com/v1/search?q=tag%3Anew&type=album';

class Newest extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
    constructor(props) {
        super(props);
        this.state = { 
            data: []
         }
    }

componentDidMount() {
    let access_token = this.props.cookies.get('access_token');
    axios
        .get(url, { 'headers': { 'Authorization': 'Bearer ' + access_token } })
        .then(response => {
            this.setState({
              data: response.data.albums.items,
            })
        })
        .catch(function(error) {
            console.log(error)
        })
    }

    render() {
        const renderData = this.state.data.map(album => {
            return album.artists.map((artist, index) => {
              return (
                
                    <NewReleaseCard
                        key = {index} 
                        album = {album.name}
                        artist = {artist.name}
                        date = {album.release_date}
                        image = {album.images[0].url}
                        id = {album.id}
                    
                    />
              )
        })
    })

        return (
            <Container md="3" xs="12" style={{
                        overflow: "hidden",
                        textAlign: "center",
                        padding: "2rem 1rem 0 1rem",
                        margin: "0 auto",
                        padding: "2rem 0",
                        fontFamily: "Lato",
                    }}
                >
                <Card>
                    <h1 style={{
                            color: "#EAC67A", 
                            backgroundColor: '#233237',
                            border: "2px solid #eac67a",
                            marginBottom:'-0.5rem',
                            lineHeight: '2.2',
                            textShadow: "-1px -1px 0 #984b43, 1px -1px 0 #984b43,-1px 1px 0 #984b43, 1px 1px 0 #984b43"
                        }}
                    >
                        Latest Releases
                    </h1>
                    <div className="d-flex flex-row flex-nowrap align-items-center" 
                    style = {{overflow: 'auto', WebkitOverflowScrolling: 'touch', backgroundColor:'#233237'}} >
                        {renderData}
                    </div>
                </Card>
            </Container>
        );
    }
}
 
export default withCookies(Newest);