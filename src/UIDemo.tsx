import * as React from 'react';
import SearchBar from './components/SearchBar';

class UIDemo extends React.Component {
  searchHandler = (e: string) => {
    console.log(e);
  };

  handleChange = (searchText: string) => {
    console.log(searchText);
  };

  render() {
    return (
      <div>
        <SearchBar onRequestSearch={this.searchHandler} placeholder="Search" />
      </div>
    );
  }
}

export default UIDemo;
