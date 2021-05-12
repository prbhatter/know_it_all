import React from 'react';




class LandingPage extends React.Component
{
  
  render()
  {
    
   
    return (
      <div>
       
        <section class="preloader">
            <div class="spinner">

                <span class="spinner-rotate"></span>
                
            </div>
        </section>


      
        <section class="navbar custom-navbar navbar-fixed-top" role="navigation">
            <div class="container">

                <div class="navbar-header">
                      <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                          <span class="icon icon-bar"></span>
                          <span class="icon icon-bar"></span>
                          <span class="icon icon-bar"></span>
                      </button>

                    
                      <a href="#" class="navbar-brand">Know_It_All</a>
                </div>

                
                <div class="collapse navbar-collapse">
                      <ul class="nav navbar-nav navbar-nav-first"> 
                          <li><a href="/dashboard" class="smoothScroll">Home</a></li>
                          <li><a href="#about" class="smoothScroll">About</a></li>
                         
                          <li><a href="#courses" class="smoothScroll">Courses</a></li>
                          <li><a href="#testimonial" class="smoothScroll">Reviews</a></li>
                          <li><a href="#contact" class="smoothScroll">Contact</a></li>
                      </ul>

                      {/* <ul class="nav navbar-nav navbar-right">
                          <li><a href="#"><i class="fa fa-phone"></i> +919123600426</a></li>
                      </ul> */}
                </div>

            </div>
        </section>


      
        <section id="home">
            <div class="row">

                      <div class="owl-carousel owl-theme home-slider">
                          <div class="item item-first">
                                <div class="caption">
                                    <div class="container">
                                          <div class="col-md-6 col-sm-12">
                                              <h1>Doubt Clearing Education Center</h1>
                                              <h3>Our online portal is designed to fit in your industry supporting all-round with latest technologies.</h3>
                                              <a href="#feature" class="section-btn btn btn-default smoothScroll">Discover more</a>
                                          </div>
                                    </div>
                                </div>
                          </div>

                          <div class="item item-second">
                                <div class="caption">
                                    <div class="container">
                                          <div class="col-md-6 col-sm-12">
                                              <h1>Complete your journey with our expert teachers</h1>
                                              <h3>Our teachers are expert in their respective subjects and are here to support everyone.</h3>
                                              <a href="#courses" class="section-btn btn btn-default smoothScroll">Ask A Question</a>
                                          </div>
                                    </div>
                                </div>
                          </div>

                          <div class="item item-third">
                                <div class="caption">
                                    <div class="container">
                                          <div class="col-md-6 col-sm-12">
                                              <h1>Efficient Doubt Clearing Methods</h1>
                                              <h3>Get your questions answered withing hours<a rel="nofollow" href="https://www.facebook.com/templatemo">templatemo</a> page.</h3>
                                              <a href="#contact" class="section-btn btn btn-default smoothScroll">Let's chat</a>
                                          </div>
                                    </div>
                                </div>
                          </div>
                      </div>
            </div>
        </section>


        
        <section id="feature">
            <div class="container">
                <div class="row">

                      <div class="col-md-4 col-sm-4">
                          <div class="feature-thumb">
                                <span>01</span>
                                <h3>Trending Subjects</h3>
                                <p>Known is free education HTML Bootstrap Template. You can download and use this for your website.</p>
                          </div>
                      </div>

                      <div class="col-md-4 col-sm-4">
                          <div class="feature-thumb">
                                <span>02</span>
                                <h3>Books & Library</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing eiusmod tempor incididunt ut labore et dolore magna.</p>
                          </div>
                      </div>

                      <div class="col-md-4 col-sm-4">
                          <div class="feature-thumb">
                                <span>03</span>
                                <h3>Certified Teachers</h3>
                                <p>templatemo provides a wide variety of free Bootstrap Templates for you. Please tell your friends about us. Thank you.</p>
                          </div>
                      </div>

                </div>
            </div>
        </section>


      
        <section id="about">
            <div class="container">
                <div class="row">

                      <div class="col-md-6 col-sm-12">
                          <div class="about-info">
                                <h2>Start your journey to a better life with online doubt clearing portal</h2>

                                <figure>
                                    <span><i class="fa fa-users"></i></span>
                                    <figcaption>
                                          <h3>Professional Experts</h3>
                                          <p>Teachers here to solve your doubts are highly skilled in their respective subjects.</p>
                                    </figcaption>
                                </figure>

                                <figure>
                                    <span><i class="fa fa-certificate"></i></span>
                                    <figcaption>
                                          <h3>Quick Responses</h3>
                                          <p>Get your questions answered within few hours</p>
                                    </figcaption>
                                </figure>

                                <figure>
                                    <span><i class="fa fa-bar-chart-o"></i></span>
                                    <figcaption>
                                          <h3>Free of cost</h3>
                                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint ipsa voluptatibus.</p>
                                    </figcaption>
                                </figure>
                          </div>
                      </div>

                      <div class="col-md-offset-1 col-md-4 col-sm-12">
                          <div class="entry-form">
                               
                                    <h2>Contact Us</h2>
                                    <input type="text" name="full name" class="form-control" placeholder="Full name" required="" />

                                    <input type="email" name="email" class="form-control" placeholder="Your email address" required="" />

                                    <input type="password" name="password" class="form-control" placeholder="Your message" required="" />

                                    <button class="submit-btn form-control" id="form-submit">Get started</button>
                             
                          </div>
                      </div>

                </div>
            </div>
        </section>


      
        <section id="team">
            <div class="container">
                <div class="row">

                      <div class="col-md-12 col-sm-12">
                          <div class="section-title">
                                <h2>Developers<small>Meet Professional Developers</small></h2>
                          </div>
                      </div>

                      <div class="col-md-3 col-sm-6">
                          <div class="team-thumb">
                                <div class="team-image">
                                    <img src="assets/images/author-image1.jpg" class="img-responsive" alt="" />
                                </div>
                                <div class="team-info">
                                    <h3>Ansh Pasari</h3>
                                    <span>I love Development</span>
                                </div>
                                <ul class="social-icon">
                                    <li><a href="#" class="fa fa-facebook-square" attr="facebook icon"></a></li>
                                    <li><a href="#" class="fa fa-twitter"></a></li>
                                    <li><a href="#" class="fa fa-instagram"></a></li>
                                </ul>
                          </div>
                      </div>

                      <div class="col-md-3 col-sm-6">
                          <div class="team-thumb">
                                <div class="team-image">
                                    <img src="assets/images/author-image2.jpg" class="img-responsive" alt="" />
                                </div>
                                <div class="team-info">
                                    <h3>Pradyumn Bhatter</h3>
                                    <span>Development is my first love</span>
                                </div>
                                <ul class="social-icon">
                                    <li><a href="#" class="fa fa-google"></a></li>
                                    <li><a href="#" class="fa fa-instagram"></a></li>
                                </ul>
                          </div>
                      </div>

                </div>
            </div>
        </section>


        
        <section id="courses">
            <div class="container">
                <div class="row">

                      <div class="col-md-12 col-sm-12">
                          <div class="section-title">
                                <h2>Popular Subjects <small>Upgrade your skills and knowledge</small></h2>
                          </div>

                          <div className="owl-carousel owl-theme owl-courses">
                                <div class="col-md-4 col-sm-4">
                                    <div class="item">
                                          <div class="courses-thumb">
                                              <div class="courses-top">
                                                    <div class="courses-image">
                                                        <img src="assets/images/courses-image1.jpg" class="img-responsive" alt="" />
                                                    </div>
                                                    <div class="courses-date">
                                                        <span><i class="fa fa-calendar"></i> 12 / 7 / 2018</span>
                                                        <span><i class="fa fa-clock-o"></i> 7 Hours</span>
                                                    </div>
                                              </div>

                                              <div class="courses-detail">
                                                    <h3><a href="#">Physics</a></h3>
                                                    <p>Physics is an attempt conceptually to grasp reality as something that is considered to be independent of its being observed. In this sense one speaks of physical reality.</p>
                                              </div>

                                              <div class="courses-info">
                                                    <div class="courses-author">
                                                        <img src="assets/images/author-image1.jpg" class="img-responsive" alt="" />
                                                        <span>Albert Einstein</span>
                                                    </div>
                                                    <div class="courses-price">
                                                        <a href="#"><span>Free</span></a>
                                                    </div>
                                              </div>
                                          </div>
                                    </div>
                                </div>

                                <div class="col-md-4 col-sm-4">
                                    <div class="item">
                                          <div class="courses-thumb">
                                              <div class="courses-top">
                                                    <div class="courses-image">
                                                        <img src="assets/images/courses-image2.jpg" class="img-responsive" alt="" />
                                                    </div>
                                                    <div class="courses-date">
                                                        <span><i class="fa fa-calendar"></i> 20 / 7 / 2018</span>
                                                        <span><i class="fa fa-clock-o"></i> 4.5 Hours</span>
                                                    </div>
                                              </div>

                                              <div class="courses-detail">
                                                    <h3><a href="#">Chemistry</a></h3>
                                                    <p>Chemistry can be a good and bad thing. Chemistry is good when you make love with it. Chemistry is bad when you make crack with it.</p>
                                              </div>

                                              <div class="courses-info">
                                                    <div class="courses-author">
                                                        <img src="assets/images/author-image2.jpg" class="img-responsive" alt="" />
                                                        <span>Adam Sandler</span>
                                                    </div>
                                                    <div class="courses-price">
                                                        <a href="#"><span>Free</span></a>
                                                    </div>
                                              </div>
                                          </div>
                                    </div>
                                </div>

                                <div class="col-md-4 col-sm-4">
                                    <div class="item">
                                          <div class="courses-thumb">
                                              <div class="courses-top">
                                                    <div class="courses-image">
                                                        <img src="assets/images/courses-image3.jpg" class="img-responsive" alt="" />
                                                    </div>
                                                    <div class="courses-date">
                                                        <span><i class="fa fa-calendar"></i> 15 / 8 / 2018</span>
                                                        <span><i class="fa fa-clock-o"></i> 6 Hours</span>
                                                    </div>
                                              </div>

                                              <div class="courses-detail">
                                                    <h3><a href="#">Mathematics</a></h3>
                                                    <p>Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding</p>
                                              </div>

                                              <div class="courses-info">
                                                    <div class="courses-author">
                                                        <img src="assets/images/author-image3.jpg" class="img-responsive" alt="" />
                                                        <span>Joseph Fourier</span>
                                                    </div>
                                                    <div class="courses-price free">
                                                        <a href="#"><span>Free</span></a>
                                                    </div>
                                              </div>
                                          </div>
                                    </div>
                                </div>


                          </div>
                      </div>
                </div>
            </div>
        </section>


      
        <section id="testimonial">
            <div class="container">
                <div class="row">
                      <div class="col-md-12 col-sm-12">
                          <div class="section-title">
                                <h2>Reviews <small>from around the world</small></h2>
                          </div>

                          <div class="owl-carousel owl-theme owl-client">
                                <div class="col-md-4 col-sm-4">
                                    <div class="item">
                                          <div class="tst-image">
                                              <img src="assets/images/tst-image1.jpg" class="img-responsive" alt="" />
                                          </div>
                                          <div class="tst-author">
                                              <h4>Raj</h4>
                                              <span>Physics Teacher</span>
                                          </div>
                                          <p>You really do help young creative minds to get quality education and professional job search assistance. I’d recommend it to everyone!</p>
                                          <div class="tst-rating">
                                              <i class="fa fa-star"></i>
                                              <i class="fa fa-star"></i>
                                              <i class="fa fa-star"></i>
                                              <i class="fa fa-star"></i>
                                              <i class="fa fa-star"></i>
                                          </div>
                                    </div>
                                </div>

                                <div class="col-md-4 col-sm-4">
                                    <div class="item">
                                          <div class="tst-image">
                                              <img src="assets/images/tst-image2.jpg" class="img-responsive" alt="" />
                                          </div>
                                          <div class="tst-author">
                                              <h4>Monika</h4>
                                              <span>Student</span>
                                          </div>
                                          <p>Trying something new is exciting! Thanks for this amzing platform and the great teacher who was able to make it interesting.</p>
                                          <div class="tst-rating">
                                              <i class="fa fa-star"></i>
                                              <i class="fa fa-star"></i>
                                              <i class="fa fa-star"></i>
                                          </div>
                                    </div>
                                </div>

                                <div class="col-md-4 col-sm-4">
                                    <div class="item">
                                          <div class="tst-image">
                                              <img src="assets/images/tst-image3.jpg" class="img-responsive" alt="" />
                                          </div>
                                          <div class="tst-author">
                                              <h4>Guru</h4>
                                              <span>Student</span>
                                          </div>
                                          <p>I've never come through such an amazing portal and I cannot express how great the teachers were and the overall answers to my questions. I would defintely recommend this to my friends. Thank you!</p>
                                          <div class="tst-rating">
                                              <i class="fa fa-star"></i>
                                              <i class="fa fa-star"></i>
                                              <i class="fa fa-star"></i>
                                              <i class="fa fa-star"></i>
                                          </div>
                                    </div>
                                </div>

                                <div class="col-md-4 col-sm-4">
                                    <div class="item">
                                          <div class="tst-image">
                                              <img src="assets/images/tst-image4.jpg" class="img-responsive" alt="" />
                                          </div>
                                          <div class="tst-author">
                                              <h4>Saurabh</h4>
                                              <span>Web Developer</span>
                                          </div>
                                          <p>This was my first time getting my doubts cleared in this format and it far exceeded my expectations.</p>
                                          <div class="tst-rating">
                                              <i class="fa fa-star"></i>
                                              <i class="fa fa-star"></i>
                                              <i class="fa fa-star"></i>
                                              <i class="fa fa-star"></i>
                                          </div>
                                    </div>
                                </div>

                          </div>
                      </div>
                  </div>
            </div>
        </section> 


      
        <section id="contact">
            <div class="container">
                <div class="row">

                      <div class="col-md-6 col-sm-12">
                          <form id="contact-form" role="form">
                                <div class="section-title">
                                    <h2>Contact us <small>we love conversations. let us talk!</small></h2>
                                </div>

                                <div class="col-md-12 col-sm-12">
                                    <input type="text" class="form-control" placeholder="Enter full name" name="name" required="" />
                      
                                    <input type="email" class="form-control" placeholder="Enter email address" name="email" required="" />

                                    <textarea class="form-control" rows="6" placeholder="Tell us about your message" name="message" required=""></textarea>
                                </div>

                                <div class="col-md-4 col-sm-12">
                                    <input type="button" class="form-control" name="send message" value="Send Message" />
                                </div>

                          </form>
                      </div>

                      <div class="col-md-6 col-sm-12">
                          <div class="contact-image">
                                <img src="assets/images/contact-image.jpg" class="img-responsive" alt="Smiling Two Girls" />
                          </div>
                      </div>

                </div>
            </div>
        </section>       


      
        <footer id="footer">
            <div class="container">
                <div class="row">

                      <div class="col-md-4 col-sm-6">
                          <div class="footer-info">
                                <div class="section-title">
                                    <h2>Headquarter</h2>
                                </div>
                                <address>
                                    <p>Bangur Avenue Block C-182<br /> 3rd Floor,Kolkata,700055</p>
                                </address>

                                <ul class="social-icon">
                                    <li><a href="#" class="fa fa-facebook-square" attr="facebook icon"></a></li>
                                    <li><a href="#" class="fa fa-twitter"></a></li>
                                    <li><a href="#" class="fa fa-instagram"></a></li>
                                </ul>

                                <div class="copyright-text"> 
                                    <p>Copyright &copy; 2022 Company Name</p>
                                    
                                    <p>Design: By Ansh</p>
                                </div>
                          </div>
                      </div>

                      <div class="col-md-4 col-sm-6">
                          <div class="footer-info">
                                <div class="section-title">
                                    <h2>Contact Info</h2>
                                </div>
                                <address>
                                    <p>+919123600426, +917980327218</p>
                                    <p><a href="mailto:youremail.co">anshpasari406@gmail.com</a></p>
                                </address>

                                <div class="footer_menu">
                                    <h2>Quick Links</h2>
                                    <ul>
                                          <li><a href="#">Career</a></li>
                                          <li><a href="#">Investor</a></li>
                                          <li><a href="#">Terms & Conditions</a></li>
                                          <li><a href="#">Refund Policy</a></li>
                                    </ul>
                                </div>
                          </div>
                      </div>

                
                      
                </div>
            </div>
        </footer>
  </div>
) } }
 export default LandingPage;