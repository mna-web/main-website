import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../actions/actions';
// import ControlledCarousel from './banners/ControlledCarousel.jsx';

class Landing extends Component {
  componentWillMount() {}

  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push('/dashboard');
    // }
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    // if (this.props.stories.filterBy.topStories.items.length === 0) return null;

    return (
      <div className="landing">
        <div className="landing-inner text-light">
          <div className="container-fluid">
            <div className="row">
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-ride="carousel"
                data-interval="10000"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="container-fluid banner1">
                      <h1 className="display-3">MNA Web Services</h1>
                      <p className="lead">High quality, dynamic web content on demand</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="container-fluid banner2">
                      <div className="banner2-content">
                        <h1 className="display-3">cloud server integration</h1>
                        <p className="lead">
                          we use amazon web services or heroku to seamlessly deploy your website
                          live
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="container-fluid banner3">
                      <h1 className="display-3">keep it simple</h1>
                      <p className="lead">
                        we take the pain out of setting up your website so you can focus on the
                        business
                      </p>
                      <p className="info">
                        we do everything from simple, static, informational sites to full dynamic
                        web application including database implementation
                      </p>
                    </div>
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true" />
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true" />
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 text-center landing-row1">
                <h1 className="display-3">first row</h1>
                <p className="lead">maybe some nice icons of the types of software we work with</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 text-center landing-row2">
                <div className="landing-row2-content">
                  <h1 className="display-3">second row</h1>
                  <p className="lead">maybe another banner or sliding banner</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 text-center landing-row3">
                <h1 className="display-3">third row</h1>
                <p className="lead">third row stuff</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 text-center landing-row4">
                <h1 className="display-3">fourth row</h1>
                <p className="lead">fourth row stuff</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  // errors: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
