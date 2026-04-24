/**
 * Middleware to render the page with EJS.
 * @param {string} view An ejs file relative to the views folder
 * @param {Object} data Optional data to pass to the view
 * @returns Express route.
 */
module.exports =
    (view, data = {}) =>
    (req, res) => {
        res.render(view, data);
    };
