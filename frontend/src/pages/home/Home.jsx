import Explore from "../../components/explore/Explore";
import InspectedRoom from "../../components/inspectedRoom/InspectedRoom";
import Offers from "../../components/offers/Offers";
import TrandingDetination from "../../components/trandingDestination/TrandingDestination";
import DiscoverCity from "../../components/discover/DiscoverCity";
import HotelCategories from "../../components/hotelCategories/HotelCategories";
import Hotels from "../../components/hotels/Hotels";
import HotelDeals from "../../components/hotelDeals/HotelDeals";
import Footer from "../../components/footer/Footer";

export default function Home() {
  return (
    <>
      <Offers />
      <HotelDeals />
      <Hotels />
      <HotelCategories />
      <TrandingDetination />
      <Explore />
      <InspectedRoom />
      <DiscoverCity />
      <Footer />
    </>
  );
}
