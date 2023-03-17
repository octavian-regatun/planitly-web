import Image from "next/image"
import { useRouter } from "next/router"
import Layout from "../../components/Layout/Layout"
import RequireAuth from "../../components/RequireAuth"
import { api } from "../../utils/api"

const UserPage: React.FC = () => {
  const router = useRouter()

  const getUserQuery = api.users.getUser.useQuery(
    { username: router.query.username as string },
    {
      enabled: !!router.query.username,
    }
  )

  return (
    <RequireAuth>
      <Layout>
        {getUserQuery.data && (
          <>
            <Image
              alt="cover"
              width={2560}
              height={1440}
              src="https://picsum.photos/2560/1441"
            />
            <div className="relative -top-8 flex h-full flex-col items-center rounded-t-3xl bg-white">
              <Image
                className="absolute -top-16 rounded-full transition-all hover:brightness-75"
                width={128}
                height={128}
                src={getUserQuery.data.image}
                alt="profile"
              />
              <p className="mt-20 text-center text-2xl">
                {getUserQuery.data.firstName} {getUserQuery.data.lastName}
              </p>
              <p>{getUserQuery.data.username}</p>
            </div>
          </>
        )}
      </Layout>
    </RequireAuth>
  )
}

export default UserPage
