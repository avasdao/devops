/* Import modules. */
import createUnsignedInput from './createUnsignedInput'
import parseWIF from './parseWIF'
import unlockP2PKHInput from './unlockP2PKHInput'

/**
 * Create a transaction.
 *
 * @function
 *
 * @param privateKeyWIF  {string}                     Private Key in WIF format.
 * @param unspentOutputs {AddressListUnspentResponse} Prefix (in hex) to precede data.
 * @param outputs        {Array<Output>}              Array of outputs to include in transaction.
 *
 * @returns {Promise<Output>}	The OP_RETURN output script.
 */
const createTransaction = async (privateKeyWIF, unspentOutputs, outputs) => {
    // Parse the private key wif into the keypair and address.
    const [ privateKey, publicKey, returnAddress ] = await parseWIF(privateKeyWIF)

    // Convert all coins to the Libauth Input format (unsigned)
    const inputs = [ ...unspentOutputs ].map(createUnsignedInput)

    // Assemble the unsigned transaction.
    const transaction = {
        version: 2,
        inputs,
        outputs,
        locktime: 0,
    }

    // Sign all inputs and add the generated unlocking scripts to the transaction.
    // eslint-disable-next-line require-atomic-updates
    transaction.inputs = await Promise.all(
        transaction.inputs.map(
            (input, inputIndex) => unlockP2PKHInput(
                transaction,
                input,
                inputIndex,
                privateKey,
                publicKey,
                returnAddress,
            )
        )
    )

    // Hex encode the built transaction.
    const encodedTransaction = encodeTransaction(transaction)

    // Return the encoded transaction.
    return encodedTransaction
}

/* Export module. */
export default createTransaction