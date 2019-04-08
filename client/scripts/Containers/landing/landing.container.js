import React, { Component } from 'react';
import slackCleanerLogo from '../../../images/slackCleaner.png';
import '../../../styles/partials/landing.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';

const date = new Date().getFullYear();

class LandingContainer extends Component {

  handleModal = (shouldOpen) => {
    this.props.openModal(shouldOpen);
  };

  render() {

    return (
      <div className={'landing'}>
        <div className="body-wrap boxed-container">
          <header id="landing" className="site-header">
            <div className="container">
              <div className="site-header-inner">
                <div className="brand header-brand">
                  <h1 className="m-0">
                    <a href="#landing">
                      <img height="48px" width="48px" src={slackCleanerLogo} alt={'Slack Cleaner Logo'}/>
                    </a>
                  </h1>
                </div>
              </div>
            </div>
          </header>

          <main>
            <section className="hero">
              <div className="container">
                <div className="hero-inner">
                  <div className="hero-copy">
                    <h1 className="hero-title mt-0">Welcome</h1>
                    <p className="hero-paragraph">
                      Slack Cleaner is your best friend when it comes to files overload in your slack workspace.
                      <br/>
                      The app will help you get rid of files easily.
                    </p>
                    <div className="hero-form field field-grouped">
                      <a href="auth/slack">
                        <img
                          alt="Sign in with Slack"
                          height="40"
                          width="172"
                          src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
                          srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="hero-illustration">
                    <div className="hero-main-shape">
                      <img height="647px" width="940px" src={slackCleanerLogo} alt={'Slack Cleaner Logo'}/>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="features section">
              <div className="container">
                <div className="features-inner section-inner">
                  <div className="features-header text-center">
                    <div className="container-sm">
                      <h2 className="section-title mt-0">Meet the Slack Cleaner</h2>
                      <p className="section-paragraph">The ultimate Slack Files Cleaner.</p>
                    </div>
                  </div>
                  <div className="features-wrap">
                    <div className="feature text-center is-revealing">
                      <div className="feature-inner">
                        <div className="feature-icon" styles="background:#FFD2DA;">
                          <img height="48px" width="48px" src={slackCleanerLogo} alt={'Slack Cleaner Logo'}/>
                        </div>
                        <h4 className="feature-title h3-mobile mb-8">Powerful</h4>
                        <p className="text-sm">A pseudo-Latin text used in web design, layout, and printing in place of
                          English to emphasise design elements.</p>
                      </div>
                    </div>
                    <div className="feature text-center is-revealing">
                      <div className="feature-inner">
                        <div className="feature-icon" styles="background:#FFD8CD;">
                          <img height="48px" width="48px" src={slackCleanerLogo} alt={'Slack Cleaner Logo'}/>
                        </div>
                        <h4 className="feature-title h3-mobile mb-8">Powerful</h4>
                        <p className="text-sm">A pseudo-Latin text used in web design, layout, and printing in place of
                          English to emphasise design elements.</p>
                      </div>
                    </div>
                    <div className="feature text-center is-revealing">
                      <div className="feature-inner">
                        <div className="feature-icon" styles="background:#C6FDF3;">
                          <img height="48px" width="48px" src={slackCleanerLogo} alt={'Slack Cleaner Logo'}/>
                        </div>
                        <h4 className="feature-title h3-mobile mb-8">Powerful</h4>
                        <p className="text-sm">A pseudo-Latin text used in web design, layout, and printing in place of
                          English to emphasise design elements.</p>
                      </div>
                    </div>
                    <div className="feature text-center is-revealing">
                      <div className="feature-inner">
                        <div className="feature-icon" styles="background:#E0E1FE;">
                          <img height="48px" width="48px" src={slackCleanerLogo} alt={'Slack Cleaner Logo'}/>
                        </div>
                        <h4 className="feature-title h3-mobile mb-8">Powerful</h4>
                        <p className="text-sm">A pseudo-Latin text used in web design, layout, and printing in place of
                          English to emphasise design elements.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="testimonials section">
              <div className="container">
                <div className="testimonials-inner section-inner">
                  <h2 className="section-title mt-0 text-center">Testimonials</h2>
                  <div className="testimonials-wrap">
                    <div className="testimonial text-xs is-revealing">
                      <div className="testimonial-inner">
                        <div className="testimonial-main">
                          <div className="testimonial-header">
                            <img className="mb-16" src="dist/images/testimonial-01.png" alt="Testimonial"/>
                          </div>
                          <div className="testimonial-body">
                            <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                              tempor incididunt.</p>
                          </div>
                        </div>
                        <div className="testimonial-footer">
                          <div className="testimonial-link">
                            <a href="#landing">@martajones</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="testimonial text-xs is-revealing">
                      <div className="testimonial-inner">
                        <div className="testimonial-main">
                          <div className="testimonial-header">
                            <img className="mb-16" src="dist/images/testimonial-02.png" alt="Testimonial"/>
                          </div>
                          <div className="testimonial-body">
                            <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                              tempor incididunt.</p>
                          </div>
                        </div>
                        <div className="testimonial-footer">
                          <div className="testimonial-link">
                            <a href="#landing">@michealpahm</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="testimonial text-xs is-revealing">
                      <div className="testimonial-inner">
                        <div className="testimonial-main">
                          <div className="testimonial-header">
                            <img className="mb-16" src="dist/images/testimonial-03.png" alt="Testimonial"/>
                          </div>
                          <div className="testimonial-body">
                            <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                              tempor incididunt.</p>
                          </div>
                        </div>
                        <div className="testimonial-footer">
                          <div className="testimonial-link">
                            <a href="#landing">@markbrown</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="newsletter section text-light">
              <div className="container-sm">
                <div className="newsletter-inner section-inner">
                  <div className="newsletter-header text-center">
                    <h2 className="section-title mt-0">Get to know us</h2>
                    <p className="section-paragraph">
                      Explore our social profiles and get to know us, feel free to contact us.
                      <br/>
                      We are open to suggestions and improvements to this app.
                      <br/>
                      We love open source and interesting projects.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <footer className="site-footer">
            <div className="container">
              <div className="site-footer-inner has-top-divider">
                <div className="brand footer-brand">
                  <a href="#landing">
                    <img height="48px" width="48px" src={slackCleanerLogo} alt={'Slack Cleaner Logo'}/>
                  </a>
                </div>
                <ul className="footer-links list-reset">
                  <li>
                    <a target="_blank" href="https://ngquad.github.io/website">Contact</a>
                  </li>
                  <li>
                    <a target="_blank" href="https://ngquad.github.io/website">About us</a>
                  </li>
                  <li>
                    <a href="#landing" onClick={this.handleModal}>FAQ's</a>
                  </li>
                  <li>
                    <a target="_blank" href="https://ngquad.github.io/website">Support</a>
                  </li>
                </ul>
                <ul className="footer-social-links list-reset">
                  <li>
                    <a target="_blank" href="https://www.facebook.com/ngQuad">
                      <span className="screen-reader-text">Facebook</span>
                      <FontAwesomeIcon icon={faFacebookF} color={'#fff'} size={'2x'}/>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://www.instagram.com/ngquad">
                      <span className="screen-reader-text">Instagram</span>
                      <FontAwesomeIcon icon={faInstagram} color={'#fff'} size={'2x'}/>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://www.linkedin.com/company/ngquad">
                      <span className="screen-reader-text">Linkedin</span>
                      <FontAwesomeIcon icon={faLinkedin} color={'#fff'} size={'2x'}/>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://twitter.com/NgQuad">
                      <span className="screen-reader-text">Twitter</span>
                      <FontAwesomeIcon icon={faTwitter} color={'#fff'} size={'2x'}/>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://github.com/ngQuad">
                      <span className="screen-reader-text">Github</span>
                      <FontAwesomeIcon icon={faGithub} color={'#fff'} size={'2x'}/>
                    </a>
                  </li>
                </ul>
                <div className="footer-copyright">&copy; {date} Slack Cleaner, all rights reserved</div>
              </div>
            </div>
          </footer>
        </div>
      </div>);
  }
}

LandingContainer.propTypes = {
  openModal: PropTypes.func,
};

export default LandingContainer;
