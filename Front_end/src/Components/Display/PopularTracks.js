import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { Row, Col, Card, CardImg, Container } from 'reactstrap';

const tracksHeader = {
    textAlign: 'center',
    fontSize: "1.5rem",
    textShadow: "-1px -1px 0 #984b43, 1px -1px 0 #984b43,-1px 1px 0 #984b43, 1px 1px 0 #984b43"
}

const url = 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF';
 // TOP50 most playable tracks in the world
class PopularTracks extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
         }
    }

    componentDidMount() {
        let access_token = this.props.cookies.get('access_token');
        axios
        .get(url, { 'headers': { 'Authorization': 'Bearer ' + access_token } })
          .then(response => {
            this.setState({
              data: response.data.tracks.items,
            })
          })
          .catch(function(error) {
            console.log(error)
          })
      }

    render() {
        const image = '../../Images/songbird.png';
        const renderData = 
            <Container xs="3" md="4" fluid style={{
                maxWidth: "1200px",
                padding: "2rem 0 5rem 0",
                fontFamily:'Lato',
                backgroundColor:'#233237',
                border: "2px solid #eac67a",
            }}>
                <Row>
                    <h1 style={{
                            color: "#eac67a",
                            margin: "0 auto",
                            padding: "2rem",
                            fontFamily:'Merriweather Sans',
                            textShadow: "-1px -1px 0 #984b43, 1px -1px 0 #984b43,-1px 1px 0 #984b43, 1px 1px 0 #984b43"
                        }}
                    >
                        Popular Tracks
                    </h1>
                </Row>
                <Row>
                    <Col style={{ overflow: "hidden", textAlign: "center", padding: "2rem 1rem 0 1rem" }}>
                        <Row style = {{ marginBottom: '15px', color: "#eac67a" }}>
                        {/* <Col xs="12" md="4" style={{padding: "2rem 1rem 0 1rem" }}> */}
                            <Col xs="4" style={ tracksHeader }>Art</Col>
                            <Col xs="4" style={ tracksHeader }>Track Name</Col>
                            <Col xs="4" style={ tracksHeader }>Artist Name</Col>
                        </Row>
                            {this.state.data.map(data => {
                                return data.track.artists.map(artist => {
                                    if (data.track.popularity > 95) {
                                    return data.track.album.images.length === 0 ? null : 
                                        <NavLink to={`/tracks/${data.track.id}`} style={{ textDecoration: "none" }}>
                                            <Row key = {data.track.id} style={{ 
                                                    maxWidth: '1600px',
                                                    textAlign: 'center',
                                                    padding: '1rem',
                                                    color:'#eac67a'
                                                }}
                                            >
                                                <Col xs="4">
                                                    <CardImg src= {!data.track.album.images[0] ? image : data.track.album.images[0].url}
                                                            alt = {data.track.name} style = {{borderRadius: '50%', maxWidth: '7rem'}}
                                                    />  
                                                </Col>
                                                {/* <Col sm={1} className="d-flex align-items-center">{data.track.popularity}</Col> */}
                                                <Col xs="5" className="d-flex align-items-center">{data.track.name}</Col>
                                                <Col xs="3" className="d-flex align-items-center">{artist.name}</Col>
                                            </Row>
                                        </NavLink>
                                    }
                                })
                            })}
                    </Col>
                </Row>
            </Container>
        return (
            <Container>
                <Card style={{ border: "none" }}>
                    {renderData}   
                </Card>
            </Container>
         );
    }
}
 
export default withCookies(PopularTracks);