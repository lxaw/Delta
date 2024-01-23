import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Cart = (props) => {
  // Mock array to store items
  const mockItems = [
    {
      title: 'Product 1',
      description: 'Description for Product 1',
      numReviews: 10,
      averageReview: 4.5,
      downloadCount: 50,
    },
    {
      title: 'Product 2',
      description: 'Description for Product 2',
      numReviews: 15,
      averageReview: 4.2,
      downloadCount: 30,
    },
    // Add more items as needed
  ];

  return (
    <div className="container">
      <h1>Your Cart</h1>
      <p>
        Here are all the items in your cart. Press the X to remove an item, and
        hit the cloud icon when you are ready to download everything. You can
        also download each item individually by clicking their download buttons.
      </p>

      {/* Bootstrap grid layout */}
      <div className="row">
        {mockItems.map((item, index) => (
          <div key={index} className="col-md-4 mb-4">
            {/* Bootstrap card */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <p>Reviews: {item.numReviews}</p>
                <p>Average Review: {item.averageReview} out of 5</p>
                <p>Download Count: {item.downloadCount}</p>
                {/* Add remove, download buttons here if needed */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Cart);
