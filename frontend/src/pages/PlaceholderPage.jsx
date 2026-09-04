import { Link } from 'react-router-dom';

/* Temporary placeholder page for features not yet built */
function PlaceholderPage({ feature, notFound }) {
  return (
    <div className="placeholder-page">
      <h1>{notFound ? '404 — Page Not Found' : feature}</h1>
      <p>
        {notFound
          ? 'The page you are looking for does not exist.'
          : 'This feature is coming soon.'}
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}

export default PlaceholderPage;
