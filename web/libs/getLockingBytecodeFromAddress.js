/* Import modules. */
import {
    base58AddressToLockingBytecode,
    cashAddressToLockingBytecode,
    instantiateSha256,
} from '@bitauth/libauth'

/**
 * Converts an address to its locking byte-code equivalent.
 *
 * @function
 *
 * @param address {string} Bitcoin Cash address.
 *
 * @returns {Uint8Array} The locking code for the given address.
 */
const getLockingBytecodeFromAddress = async (address) => {
    // Initialize an empty error message, that we can use to display after we exhausted our options.
    let errorMessages = ''

    try {
        // Add a prefix if necessary.
        let prefix = ''

        if (!address.startsWith('bitcoincash:')) {
            prefix = 'bitcoincash:'
        }

        const lockScriptResult = cashAddressToLockingBytecode(prefix + address)

        // Throw an error in case of failure (which we'll catch and ignore).
        if(typeof lockScriptResult === 'string') {
            throw(new Error(`Cannot decode '${address}' as a cash address: ${lockScriptResult}`))
        }

        return lockScriptResult.bytecode
    } catch (error) {
        // Store the error message, but otherwise do nothing.
        errorMessages += error
    }

    try {
        // Attempt to decode the address as a base58 legacy address.
        const sha256 = await instantiateSha256()
        const lockScriptResult = base58AddressToLockingBytecode(sha256, address)

        // Throw an error in case of failure (which we'll catch and ignore).
        if (typeof lockScriptResult === 'string') {
            throw(new Error(`Cannot decode '${address}' as a base58 address: ${lockScriptResult}`));
        }

        return lockScriptResult.bytecode
    } catch (error) {
        // Store the error message, but otherwise do nothing.
        errorMessages += error
    }

    // Throw an error, including the the most recent error message in case the address could not be decoded with either address type.
    throw(new Error(`Failed to decode '${address}': ${errorMessages}`));
}

/* Export module. */
export default getLockingBytecodeFromAddress
