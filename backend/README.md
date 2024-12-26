/**
 * Registers a new principal in the system.
 * 
 * @async
 * @function registerPrincipal
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing principal details
 * @param {string} req.body.name - Name of the principal
 * @param {string} req.body.email - Email of the principal
 * @param {string} req.body.password - Password for the principal account
 * @param {string} req.body.contactNumber - Contact number of the principal
 * @param {string} req.body.gender - Gender of the principal
 * @param {Object} res - Express response object
 * @returns {Object} JSON response
 * 
 * @throws {Error} If there's an issue with the registration process
 * 
 * @description
 * This function handles the registration of a new principal. It performs the following steps:
 * 1. Validates that all required fields are provided
 * 2. Checks if a principal with the given contact number already exists
 * 3. Hashes the provided password
 * 4. Creates a new principal record in the database
 * 5. Generates a JWT token for the new principal
 * 6. Returns the created principal's details along with the token
 * 
 * @example
 * // Example usage in a route
 * router.post('/register', registerPrincipal);
 */
async function registerPrincipal(req, res) {
    // ... function implementation ...
}