import Head from "next/head";
import { useSession } from "next-auth/client";
import Header from "components/header";
import Actions from "components/actions";
import Dashboard from "components/dashboard";
import Loading from "components/loading";

const Home = () => {
  const [session, loading] = useSession();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>⏲️ Time Tracker</title>
      </Head>
      <Header session={session} />
      {session ? <Actions session={session} /> : <Dashboard />}
    </>
  );
};

export default Home;
