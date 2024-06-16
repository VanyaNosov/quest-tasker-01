import ContentLoader from "react-content-loader"

const UserLoadder = () => (
  <ContentLoader 
    speed={2}
    width={250}
    height={64}
    viewBox="0 0 250 64"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="13" ry="13" width="64" height="64" /> 
    <rect x="76" y="2" rx="6" ry="6" width="130" height="25" /> 
    <rect x="219" y="2" rx="5" ry="5" width="24" height="24" /> 
    <rect x="78" y="36" rx="8" ry="8" width="160" height="25" />
  </ContentLoader>
)

export default UserLoadder