import ContentLoader from "react-content-loader"

const TitleLoader = () => (
  <ContentLoader 
    speed={2}
    width="100"
    height={24}
    viewBox="0 0 100 24"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    style={{borderRadius: 8}}
  >
    <rect x="0" y="0" rx="0" ry="0" width="100" height="24" />
  </ContentLoader>
)

export default TitleLoader