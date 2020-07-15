import React from 'react';


export class Home extends React.Component {
  constructor() {
    super();
    this.state = { apiresults: [], 
                   //apiplaylists: [],
                   allPlaylist : null,
                  selectedPlaylist : null,
                  playlist_id :"",
                  playlist_id_track_id: ""
                  };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddToFavorite = this.handleAddToFavorite.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this)
  
  }

  componentDidMount() {
    fetch(`https://api.discogs.com/database/search?key=rBjkCdZMSGeNOmFemtuN&secret=lrkBhSgCqsZYelAmUIcHnWvApGtlujMp&artist="+nirvana+"&country=canada"`)
      .then(response => response.json())
      .then(data => {
        this.setState({ apiresults: data.results })
        console.log(this.state.apiresults);
      });
      fetch(`http://localhost:8080/api/playlists`)
      .then(response => response.json())
      .then(json =>this.fetchSuccess(json));
  }
  fetchSuccess(jsonResult){
    //console.log('discogs data-->',jsonResult)
     this.playlist = jsonResult
     const data = jsonResult.map((playlist=> <option key={playlist.id} name ={playlist.value} value={playlist.id}>{playlist.title}</option>))
     this.setState({
      allPlaylist: data
     })
  }


  handleSubmit(e) {
    e.preventDefault();
    const searchText = e.target.search.value;
    fetch(`https://api.discogs.com/database/search?key=rBjkCdZMSGeNOmFemtuN&secret=lrkBhSgCqsZYelAmUIcHnWvApGtlujMp&artist="+`+searchText+`+"&country=canada"`)
      .then(response => response.json())
      .then(data => {
        this.setState({ apiresults: data.results })
      });
  }

  handleAddToFavorite(id,title, uri, masterid,thumb) {
    //e.preventDefault();
    console.log('fav title-->', title);
    console.log('fav uri-->', uri);
    console.log('fav master_id-->', masterid);

    if (id == this.state.playlist_id_track_id) {
      console.log('playlistiid for this is  -->', this.state.playlist_id);
    } else {
      console.log('playlistiid for this is  -->', 1);
    }

    //   fetch('http://localhost:8080/api/tracks', {
    //   method: 'post',
    //   body: JSON.stringify([title,uri,master_id,playList_id])
    // }).then(function(response) {
    //   return response.json();
    // }).then(function(data) {

    // });

    (async () => {
      const rawResponse = await fetch('http://localhost:8080/api/tracks', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          title: title,
          uri: uri,
          master_id: masterid,
          playlist_id: id == this.state.playlist_id_track_id ? this.state.playlist_id : 1,
          thumb : thumb
        })
      });
      const content = await rawResponse.json();

      console.log("post data",content);
    })();
    alert("The track has been added in the Favorites!");
  }
  handleDropdownChange(event){
    console.log("Playlist value -- >" + event.target.value)
    console.log("custom attr value -- >" + event.target.getAttribute('custom-attribute'));
    this.setState({playlist_id:event.target.value});
    this.setState({playlist_id_track_id:event.target.getAttribute('custom-attribute')});
  }
  handleSubmitForm= (event) =>{
    event.preventDefault();
    console.log("form submit",event.target) ;
  }
render() {

    let rowHtml = <div>{this.state.apiresults.map(item => <ul key={item.id}> <div className="music-row">
      <img src={item.thumb} alt="music-thumb"/>
      <div className="music-title">
        {item.title}<br />
        
      <a href= "http://www.discogs.com{item.uri}" target="_blank">
      More Information
      </a>
      </div>
      
      {/* <select value={this.state.playlist_id} onChange={this.handleChange}>
        {this.state.allPlaylist}
      </select> 
      <button onClick={() => this.handleAddToFavorite(item.title,item.uri,item.master_id)} className="button favorites-button">Add to Favorites</button> */}
      <select custom-attribute={item.id} value={item.id == this.state.playlist_id_track_id ? this.state.playlist_id : 1} 
        onChange={this.handleDropdownChange} className="dropdown">
        {this.state.allPlaylist}
      </select>

      <button onClick={() => this.handleAddToFavorite(item.id, item.title,item.uri,item.master_id, item.thumb)} className="button favorites-button">Add to Favorites</button>

    </div></ul>)}
    </div>;

    return <div>
      <div className="music-list">
        <ul className="list-group">
          {rowHtml}
        </ul>
      </div>
      <div className="search-form">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="search" placeholder="Search.." ref="search" />
        </form>
      </div>
    </div>

  }
}