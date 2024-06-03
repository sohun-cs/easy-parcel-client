import PropTypes from 'prop-types';



const HeaderTitles = ({ heading, subHeading }) => {
    return (
        <div className="max-w-2xl mx-auto text-center mb-14">
            <h3 className="text-black text-3xl font-semibold sm:text-4xl">
                {heading}
            </h3>
            <p className="mt-3 text-gray-700">
                {subHeading}
            </p>
        </div>
    );
};

export default HeaderTitles;


HeaderTitles.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string
}