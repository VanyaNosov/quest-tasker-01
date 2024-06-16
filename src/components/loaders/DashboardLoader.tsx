import ContentLoader from "react-content-loader"

const DashboardLoader = () => (
  <ContentLoader 
    speed={2}
    width="100%"
    height={250}
    viewBox="0 0 100% 250"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    style={{borderRadius: 8}}
  >
    <rect x="0" y="0" rx="0" ry="0" width="100%" height="250" />
  </ContentLoader>
)

export default DashboardLoader