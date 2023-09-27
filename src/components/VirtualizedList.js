// Importing necessary modules from React and other packages.
import React, { useState, useEffect, useRef } from 'react';
import { faker } from '@faker-js/faker'; // Importing a faker library for generating fake data.
import '../styles/VirtualizedList.css'; // Importing a CSS file for styling.

// Functional component named VirtualizedList.
const VirtualizedList = () => {
  const listRef = useRef(null); // Creating a ref to the list container element.
  const [listData, setListData] = useState([]); // State to hold the list data.
  const [showScrollButton, setShowScrollButton] = useState(false); // State to control visibility of scroll button.
  const [loading, setLoading] = useState(true); // State to track loading status.

  // Function to generate fake data with a specified count.
  const generateFakeData = (count) => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        price: faker.commerce.price(),
      });
    }
    return data;
  };

  // useEffect hook to run code after the component is mounted.
  useEffect(() => {
    // Generate fake data and set it in the listData state.
    const data = generateFakeData(10000);
    setListData(data);
    setLoading(false); // Set loading to false after data is loaded.
  }, []); // Empty dependency array means this effect runs only once on mount.

  const itemHeight = 5; // Height of each list item (in em).

  // Event handler for scrolling.
  const handleScroll = () => {
    if (listRef.current) {
      const scrollTop = listRef.current.scrollTop;
      setShowScrollButton(scrollTop > 100); // Show scroll button when scrolled down 100 pixels.
    }
  };

  // Function to scroll to the top of the list.
  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  // Function to add a new item to the list.
  const addNewItem = () => {
    const newItem = {
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price(),
    };
    setListData((prevData) => [newItem, ...prevData]);
  };

  // Skeleton component for displaying loading state.
  const Skeleton = () => {
    return (
      <div className="skeleton">
        <div className="skeleton-row"></div>
        <div className="skeleton-row"></div>
        <div className="skeleton-row"></div>
        <div className="skeleton-row"></div>
        <div className="skeleton-row"></div>
        <div className="skeleton-row"></div>
      </div>
    );
  };

  // JSX code for rendering the component.
  return (
    <div className="virtualized-list">
      <div className="list-header">
        <h1 className='title'>Virtualized List</h1>
        <button className='add-button' onClick={addNewItem}>Add New Item</button>
      </div>
      <div className="table-header">
        <div className="list-item">Item</div>
        <div className="list-item">Description</div>
        <div className="list-item">Price</div>
      </div>
      <div
        className="list-container"
        onScroll={handleScroll}
        ref={listRef}
      >
        {loading ? (
          <Skeleton />
        ) : (
          <div style={{ height: `${listData.length * itemHeight}em` }}>
            {listData.map((item, index) => (
              <div className="list-row" key={index}>
                <div className="list-item">{item.name}</div>
                <div className="list-item">{item.description}</div>
                <div className="list-item">€ {item.price}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showScrollButton && (
        <button className="scroll-top-button" onClick={scrollToTop}>
          Scroll to Top
        </button>
      )}
    </div>
  );
};

export default VirtualizedList;
