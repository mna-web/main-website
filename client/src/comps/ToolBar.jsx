import React from 'react';
import SearchStories from './SearchStories.jsx';
import FilterLocation from './FilterLocation.jsx';

function ToolBar(props) {
  // const onWriteStoryClick = () => {
    
  // }

  return (
    <div id="toolbar">
      <div className="new-story">
        <h1>Write an Article</h1>
        <span>
          {'Everyone\'s voice needs to be heard to build a strong community and every member has a duty to contribute their ideas!'}
        </span>
      </div>
      <SearchStories />
      <div className="toolbar-button">
        <span>Search for Stories</span>
      </div>
      <FilterLocation />
      <div className="toolbar-button">
        <span>Filter by Location</span>
      </div>
    </div>
  );
}

export default ToolBar;
