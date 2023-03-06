import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import AzureADProvider from 'next-auth/providers/azure-ad'
import CredentialsProvider from "next-auth/providers/credentials"
// import { userAgentFromString } from "next/server"
import { includes } from 'lodash'

export const validateCredentials = async ({ password }: any): Promise<Boolean> => {
  const passwordBase = process.env.PASSWORDS ?? 'trout'
  const passwords = passwordBase.split(',')
  return includes(passwords, password)
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: "/auth/signin",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  callbacks: {
    jwt(params) {
      // update token
      // @TODO: Add role back to token
      // if (params.user?.role) {
      //   params.token.role = params.user.role;
      // }
      // return final_token
      return params.token;
    },
  },

  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID ?? '',
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET ?? '',
      tenantId: process.env.AZURE_AD_TENANT_ID ?? ''
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        // username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "Guest", email: "guest@hdrinc.com" }

        console.log('creds', credentials)
        const { password } = credentials as { password: string}

        const credentialsAreValid = await validateCredentials({ password })
        
        if (!credentialsAreValid) {
          console.log('sorry password is not', password)
          return null
        }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          console.log('u', user)
          return user
        } else {
          console.log('nope u')
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
        
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // const res = await fetch("/your/endpoint", {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" }
        // })
        // const user = await res.json()
  
        // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user
        // }
        // // Return null if user data could not be retrieved
        // return null
      }
    })
  ]
}

export default NextAuth(authOptions)