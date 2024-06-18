import React from 'react';
import './components/Checkout.css'; // Import the CSS file for styling

const CarIntro = () => {
  return (
    <section className="car-banner" id="overview">
      <div className="car-intro">
        <div className="car-show">
          <img src="https://imgd.aeplcdn.com/664x374/n/cw/ec/159099/swift-exterior-right-side-view.jpeg?isig=0&q=80" alt="" />
        </div>
        <div className="car-body">
          <h1>Maruti Suzuki Swift</h1>
          <div className="rating">
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
            <a href="" title=""> 200 reviews | 78 Ratings</a>
          </div>
          <h2 className="car-price"><i className="fa fa-inr" aria-hidden="true"></i> 5.19 Lakh - 8.02 Lakh*</h2>
          <span className="car-span">*Ex-Showroom price in Ahmedabad</span>
          <button className="offerBtn" fdprocessedid="hh7t5i">View More Offers</button>
          <span className="selling"><i className="fa fa-superpowers" aria-hidden="true"></i> 18498 Selling in November.</span>
        </div>
        <div className="car-box">
          <div className="feature-box">
            <img src="https://img.icons8.com/bubbles/60/000000/top-hat.png" alt="feature icon" />
            <h4>1st Selling</h4>
          </div>
          <div className="feature-box">
            <img src="https://img.icons8.com/bubbles/60/000000/gas-station.png" alt="feature icon" />
            <h4>Petrol</h4>
          </div>
          <div className="feature-box">
            <img src="https://img.icons8.com/clouds/60/000000/dashboard.png" alt="feature icon" />
            <h4>1197 cc</h4>
          </div>
          <div className="feature-box">
            <img src="https://img.icons8.com/bubbles/60/000000/automatic-gearbox-warning.png" alt="feature icon" />
            <h4>Manual/Auto</h4>
          </div>
        </div>
      </div>
      <hr />
      <div className="car-review">
        <h3 className="title">Swift Overview</h3>
        <p>It may be larger than its predecessors but the latest model hasn’t veered from the sporty styling template which is synonymous with the Swift name. The size increase has benefited cabin room and it’s actually quite spacious on the inside. However, the all-black theme and small rear windows can make it feel gloomy. Also, its cabin quality is not really special. The Maruti Suzuki Swift’s 83hp, 1.2-litre, petrol engine is refined, peppy and quite enjoyable when paired with the 5-speed manual gearbox. The petrol-AMT unit also works well enough in average city conditions. Ride and handling are good, though the latest model is not as sharp as the older Swifts.</p>
        <h3 className="title">Swift Specification</h3>
        <p>India’s most-loved car, the Swift is also the model that changed Maruti Suzuki’s image forever. Now in its third generation, the Swift has grown in size and seemingly, so has its popularity – the hatch having become a permanent fixture on the best-sellers list. The Swift’s appeal has also widened after the introduction of the automatic transmission options. With Marugi having discontinued diesels for BS6, the Maruti Suzuki Swift is now available only in petrol-manual and petrol-AMT forms.</p>
        <p>The Maruti Swift has 1 Petrol Engine on offer. The Petrol engine is 1197 cc . It is available with the Manual &amp; Automatic transmission. Depending upon the variant and fuel type the Swift has a mileage of 21.21 kmpl. The Swift is a 5 seater hatchback and has length of 3840mm, width of 1735mm and a wheelbase of 2450mm.</p>
        <h3 className="title">Exterior</h3>
        <p>The front fascia of the car includes a new and sporty front bumper with bigger air dam, and fog lamps, which are accompanied by silver strips. The dynamic radiator grille has also been updated with black honeycomb mesh and is embedded with a chrome plated company's symbol. Surrounding this, is the vertical headlight cluster which is equipped with powerful headlamps and turn indicators.<br />
          For the side profile, the new stylish wheel covers add to its elegance, the door handles and ORVMs are in body color and The ORVMs are now equipped with turn indicators, which provide additional safety.<br />
          The rear profile sports a radiant tail light cluster, which has brake lights and turn indicators. It has a 'V' shaped tailgate that is accompanied by a concave windscreen along with a high mounted third brake light. Its body colored bumper also has an additional brake light, which further enhances its safety quotient.
        </p><h3 className="title">Interior</h3>
        <p>The interiors of this Maruti Swift VDI trim now come with a refined black color scheme, which is complimented by a lot of silver accents. It also has sporty wraparound door trims, which further gives a plush appeal to the cabin. The instrument panel has several utility functions like driver seat belt reminder, instantaneous and average fuel consumption info, door closure warning lamp, and tachometer and driver seat belt reminder notification.<br />
          This hatchback is also bestowed upon with modified seats, which are now covered with new fabric upholstery. Furthermore, its rear seat back gets 60:40 split folding facility that adds in making a larger space for luggage. This trim is also bestowed with several utility features like front sun visors, three folding assist grips, and accessory power socket and day/night internal rear view mirror.
        </p>
      </div>
    </section>
  );
};

export default CarIntro;
