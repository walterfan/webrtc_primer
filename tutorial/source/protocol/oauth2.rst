#####################
oAuth2
#####################


Typical Flow
=====================

ACG: Authorization Code Grant
----------------------------------



CCG: Client Code Grant
----------------------------------

Authorization: Bearer XXXXX




JWK
======================

RFC7517: JSON Web Key (JWK) <https://tools.ietf.org/html/rfc7517>_

GET /.well-known/jwks.json

POST /oauth/token

POST /verify_token


A JSON Web Key (JWK) is a JavaScript Object Notation (JSON) [RFC7159]
data structure that represents a cryptographic key.  This
specification also defines a JWK Set JSON data structure that
represents a set of JWKs.  Cryptographic algorithms and identifiers
for use with this specification are described in the separate JSON
Web Algorithms (JWA) [JWA] specification and IANA registries
established by that specification.


JWT
=======================