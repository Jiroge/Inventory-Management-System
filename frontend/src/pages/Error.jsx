
import PropTypes from 'prop-types';

export default function ErrorPage({ errorMessage }) {
  return (
    <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
      <p>Unable to load inventory items. Please try again later.</p>
      <p>{errorMessage}</p>
    </div>
  );
}

ErrorPage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

