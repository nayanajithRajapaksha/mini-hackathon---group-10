/* Simple footer with project name and course info */
function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-brand-wrap">
          <img src="/Parking_Pulse.png" alt="ParkingPulse LK" className="footer-logo" />
          <span className="footer-brand">ParkingPulse LK</span>
        </div>
        <p className="footer-course">SE3090 Mini Hackathon &bull; Smart Parking for Kandy</p>
      </div>
    </footer>
  );
}

export default Footer;
