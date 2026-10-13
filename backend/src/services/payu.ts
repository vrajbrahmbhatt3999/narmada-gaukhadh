import crypto from 'crypto'

/**
 * PayU integration helpers
 * IMPORTANT: Salt and key must NEVER be in frontend code or committed to git.
 * All hash generation and verification happens here, server-side only.
 *
 * Reference: https://devguide.payu.in/payment-gateway/payu-hosted-web/
 */

const PAYU_SANDBOX_URL = 'https://test.payu.in/_payment'
const PAYU_PRODUCTION_URL = 'https://secure.payu.in/_payment'

function getPayUUrl(): string {
  const env = process.env.PAYU_ENV ?? 'sandbox'
  return env === 'production' ? PAYU_PRODUCTION_URL : PAYU_SANDBOX_URL
}

function getPayUKey(): string {
  const key = process.env.PAYU_KEY
  if (!key) throw new Error('PAYU_KEY environment variable is not set')
  return key
}

function getPayUSalt(): string {
  const salt = process.env.PAYU_SALT
  if (!salt) throw new Error('PAYU_SALT environment variable is not set')
  return salt
}

/**
 * Generate SHA-512 hash for PayU payment initiation.
 * Hash sequence: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt
 */
export function generatePayUHash(params: {
  txnid: string
  amount: string // decimal string e.g. "99.00"
  productinfo: string
  firstname: string
  email: string
  udf1?: string
  udf2?: string
  udf3?: string
  udf4?: string
  udf5?: string
}): string {
  const key = getPayUKey()
  const salt = getPayUSalt()

  const hashString = [
    key,
    params.txnid,
    params.amount,
    params.productinfo,
    params.firstname,
    params.email,
    params.udf1 ?? '',
    params.udf2 ?? '',
    params.udf3 ?? '',
    params.udf4 ?? '',
    params.udf5 ?? '',
    '', '', '', '', '', // udf6-udf10 empty
    salt,
  ].join('|')

  return crypto.createHash('sha512').update(hashString).digest('hex')
}

/**
 * Verify PayU response hash.
 * Reverse hash: salt|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
 */
export function verifyPayUResponseHash(params: {
  key: string
  txnid: string
  amount: string
  productinfo: string
  firstname: string
  email: string
  status: string
  hash: string
  udf1?: string
  udf2?: string
  udf3?: string
  udf4?: string
  udf5?: string
}): boolean {
  const salt = getPayUSalt()

  const hashString = [
    salt,
    params.status,
    '', '', '', '', '', // udf10-udf6 empty
    params.udf5 ?? '',
    params.udf4 ?? '',
    params.udf3 ?? '',
    params.udf2 ?? '',
    params.udf1 ?? '',
    params.email,
    params.firstname,
    params.productinfo,
    params.amount,
    params.txnid,
    params.key,
  ].join('|')

  const expected = crypto.createHash('sha512').update(hashString).digest('hex')
  return expected === params.hash
}

export interface PayUFormData {
  key: string
  txnid: string
  productinfo: string
  amount: string
  email: string
  firstname: string
  phone: string
  surl: string
  furl: string
  hash: string
  udf1?: string
}

export function buildPayUFormData(params: {
  txnid: string
  amountInPaise: number
  productinfo: string
  firstname: string
  email: string
  phone: string
  surl: string
  furl: string
  orderId: string
}): { payuUrl: string; formData: PayUFormData } {
  const key = getPayUKey()
  // PayU expects amount in INR as decimal string (2 decimal places)
  const amount = (params.amountInPaise / 100).toFixed(2)

  const hash = generatePayUHash({
    txnid: params.txnid,
    amount,
    productinfo: params.productinfo,
    firstname: params.firstname,
    email: params.email,
    udf1: params.orderId,
  })

  return {
    payuUrl: getPayUUrl(),
    formData: {
      key,
      txnid: params.txnid,
      productinfo: params.productinfo,
      amount,
      email: params.email,
      firstname: params.firstname,
      phone: params.phone,
      surl: params.surl,
      furl: params.furl,
      hash,
      udf1: params.orderId,
    },
  }
}
