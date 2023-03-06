import Layout from '@/src/comp/layout/Layout'

const SignInPage = () => {
  return (
    <Layout>
      <h1>Sign In</h1>

      <div>
        <form>
          <input type="password" placeholder="******" />
          <input type="submit" value="Login" />
        </form>
      </div>
      <p>
       Sign in
      </p>
    </Layout>
  )
}

export default SignInPage