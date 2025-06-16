
QUESTION 6 : 

Résultat Question 6 avec le token reçu de Keycloak dans la réponse suivant : 
"client_secret=A9b02ZURyQ53B4f8zKGTVD4LcwiUFjjn"
{"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwRjQxYkwxZHdLZ0JLZjBmWEtBNHJDa0Roc2Z0V05JcGpER1JoLWxLUG0wIn0.eyJleHAiOjE3NTAwODY4NjcsImlhdCI6MTc1MDA4NjU2NywianRpIjoidHJydGNjOjBkYjcwYTIxLTk2MjgtNGNlMS05NzllLTkxYTZiZWRmNWQ5YSIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9yZWFsbXMvb3BvbWx5dHJhdmVsIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjY3Zjg1NTE5LTc2ZGYtNGExNi05MmFmLTFiMWZjMjU0ZDEwOSIsInR5cCI6IkJlYXJlciIsImF6cCI6Im9wb21seXRyYXZlbCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLW9wb21seXRyYXZlbCIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJvcG9tbHl0cmF2ZWwiOnsicm9sZXMiOlsidW1hX3Byb3RlY3Rpb24iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SG9zdCI6IjE3Mi4xOC4wLjEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtb3BvbWx5dHJhdmVsIiwiY2xpZW50QWRkcmVzcyI6IjE3Mi4xOC4wLjEiLCJjbGllbnRfaWQiOiJvcG9tbHl0cmF2ZWwifQ.fkrEfjDIaB1kSwNAq5mmuTSAqKUw9rmnW58Ui8Pnen-WvGQJExJ1YIz8MrSt9yrOKRtCcaJSCpwH0ruq55L2ZE2zMXVV1xMxlJ56ReOGHA7NPxx907s1eaJ9KP7UjjSkFvrPmO3vzCaJVbonGjIIpcbtpsEJxsQ8G_hDoea2la2hhdI4z3RZjwhgtGwUuCUrammESRJNikAXefvYlhtkAYoi1A-3Bh0_bezNgBiCFVAInv9ye7qCrwDF99ltsw5FeQrSKTFX9RO3K2yb4WVmrJVdjw-YwXa_82pkdbLSDouK5nE0TkLcLVKDHY5tEzNsKkKPBBY7dJdqNJJMD5Rm9A","expires_in":300,"refresh_expires_in":0,"token_type":"Bearer","not-before-policy":0,"scope":"profile email"}

{
  "exp": 1750086867,
  "iat": 1750086567,
  "jti": "trrtcc:0db70a21-9628-4ce1-979e-91a6bedf5d9a",
  "iss": "http://localhost:8080/realms/opomlytravel",
  "aud": "account",
  "sub": "67f85519-76df-4a16-92af-1b1fc254d109",
  "typ": "Bearer",
  "azp": "opomlytravel",
  "acr": "1",
  "allowed-origins": [
    "http://localhost:3000"
  ],
  "realm_access": {
    "roles": [
      "default-roles-opomlytravel",
      "offline_access",
      "uma_authorization"
    ]
  },
  "resource_access": {
    "opomlytravel": {
      "roles": [
        "uma_protection"
      ]
    },
    "account": {
      "roles": [
        "manage-account",
        "manage-account-links",
        "view-profile"
      ]
    }
  },
  "scope": "profile email",
  "email_verified": false,
  "clientHost": "172.18.0.1",
  "preferred_username": "service-account-opomlytravel",
  "clientAddress": "172.18.0.1",
  "client_id": "opomlytravel"
}