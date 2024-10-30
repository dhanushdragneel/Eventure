The React Front end for the express node.js server with refersh token can be run by first using npm install and then using npm start
while using npm start if you face the below error run this code in the terminal before running npm start again:

to run :  $env:NODE_OPTIONS="--openssl-legacy-provider"

ERROR:
opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'



